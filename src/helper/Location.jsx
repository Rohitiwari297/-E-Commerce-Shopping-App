import React, { useState } from 'react';

function Location() {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(() => localStorage.getItem('userLocation') || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Reverse geocoding using OpenStreetMap API
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          const locationParts = data.display_name.split(',').map((p) => p.trim());
          console.log('Location data:', data);
          // Extract city or town from the address
          const formattedLocation = `${locationParts[0]} ${locationParts[3]}, ${locationParts[5]}, ${locationParts[6]}, ${locationParts[7]}` ||
          data.display_name ||
          data.address.city_district ||
          data.address.city;
          
          setLocation(formattedLocation);
          localStorage.setItem('userLocation', formattedLocation);
          setOpen(false);
        } catch (err) {
          setError('Unable to fetch location details.');
        }
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        setError('Permission denied. Please allow location access.');
      },
    );
  };

  return (
    <div className="flex flex-col text-xs md:text-sm cursor-pointer relative ml-2 md:ml-5 min-w-max">
      <span className="text-black ml-2 block">
        <h1 className="font-extrabold text-[12px] md:text-[18px]">Delivery in 8 minutes</h1>
      </span>
      <div className="px-2 justify-center items-center py-1 align-middle">
        <span
          onClick={() => setOpen(!open)}
          className="font-medium text-[10px] md:text-[12px] text-wrap text-blue-600 hover:text-[#0c721f]"
        >
          {location ? `📍 ${location}` : '📍 Select Location'}
        </span>
      </div>
      {open && (
        <div className="absolute top-12 bg-white shadow-md border rounded-md p-4 w-64 z-50">
          <button onClick={handleGetLocation} className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md">
            {loading ? 'Detecting...' : 'Use My Current Location'}
          </button>

          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
}

export default Location;

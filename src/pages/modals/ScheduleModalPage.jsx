import React from 'react';
import { MdClose, MdLocalOffer } from 'react-icons/md';
import { useState } from 'react';
import { getValidSlots } from '../../utils/dateTimeUtilFuntions';

function ScheduleModalPage({ onClose, onApply }) {
  let today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedSlot, setSelectedSlot] = useState(null);

  //   console.log('selectedSlot', selectedSlot);
  //   console.log('selectedDate', selectedDate);

  let dates = [];

  for (let i = 0; i < 7; i++) {
    let nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    dates.push(nextDate); //  NO toDateString()
  }

  const validSlots = getValidSlots(selectedDate);

  // SCHEDULE DELIVERY
  const handleApply = () => {
    onApply(selectedDate, selectedSlot);
    onClose();
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center bg-gray-50">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <MdLocalOffer className="text-green-600" />
          Schedule Delivery
        </h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition">
          <MdClose size={22} className="text-gray-500" />
        </button>
      </div>

      {/* Date Selector */}
      <div className="p-4 border-b">
        <h3 className="text-sm font-semibold mb-3 text-gray-600">Select Date</h3>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {dates.map((date, index) => {
            const isSelected = selectedDate.toDateString() === date.toDateString();

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`min-w-[90px] px-3 py-2 rounded-xl text-sm border transition
                ${isSelected ? 'bg-green-600 text-white border-green-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`}
              >
                {date.toDateString().slice(0, 10)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      {/* Time Slots */}
      <div className="p-4 flex-1 overflow-hidden">
        <h3 className="text-sm font-semibold mb-3 text-gray-600">Available Slots</h3>

        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
          {validSlots.length > 0 ? (
            validSlots.map((slot) => {
              const isSelected = selectedSlot === slot;

              return (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`min-w-[140px] px-4 py-3 rounded-xl text-sm border transition whitespace-nowrap
              ${isSelected ? 'bg-green-600 text-white border-green-600' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}
                >
                  {slot}
                </button>
              );
            })
          ) : (
            <p className="text-gray-400 text-sm">No slots available</p>
          )}
        </div>
      </div>

      {/* Footer Button */}
      <div className="p-4 border-t">
        <button
          onClick={handleApply}
          disabled={!selectedSlot}
          className={`w-full py-3 rounded-xl font-semibold transition
          ${selectedSlot ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          Confirm Slot
        </button>
      </div>
    </div>
  );
}

export default ScheduleModalPage;

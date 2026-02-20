import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0c721f] text-white">
      {/* Back to top */}
      <Link to='/'>
      <div className="text-center py-3 bg-[#0a5e19] hover:bg-[#094d14] cursor-pointer ">
        Back to Home Page
      </div>
      </Link>

      {/* Main footer sections */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 py-10 px-6">
        {/* Column 1 */}
        <div>
          <h3 className="font-bold mb-3">Get to Know Us</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Press Releases</a></li>
            <li><a href="#" className="hover:underline">Science & Research</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-bold mb-3">Connect with Us</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-bold mb-3">Make Money with Us</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Sell on Platform</a></li>
            <li><a href="#" className="hover:underline">Affiliate Marketing</a></li>
            <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
            <li><a href="#" className="hover:underline">Become a Supplier</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-bold mb-3">Let Us Help You</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Your Account</a></li>
            <li><a href="#" className="hover:underline">Returns Centre</a></li>
            <li><a href="#" className="hover:underline">Purchase Protection</a></li>
            <li><a href="#" className="hover:underline">Help</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-6 px-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">YourBrand</span>
          <span>© 2025, All rights reserved</span>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:underline">Privacy Notice</a>
          <a href="#" className="hover:underline">Conditions of Use</a>
          <a href="#" className="hover:underline">Cookies</a>
        </div>
      </div>
    </footer>
  );
}

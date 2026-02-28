import React from 'react';
import { Target, Users, Award, ShieldCheck } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="py-12 px-6 max-w-5xl mx-auto my-10 animate-fadeIn">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-gray-800 mb-4">About Our Platform</h1>
        <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto">
          We are committed to providing the freshest groceries and the best shopping experience for our customers.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-center">
        <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:border-green-600/30 transition-all group">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <Users size={32} />
          </div>
          <h3 className="text-3xl font-black text-gray-800 mb-2">10k+</h3>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Happy Customers</p>
        </div>

        <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:border-green-600/30 transition-all group">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <Award size={32} />
          </div>
          <h3 className="text-3xl font-black text-gray-800 mb-2">500+</h3>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Trusted Suppliers</p>
        </div>

        <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:border-green-600/30 transition-all group">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-3xl font-black text-gray-800 mb-2">100%</h3>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Secure Payments</p>
        </div>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 px-6">
        <div>
          <h2 className="text-3xl font-black text-gray-800 mb-6">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed font-medium mb-6">
            Founded with a simple goal: to bridge the gap between local farmers and urban consumers. We believe
            that everyone deserves access to fresh, high-quality groceries without the hassle of traditional
            market shopping.
          </p>
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl border border-green-100">
             <Target className="text-green-600" size={24} />
             <p className="text-green-800 font-bold text-sm">Quality is our top priority in every delivery.</p>
          </div>
        </div>
        <div className="bg-gray-100 rounded-[40px] aspect-square overflow-hidden shadow-inner flex items-center justify-center border-8 border-white p-8">
            {/* Placeholder for an image - if I could generate it, I would */}
            <p className="text-gray-400 font-black text-2xl rotate-12">QUALITY FIRST</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

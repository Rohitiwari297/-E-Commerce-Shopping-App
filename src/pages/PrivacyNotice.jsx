import React from 'react';

const PrivacyNotice = () => {
  return (
    <div className="py-12 px-6 max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 my-10 animate-fadeIn">
      <h1 className="text-4xl font-black text-gray-800 mb-8 border-b pb-4">Privacy Notice</h1>
      
      <div className="space-y-6 text-gray-600 leading-relaxed font-medium">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">1. Information We Collect</h2>
          <p>
            We collect personal information that you provide to us, such as your name, address, contact information,
            passwords and security data, and payment information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">2. How We Use Your Information</h2>
          <p>
            We process your information for purposes based on legitimate business interests, the fulfillment of our
            contract with you, compliance with our legal obligations, and/or your consent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">3. Sharing Your Information</h2>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to
            protect your rights, or to fulfill business obligations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">4. Cookies and Other Tracking Technologies</h2>
          <p>
            We may use cookies and similar tracking technologies to access or store information. Specific
            information about how we use such technologies and how you can refuse certain cookies is set out in our
            Cookie Notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">5. Data Security</h2>
          <p>
            We aim to protect your personal information through a system of organizational and technical security
            measures.
          </p>
        </section>

        <section className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <h2 className="text-xl font-bold text-green-800 mb-3">Contact Us</h2>
          <p className="text-green-700/80">
            If you have questions or comments about this notice, you may email us at support@example.com or by post
            to our registered office.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyNotice;

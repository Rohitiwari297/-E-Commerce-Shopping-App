import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="py-12 px-6 max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 my-10 animate-fadeIn">
      <h1 className="text-4xl font-black text-gray-800 mb-8 border-b pb-4">Terms & Conditions</h1>
      
      <div className="space-y-6 text-gray-600 leading-relaxed font-medium">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">1. Agreement to Terms</h2>
          <p>
            By accessing or using our services, you agree to be bound by these Terms and Conditions. If you disagree with
            any part of the terms, then you may not access the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">2. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property
            of our company and its licensors.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide us information that is accurate, complete, and current
            at all times. Failure to do so constitutes a breach of the Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">4. Limitation of Liability</h2>
          <p>
            In no event shall our company, nor its directors, employees, partners, agents, suppliers, or affiliates, be
            liable for any indirect, incidental, special, consequential or punitive damages.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-3">5. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the country, without regard to
            its conflict of law provisions.
          </p>
        </section>

        <section className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <h2 className="text-xl font-bold text-green-800 mb-3">Changes</h2>
          <p className="text-green-700/80">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to
            provide at least 30 days' notice prior to any new terms taking effect.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;

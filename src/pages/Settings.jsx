import React, { useState } from 'react';
import { Bell, Mail, Lock, Target } from 'lucide-react';

function Settings() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailAlerts: false,
    accountPrivacy: true,
    twoFactorAuth: false,
  });

  const handleSettingToggle = (id) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }));
  };
    return (
        <div className="space-y-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
                <div>
                  <h2 className="text-2xl font-black text-gray-800">Account Settings</h2>
                  <p className="text-gray-400 font-medium text-sm mt-1">Manage your app experience and security</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'pushNotifications', title: 'Push Notifications', desc: 'Receive real-time order updates', icon: <Bell size={20} /> },
                  { id: 'emailAlerts', title: 'Email Alerts', desc: 'Product news and exclusive offers', icon: <Mail size={20} /> },
                  { id: 'accountPrivacy', title: 'Account Privacy', desc: 'Manage your data visibility', icon: <Lock size={20} /> },
                  { id: 'twoFactorAuth', title: 'Two-Factor Auth', desc: 'Secure your account with 2FA', icon: <Target size={20} /> },
                ].map((s) => (
                  <div key={s.id} className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-center justify-between group hover:border-green-600/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl ${settings[s.id] ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'} transition-colors`}>
                        {s.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-[15px]">{s.title}</h4>
                        <p className="text-gray-400 text-xs font-medium">{s.desc}</p>
                      </div>
                    </div>
                    <div 
                      className={`w-12 h-6 rounded-full relative cursor-pointer transition-all duration-300 ${settings[s.id] ? 'bg-green-600' : 'bg-gray-200'}`}
                      onClick={() => handleSettingToggle(s.id)}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings[s.id] ? 'left-7' : 'left-1'}`}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-3xl bg-red-50 border border-red-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <h4 className="font-black text-red-800">Danger Zone</h4>
                  <p className="text-sm text-red-700/60 font-medium">Temporarily disable or permanently delete your account</p>
                </div>
                <button className="px-6 py-2.5 bg-white text-red-600 font-black text-xs uppercase tracking-widest rounded-xl shadow-sm hover:shadow-md transition-all">
                  Request Deletion
                </button>
              </div>
            </div>
    );
}

export default Settings;
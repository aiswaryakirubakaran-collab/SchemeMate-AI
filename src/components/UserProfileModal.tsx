import React, { useState } from 'react';
import { AuthUser, BusinessType, Language } from '../types';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Globe, 
  Save, 
  CheckCircle2, 
  ShieldCheck,
  Building
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  user: AuthUser;
  onUpdateUser: (updatedUser: AuthUser) => void;
  activeTab?: 'profile' | 'settings';
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  user,
  onUpdateUser,
  activeTab = 'profile'
}) => {
  const [tab, setTab] = useState<'profile' | 'settings'>(activeTab);
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [state, setState] = useState(user.state || 'Tamil Nadu');
  const [district, setDistrict] = useState(user.district || '');
  const [businessCategory, setBusinessCategory] = useState<BusinessType>('Manufacturing');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const businessTypes: BusinessType[] = [
    'Manufacturing',
    'Services',
    'Trading / Retail',
    'Agriculture / Allied',
    'Handicraft / Artisan',
    'Food Processing',
    'Tech / Digital'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AuthUser = {
      ...user,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      state: state.trim(),
      district: district.trim()
    };
    onUpdateUser(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
        
        {/* Header with Deep Navy Blue */}
        <div className="bg-[#4F46E5] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#7C3AED] text-white font-extrabold text-lg flex items-center justify-center border-2 border-white/20 shadow-md">
              {name ? name.substring(0, 2).toUpperCase() : 'SM'}
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>{name || 'Citizen Entrepreneur'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7C3AED]/40 text-[#06B6D4] border border-[#7C3AED]/50">
                  {user.role || 'Verified'}
                </span>
              </h2>
              <p className="text-xs text-slate-200 mt-0.5">
                {email || phone || 'Citizen Portal Member'}
              </p>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 mt-5 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setTab('profile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                tab === 'profile'
                  ? 'bg-white text-[#1E1B4B] shadow-xs'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              {language === 'ta' ? 'என் சுயவிவரம் (My Profile)' : 'My Profile'}
            </button>
            <button
              type="button"
              onClick={() => setTab('settings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                tab === 'settings'
                  ? 'bg-white text-[#1E1B4B] shadow-xs'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              {language === 'ta' ? 'கணக்கு அமைப்புகள் (Account Settings)' : 'Account Settings'}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSave} className="p-6 bg-[#F8FAFC] space-y-4">
          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{language === 'ta' ? 'விவரங்கள் வெற்றிகரமாக சேமிக்கப்பட்டன!' : 'Profile updated successfully!'}</span>
            </div>
          )}

          {tab === 'profile' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-1.5">
                  {language === 'ta' ? 'முழுப் பெயர்' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-[#1E1B4B] outline-none focus:border-[#4F46E5]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-1.5">
                    {language === 'ta' ? 'மின்னஞ்சல் முகவரி' : 'Email Address'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-[#1E1B4B] outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-1.5">
                    {language === 'ta' ? 'தொலைபேசி எண்' : 'Mobile Number'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-[#1E1B4B] outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-1.5">
                    {language === 'ta' ? 'மாநிலம்' : 'State'}
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-[#1E1B4B] outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-1.5">
                    {language === 'ta' ? 'மாவட்டம்' : 'District'}
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-[#1E1B4B] outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-1.5">
                  {language === 'ta' ? 'தொழில் வகை' : 'Business Category'}
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={businessCategory}
                    onChange={(e) => setBusinessCategory(e.target.value as BusinessType)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-[#1E1B4B] outline-none focus:border-[#4F46E5]"
                  >
                    {businessTypes.map((bt) => (
                      <option key={bt} value={bt}>{bt}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {tab === 'settings' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-1.5">
                  {language === 'ta' ? 'விருப்பமான மொழி (Preferred Language)' : 'Preferred Language'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onLanguageChange('en')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      language === 'en'
                        ? 'border-[#4F46E5] bg-[#4F46E5]/10 text-[#4F46E5]'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    <span>English</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onLanguageChange('ta')}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      language === 'ta'
                        ? 'border-[#4F46E5] bg-[#4F46E5]/10 text-[#4F46E5]'
                        : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Globe className="w-4 h-4" />
                    <span>தமிழ் (Tamil)</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#1E1B4B] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#06B6D4]" />
                  <span>{language === 'ta' ? 'பாதுகாப்பு மற்றும் தனியுரிமை' : 'Security & Privacy'}</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  {language === 'ta'
                    ? 'உங்கள் தனிப்பட்ட தகவல்கள் அரசு திட்டங்களை துல்லியமாக கண்டறிய மட்டுமே பயன்படுத்தப்படுகின்றன. இடைத்தரகர்களுக்கு பகிரப்படாது.'
                    : 'Your entrepreneur data is strictly used for localized matching and official subsidy calculation. Never shared with unverified commercial third parties.'}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {language === 'ta' ? 'ரத்து செய்க' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{language === 'ta' ? 'சேமிக்க' : 'Save Changes'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { AuthUser, Language } from '../types';
import { 
  X, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  AlertCircle,
  Phone
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLoginSuccess: (user: AuthUser) => void;
  initialMode?: 'login' | 'signup' | 'forgot';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  language,
  onLoginSuccess,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  
  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    setErrorMsg('');
    setSuccessMsg('');

    if (mode === 'forgot') {
      if (!emailOrPhone.trim()) {
        setErrorMsg(language === 'ta' ? 'மின்னஞ்சல் அல்லது தொலைபேசி எண்ணை உள்ளிடவும்' : 'Please enter your registered email or mobile number');
        return false;
      }
      return true;
    }

    if (mode === 'signup' && !fullName.trim()) {
      setErrorMsg(language === 'ta' ? 'உங்கள் முழுப் பெயரை உள்ளிடவும்' : 'Please enter your full name');
      return false;
    }

    if (!emailOrPhone.trim()) {
      setErrorMsg(language === 'ta' ? 'மின்னஞ்சல் அல்லது தொலைபேசி எண்ணை உள்ளிடவும்' : 'Please enter your email or mobile number');
      return false;
    }

    if (!password || password.length < 6) {
      setErrorMsg(language === 'ta' ? 'கடவுச்சொல் குறைந்தபட்சம் 6 எழுத்துகள் கொண்டிருக்க வேண்டும்' : 'Password must be at least 6 characters');
      return false;
    }

    if (mode === 'signup' && password !== confirmPassword) {
      setErrorMsg(language === 'ta' ? 'கடவுச்சொற்கள் பொருந்தவில்லை' : 'Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (mode === 'forgot') {
        setSuccessMsg(
          language === 'ta' 
            ? 'கடவுச்சொல் மீட்டெடுப்பு இணைப்பு உங்கள் மின்னஞ்சல் / மொபைலுக்கு அனுப்பப்பட்டுள்ளது.' 
            : 'Password recovery instructions have been sent to your registered contact.'
        );
        return;
      }

      // Generate user
      const user: AuthUser = {
        id: `user-${Date.now()}`,
        name: mode === 'signup' ? fullName.trim() : (fullName.trim() || 'Entrepreneur User'),
        email: emailOrPhone.includes('@') ? emailOrPhone.trim() : `${emailOrPhone.trim()}@user.schememate.in`,
        phone: !emailOrPhone.includes('@') ? emailOrPhone.trim() : undefined,
        role: 'Verified Entrepreneur',
        state: 'Tamil Nadu',
        district: 'Madurai'
      };

      if (rememberMe) {
        localStorage.setItem('schememate_auth_user', JSON.stringify(user));
      }

      onLoginSuccess(user);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
        
        {/* Header with Deep Navy Blue */}
        <div className="bg-[#4F46E5] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#7C3AED]/30 border border-[#7C3AED]/50 text-[#06B6D4] text-[11px] font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>SchemeMate AI Citizen Portal</span>
          </div>

          <h2 className="text-xl font-bold tracking-tight text-white">
            {mode === 'login' && (language === 'ta' ? 'கணக்கில் நுழைக (Sign In)' : 'Welcome Back')}
            {mode === 'signup' && (language === 'ta' ? 'புதிய கணக்கு தொடங்குக (Sign Up)' : 'Create Entrepreneur Account')}
            {mode === 'forgot' && (language === 'ta' ? 'கடவுச்சொல்லை மீட்டெடுக்க' : 'Reset Password')}
          </h2>
          <p className="text-xs text-slate-100 mt-1">
            {mode === 'login' && (language === 'ta' ? 'உங்கள் திட்டப் பொருத்தம் மற்றும் விண்ணப்பங்களைக் கண்காணிக்க உள்நுழையவும்' : 'Sign in to access your matched schemes and tracked applications')}
            {mode === 'signup' && (language === 'ta' ? '12+ அரசுத் திட்டங்களை ஒப்பிடவும் மானியம் பெறவும் சேரவும்' : 'Join thousands of MSME founders accessing verified government subsidies')}
            {mode === 'forgot' && (language === 'ta' ? 'பதிவுசெய்த மின்னஞ்சல் அல்லது தொலைபேசி எண்ணை உள்ளிடவும்' : 'Enter your email or phone to receive a password reset link')}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 bg-[#F8FAFC]">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name for Signup */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-1.5">
                  {language === 'ta' ? 'முழுப் பெயர்' : 'Full Name'} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={language === 'ta' ? 'எ.கா. மு. செல்வகுமார்' : 'e.g. S. Meenakshi'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-[#1E1B4B] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email or Phone */}
            <div>
              <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-1.5">
                {language === 'ta' ? 'மின்னஞ்சல் அல்லது மொபைல் எண்' : 'Email or Mobile Number'} *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder={language === 'ta' ? 'peyar@gmail.com அல்லது 9876543210' : 'founder@example.com or 9876543210'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-[#1E1B4B] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider">
                    {language === 'ta' ? 'கடவுச்சொல்' : 'Password'} *
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('forgot');
                        setErrorMsg('');
                        setSuccessMsg('');
                      }}
                      className="text-[11px] font-semibold text-[#4F46E5] hover:underline"
                    >
                      {language === 'ta' ? 'கடவுச்சொல் மறந்ததா?' : 'Forgot Password?'}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-[#1E1B4B] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Confirm Password for Signup */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-[#1E1B4B] uppercase tracking-wider mb-1.5">
                  {language === 'ta' ? 'கடவுச்சொல்லை உறுதிப்படுத்துக' : 'Confirm Password'} *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-[#1E1B4B] outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me */}
            {mode === 'login' && (
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#4F46E5] focus:ring-[#4F46E5] w-4 h-4"
                />
                <span className="text-xs text-[#1E1B4B] font-medium">
                  {language === 'ta' ? 'என்னை நினைவில் கொள்க' : 'Remember me on this browser'}
                </span>
              </label>
            )}

            {/* Submit Button with Secondary Teal */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {mode === 'login' && (language === 'ta' ? 'உள்நுழைக' : 'Sign In')}
                    {mode === 'signup' && (language === 'ta' ? 'கணக்கை உருவாக்குக' : 'Create Free Account')}
                    {mode === 'forgot' && (language === 'ta' ? 'மீட்டெடுப்பு இணைப்பை அனுப்புக' : 'Send Reset Instructions')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Mode Switcher Footer */}
          <div className="mt-6 pt-4 border-t border-slate-200 text-center text-xs text-slate-600">
            {mode === 'login' && (
              <p>
                {language === 'ta' ? 'புதியவரா? ' : "Don't have an account? "}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className="font-bold text-[#4F46E5] hover:underline"
                >
                  {language === 'ta' ? 'இலவசமாக பதிவு செய்யுங்கள்' : 'Sign up now'}
                </button>
              </p>
            )}

            {mode === 'signup' && (
              <p>
                {language === 'ta' ? 'ஏற்கனவே கணக்கு உள்ளதா? ' : 'Already have an account? '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className="font-bold text-[#4F46E5] hover:underline"
                >
                  {language === 'ta' ? 'உள்நுழைக' : 'Sign in'}
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <p>
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className="font-bold text-[#4F46E5] hover:underline flex items-center justify-center gap-1 mx-auto"
                >
                  <span>←</span>
                  <span>{language === 'ta' ? 'மீண்டும் உள்நுழைய செல்க' : 'Back to Sign In'}</span>
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

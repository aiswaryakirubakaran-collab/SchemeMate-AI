import React, { useState, useRef, useEffect } from 'react';
import { translations } from '../data/translations';
import { Language, NotificationItem, AuthUser } from '../types';
import { 
  Compass, 
  Sparkles, 
  Layers, 
  BookmarkCheck, 
  MessageSquare, 
  Bell, 
  Globe, 
  Menu, 
  X,
  User,
  LogOut,
  Settings,
  ChevronDown,
  FileText,
  Bookmark,
  LogIn,
  UserPlus
} from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currentView?: string;
  activeView?: string;
  onNavigate?: (view: any) => void;
  setActiveView?: (view: any) => void;
  savedCount?: number;
  compareCount?: number;
  notifications?: NotificationItem[];
  unreadNotificationsCount?: number;
  onOpenNotifications?: () => void;
  onOpenChat?: () => void;
  user?: AuthUser | null;
  onOpenAuth?: (mode?: 'login' | 'signup') => void;
  onLogout?: () => void;
  onOpenProfile?: (tab?: 'profile' | 'settings') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  currentView,
  activeView,
  onNavigate,
  setActiveView,
  savedCount = 0,
  compareCount = 0,
  notifications = [],
  unreadNotificationsCount,
  onOpenNotifications,
  onOpenChat,
  user,
  onOpenAuth,
  onLogout,
  onOpenProfile
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  const unreadNotifs = typeof unreadNotificationsCount === 'number'
    ? unreadNotificationsCount
    : (Array.isArray(notifications) ? notifications.filter(n => n && (n.unread || !n.read)).length : 0);

  const active = activeView || currentView || 'landing';

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'landing', label: t.nav.home, icon: Compass },
    { id: 'form', label: t.nav.findSchemes, icon: Sparkles, highlight: true },
    { id: 'browse', label: t.nav.allSchemes, icon: Layers },
    { id: 'compare', label: `${t.nav.compare} ${compareCount > 0 ? `(${compareCount})` : ''}`, icon: Layers },
    { id: 'dashboard', label: `${t.nav.dashboard} ${savedCount > 0 ? `(${savedCount})` : ''}`, icon: BookmarkCheck },
  ];

  const handleNav = (viewId: string) => {
    const target = viewId === 'home' ? 'landing' : (viewId === 'find' ? 'form' : viewId);
    if (target === 'dashboard' && !user) {
      if (onOpenAuth) onOpenAuth('login');
      setMobileMenuOpen(false);
      return;
    }
    if (onNavigate) {
      onNavigate(target);
    } else if (setActiveView) {
      setActiveView(target);
    }
    setMobileMenuOpen(false);
  };

  const getInitials = (name?: string) => {
    if (!name) return 'SM';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#4F46E5] text-white shadow-md border-b border-[#4338CA]">
      {/* Top Citizen Service Bar */}
      <div className="bg-[#1E1B4B] text-slate-300 text-xs py-1.5 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#06B6D4]">
              <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse"></span>
              {language === 'ta' ? 'அரசு தொழில்முனைவோர் வழிகாட்டல் தளம்' : 'National MSME Scheme Discovery & Guidance Platform'}
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-400">
              {language === 'ta' ? 'மத்திய & மாநில மானியங்கள் மற்றும் கடன் வழிகாட்டி' : 'Ministry-Aligned Subsidies, Grants & Credit Verification'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'ta' : 'en')}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/10 cursor-pointer"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>{language === 'en' ? 'தமிழ் (Tamil)' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('landing')}>
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED] flex items-center justify-center text-white font-extrabold text-xl shadow-md border border-white/20">
              SM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
                  SchemeMate<span className="text-[#06B6D4]">.AI</span>
                </span>
                <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-[#7C3AED] text-white">
                  MSME
                </span>
              </div>
              <p className="text-[11px] text-indigo-100 hidden sm:block leading-tight">
                {language === 'ta' ? 'சிறு தொழில்முனைவோருக்கான AI வழிகாட்டி' : 'Empowering Small & Marginalized Entrepreneurs'}
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = active === item.id || (item.id === 'form' && active === 'results');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#7C3AED] text-white shadow-xs font-bold'
                      : item.highlight
                      ? 'text-[#06B6D4] bg-white/10 hover:bg-white/15'
                      : 'text-indigo-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.highlight ? 'text-[#06B6D4]' : 'text-indigo-200'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions & Profile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Advisor Chat launcher button with Accent/Secondary */}
            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] shadow-sm transition-all cursor-pointer border border-white/15"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span className="hidden sm:inline">{language === 'ta' ? 'AI உதவி' : 'Scheme Advisor'}</span>
              <span className="sm:hidden">AI</span>
            </button>

            {/* Notifications Button */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg text-indigo-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Notifications"
              title="Scheme Policy Updates"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {/* Authentication & User Profile Dropdown */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/10 transition-all text-left cursor-pointer"
                  aria-label="User profile menu"
                >
                  <div className="w-8 h-8 rounded-full bg-[#7C3AED] text-white font-extrabold text-xs flex items-center justify-center border border-white/30 shadow-xs">
                    {getInitials(user.name)}
                  </div>
                  <div className="hidden sm:block text-left pr-1">
                    <div className="text-xs font-bold text-white max-w-[120px] truncate leading-tight">
                      {user.name}
                    </div>
                    <div className="text-[10px] text-indigo-200">
                      {user.district || 'Entrepreneur'}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-indigo-200 hidden sm:block" />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 text-[#1E1B4B] animate-in fade-in-50 zoom-in-95 duration-100">
                    <div className="px-4 py-2.5 border-b border-slate-100 bg-[#F8FAFC]">
                      <p className="text-xs font-bold text-[#1E1B4B] truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email || user.phone}</p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          if (onOpenProfile) onOpenProfile('profile');
                        }}
                        className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-[#4F46E5] flex items-center gap-2.5 text-left transition-colors cursor-pointer"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>{language === 'ta' ? 'என் சுயவிவரம்' : 'My Profile'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          if (onOpenProfile) onOpenProfile('settings');
                        }}
                        className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-[#4F46E5] flex items-center gap-2.5 text-left transition-colors cursor-pointer"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span>{language === 'ta' ? 'கணக்கு அமைப்புகள்' : 'Account Settings'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleNav('dashboard');
                        }}
                        className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-[#4F46E5] flex items-center gap-2.5 text-left transition-colors cursor-pointer"
                      >
                        <Bookmark className="w-4 h-4 text-slate-400" />
                        <span>{language === 'ta' ? 'சேமிக்கப்பட்ட திட்டங்கள்' : 'Saved Schemes'}</span>
                        {savedCount > 0 && (
                          <span className="ml-auto text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-[#4F46E5]">
                            {savedCount}
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          handleNav('dashboard');
                        }}
                        className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-[#4F46E5] flex items-center gap-2.5 text-left transition-colors cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span>{language === 'ta' ? 'என் விண்ணப்பங்கள்' : 'My Applications'}</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          if (onLogout) onLogout();
                        }}
                        className="w-full px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 text-left transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>{language === 'ta' ? 'வெளியேறுக (Logout)' : 'Logout'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onOpenAuth && onOpenAuth('login')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{language === 'ta' ? 'உள்நுழைக' : 'Sign In'}</span>
                </button>

                <button
                  onClick={() => onOpenAuth && onOpenAuth('signup')}
                  className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] shadow-xs transition-colors cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{language === 'ta' ? 'பதிவு செய்க' : 'Sign Up'}</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-indigo-100 hover:text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#4338CA] bg-[#4F46E5] px-4 pt-3 pb-5 space-y-1 shadow-xl animate-in slide-in-from-top-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = active === item.id || (item.id === 'form' && active === 'results');
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold cursor-pointer ${
                  isActive
                    ? 'bg-[#7C3AED] text-white font-bold'
                    : 'text-indigo-100 hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-indigo-200'}`} />
                {item.label}
              </button>
            );
          })}

          {/* Auth options for mobile */}
          {!user && (
            <div className="pt-3 mt-3 border-t border-white/10 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAuth) onOpenAuth('login');
                }}
                className="flex-1 py-2 rounded-lg text-xs font-bold bg-white/10 text-white text-center cursor-pointer"
              >
                {language === 'ta' ? 'உள்நுழைக' : 'Sign In'}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAuth) onOpenAuth('signup');
                }}
                className="flex-1 py-2 rounded-lg text-xs font-bold bg-[#7C3AED] text-white text-center cursor-pointer"
              >
                {language === 'ta' ? 'பதிவு செய்க' : 'Sign Up'}
              </button>
            </div>
          )}

          <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-indigo-200">{language === 'ta' ? 'மொழி தேர்வு' : 'Language'}:</span>
            <div className="flex gap-1">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 text-xs rounded font-bold cursor-pointer ${language === 'en' ? 'bg-[#7C3AED] text-white' : 'bg-white/10 text-indigo-100'}`}
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange('ta')}
                className={`px-3 py-1 text-xs rounded font-bold cursor-pointer ${language === 'ta' ? 'bg-[#7C3AED] text-white' : 'bg-white/10 text-indigo-100'}`}
              >
                தமிழ்
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

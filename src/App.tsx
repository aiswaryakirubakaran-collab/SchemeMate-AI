import React, { useState, useEffect } from 'react';
import { 
  Language, 
  EntrepreneurProfile, 
  Scheme, 
  SchemeMatchResult, 
  TrackedApplication, 
  SchemeNotification,
  AuthUser 
} from './types';
import { sampleSchemes, sampleNotifications } from './data/schemes';
import { translations } from './data/translations';
import { runSchemeMatching } from './utils/matchingEngine';
import { Lock } from 'lucide-react';

// Components
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { ProfileForm } from './components/ProfileForm';
import { MatchingResultsView } from './components/MatchingResultsView';
import { SchemeDetailView } from './components/SchemeDetailView';
import { BrowseAllSchemesView } from './components/BrowseAllSchemesView';
import { DocumentChecklistVault } from './components/DocumentChecklistVault';
import { SchemeComparisonModal } from './components/SchemeComparisonModal';
import { UserDashboardView } from './components/UserDashboardView';
import { AiChatAssistant } from './components/AiChatAssistant';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';

export type AppView = 
  | 'landing' 
  | 'form' 
  | 'results' 
  | 'detail' 
  | 'browse' 
  | 'vault' 
  | 'compare' 
  | 'dashboard';

interface HistoryEntry {
  view: AppView;
  scheme?: Scheme | null;
}

export default function App() {
  // 1. Language state (English default, toggleable to Tamil)
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('schememate_lang');
      return (saved === 'ta' || saved === 'en') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    try {
      localStorage.setItem('schememate_lang', newLang);
    } catch (e) {
      console.warn(e);
    }
  };

  const t = translations[language];

  // 2. Navigation View State & Browser-style History Stack
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [historyStack, setHistoryStack] = useState<HistoryEntry[]>([]);
  const [pendingRedirectView, setPendingRedirectView] = useState<AppView | null>(null);

  // 3. User Authentication State (Blank/null default, no fake persona)
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('schememate_auth_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);
  const [userProfileModalTab, setUserProfileModalTab] = useState<'profile' | 'settings'>('profile');

  // 4. Master Schemes Database
  const [schemes, setSchemes] = useState<Scheme[]>(() => {
    try {
      const saved = localStorage.getItem('schememate_schemes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn(e);
    }
    return sampleSchemes;
  });

  // 5. Entrepreneur Profile State (Per-user persistence, blank for new user)
  const [userProfile, setUserProfile] = useState<EntrepreneurProfile | null>(() => {
    try {
      const savedAuth = localStorage.getItem('schememate_auth_user');
      const userId = savedAuth ? JSON.parse(savedAuth)?.id : null;
      const key = userId ? `schememate_profile_${userId}` : 'schememate_profile';
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return null;
  });

  // 6. Active Match Results
  const [matchResults, setMatchResults] = useState<SchemeMatchResult[]>([]);

  // 7. Selected Scheme for Details view
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  // 8. Compared Scheme IDs
  const [comparedSchemeIds, setComparedSchemeIds] = useState<string[]>([]);

  // 9. Saved Schemes (Bookmarks - per user, blank for new user)
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(() => {
    try {
      const savedAuth = localStorage.getItem('schememate_auth_user');
      const userId = savedAuth ? JSON.parse(savedAuth)?.id : null;
      const key = userId ? `schememate_saved_${userId}` : 'schememate_saved';
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // 10. Application Tracking Pipeline (per user, blank for new user)
  const [trackedApplications, setTrackedApplications] = useState<TrackedApplication[]>(() => {
    try {
      const savedAuth = localStorage.getItem('schememate_auth_user');
      const userId = savedAuth ? JSON.parse(savedAuth)?.id : null;
      const key = userId ? `schememate_tracked_${userId}` : 'schememate_tracked';
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // 11. Document Vault Status (interactive checklist - per user)
  const [documentVaultStatus, setDocumentVaultStatus] = useState<Record<string, boolean>>(() => {
    try {
      const savedAuth = localStorage.getItem('schememate_auth_user');
      const userId = savedAuth ? JSON.parse(savedAuth)?.id : null;
      const key = userId ? `schememate_docs_${userId}` : 'schememate_docs';
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  // 12. Notifications
  const [notifications, setNotifications] = useState<SchemeNotification[]>(sampleNotifications);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Synchronize browser history and internal stack
  const navigateTo = (nextView: AppView, scheme?: Scheme | null, replace: boolean = false) => {
    // Gatekeeper: protect dashboard if not signed in
    if (nextView === 'dashboard' && !authUser) {
      setPendingRedirectView('dashboard');
      setAuthModalMode('login');
      setIsAuthModalOpen(true);
      return;
    }

    if (nextView === currentView && (!scheme || scheme.id === selectedScheme?.id)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!replace) {
      setHistoryStack(prev => [...prev, { view: currentView, scheme: selectedScheme }]);
    }

    setCurrentView(nextView);
    if (scheme !== undefined) {
      setSelectedScheme(scheme);
    }

    try {
      window.history.pushState({ view: nextView, schemeId: scheme?.id }, '');
    } catch (e) {
      console.warn(e);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Browser-style Go Back: Returns to the immediately previous route
  const goBack = () => {
    if (historyStack.length > 0) {
      const prevEntry = historyStack[historyStack.length - 1];
      setHistoryStack(prev => prev.slice(0, -1));
      setCurrentView(prevEntry.view);
      setSelectedScheme(prevEntry.scheme || null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If at root, return to landing page
      setCurrentView('landing');
      setSelectedScheme(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle native browser Back/Forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setCurrentView(event.state.view);
        if (event.state.schemeId) {
          const found = schemes.find(s => s.id === event.state.schemeId);
          if (found) setSelectedScheme(found);
        }
      } else {
        goBack();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [historyStack, schemes]);

  // Persist master schemes
  useEffect(() => {
    try {
      localStorage.setItem('schememate_schemes', JSON.stringify(schemes));
    } catch {}
  }, [schemes]);

  // Persist profile per user
  useEffect(() => {
    if (userProfile) {
      try {
        if (authUser?.id) {
          localStorage.setItem(`schememate_profile_${authUser.id}`, JSON.stringify(userProfile));
        }
        localStorage.setItem('schememate_profile', JSON.stringify(userProfile));
      } catch {}
    }
  }, [userProfile, authUser]);

  // Persist saved schemes per user
  useEffect(() => {
    try {
      if (authUser?.id) {
        localStorage.setItem(`schememate_saved_${authUser.id}`, JSON.stringify(savedSchemeIds));
      }
      localStorage.setItem('schememate_saved', JSON.stringify(savedSchemeIds));
    } catch {}
  }, [savedSchemeIds, authUser]);

  // Persist tracked applications per user
  useEffect(() => {
    try {
      if (authUser?.id) {
        localStorage.setItem(`schememate_tracked_${authUser.id}`, JSON.stringify(trackedApplications));
      }
      localStorage.setItem('schememate_tracked', JSON.stringify(trackedApplications));
    } catch {}
  }, [trackedApplications, authUser]);

  // Persist document vault checklist per user
  useEffect(() => {
    try {
      if (authUser?.id) {
        localStorage.setItem(`schememate_docs_${authUser.id}`, JSON.stringify(documentVaultStatus));
      }
      localStorage.setItem('schememate_docs', JSON.stringify(documentVaultStatus));
    } catch {}
  }, [documentVaultStatus, authUser]);

  // Handler: Run matching when profile submitted
  const handleProfileSubmit = (profile: EntrepreneurProfile) => {
    setUserProfile(profile);
    const results = runSchemeMatching(profile, schemes);
    setMatchResults(results);
    navigateTo('results');
  };

  // Handler: Quick Demo Persona selected from landing page
  const handleQuickPersona = (partial: Partial<EntrepreneurProfile>) => {
    const defaultProfile: EntrepreneurProfile = {
      age: 28,
      gender: 'Female',
      socialCategory: 'OBC',
      state: 'Tamil Nadu',
      district: 'Madurai',
      annualIncome: 200000,
      businessType: 'Manufacturing',
      businessStage: 'Planning',
      investmentRequired: 1000000,
      supportNeeded: ['Funding', 'Subsidy'],
      hasUdyamAadhaar: false,
      ...partial
    };

    handleProfileSubmit(defaultProfile);
  };

  // Handler: Scheme selection for detail view
  const handleSelectScheme = (scheme: Scheme) => {
    navigateTo('detail', scheme);
  };

  const handleSelectSchemeById = (schemeId: string) => {
    const found = schemes.find(s => s.id === schemeId);
    if (found) {
      handleSelectScheme(found);
    } else {
      navigateTo('browse');
    }
  };

  // Handler: Toggle bookmark
  const handleToggleSave = (schemeId: string) => {
    setSavedSchemeIds(prev => 
      prev.includes(schemeId) ? prev.filter(id => id !== schemeId) : [...prev, schemeId]
    );
  };

  // Handler: Toggle compare
  const handleToggleCompare = (scheme: Scheme) => {
    setComparedSchemeIds(prev => {
      if (prev.includes(scheme.id)) {
        return prev.filter(id => id !== scheme.id);
      } else {
        if (prev.length >= 3) {
          return [prev[1], prev[2], scheme.id];
        }
        return [...prev, scheme.id];
      }
    });
  };

  // Handler: Track Application from Detail view
  const handleTrackApplication = (schemeId: string) => {
    if (!savedSchemeIds.includes(schemeId)) {
      setSavedSchemeIds(prev => [...prev, schemeId]);
    }

    if (!trackedApplications.some(t => t.schemeId === schemeId)) {
      const newApp: TrackedApplication = {
        id: `track-${Date.now()}`,
        schemeId: schemeId,
        stage: 'Discovered',
        appliedDate: new Date().toISOString().split('T')[0],
        notes: 'Discovered on SchemeMate AI',
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setTrackedApplications(prev => [newApp, ...prev]);
    }

    navigateTo('dashboard');
  };

  // Handler: Update application tracker stage
  const handleUpdateApplicationStage = (appId: string, stage: TrackedApplication['stage'], notes: string) => {
    setTrackedApplications(prev => prev.map(item => {
      if (item.id === appId) {
        return {
          ...item,
          stage,
          notes,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
  };

  const handleRemoveTrackedApplication = (appId: string) => {
    setTrackedApplications(prev => prev.filter(item => item.id !== appId));
  };

  // Handler: Document Vault toggle
  const handleToggleDocumentReady = (docName: string) => {
    setDocumentVaultStatus(prev => ({
      ...prev,
      [docName]: !prev[docName]
    }));
  };

  // Handler: Notifications
  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Filter schemes currently in comparison
  const comparedSchemes = schemes.filter(s => comparedSchemeIds.includes(s.id));
  const savedSchemes = schemes.filter(s => savedSchemeIds.includes(s.id));
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 1. Header & Navigation */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        currentView={currentView}
        onNavigate={(view) => navigateTo(view as AppView)}
        savedCount={savedSchemes.length}
        compareCount={comparedSchemes.length}
        notifications={notifications}
        unreadNotificationsCount={unreadNotificationsCount}
        onOpenNotifications={() => setIsNotificationModalOpen(true)}
        onOpenChat={() => setIsChatOpen(prev => !prev)}
        user={authUser}
        onOpenAuth={(mode) => {
          setAuthModalMode(mode || 'login');
          setIsAuthModalOpen(true);
        }}
        onLogout={() => {
          setAuthUser(null);
          try {
            localStorage.removeItem('schememate_auth_user');
          } catch {}
          setUserProfile(null);
          setSavedSchemeIds([]);
          setTrackedApplications([]);
          setDocumentVaultStatus({});
          navigateTo('landing', null, true);
        }}
        onOpenProfile={(tab) => {
          setUserProfileModalTab(tab || 'profile');
          setIsUserProfileModalOpen(true);
        }}
      />

      {/* 2. Main Content Routing */}
      <main className="flex-1">
        
        {/* Landing Page */}
        {currentView === 'landing' && (
          <LandingHero
            language={language}
            onStartMatching={() => navigateTo('form')}
            onBrowseAll={() => navigateTo('browse')}
            onQuickProfile={handleQuickPersona}
          />
        )}

        {/* Profile Form */}
        {currentView === 'form' && (
          <ProfileForm
            language={language}
            initialProfile={userProfile || undefined}
            onSubmit={handleProfileSubmit}
            onCancel={goBack}
          />
        )}

        {/* Matching Results */}
        {currentView === 'results' && (
          <MatchingResultsView
            language={language}
            results={matchResults.length > 0 ? matchResults : (userProfile ? runSchemeMatching(userProfile, schemes) : runSchemeMatching({
              age: 28,
              gender: 'Female',
              socialCategory: 'OBC',
              state: 'Tamil Nadu',
              district: 'Madurai',
              annualIncome: 200000,
              businessType: 'Manufacturing',
              businessStage: 'Planning',
              investmentRequired: 1000000,
              supportNeeded: ['Funding', 'Subsidy'],
              hasUdyamAadhaar: false,
            }, schemes))}
            onSelectScheme={handleSelectScheme}
            onToggleCompare={handleToggleCompare}
            comparedSchemeIds={comparedSchemeIds}
            onToggleSave={handleToggleSave}
            savedSchemeIds={savedSchemeIds}
            onEditProfile={() => navigateTo('form')}
            onBack={goBack}
          />
        )}

        {/* Scheme Details View */}
        {currentView === 'detail' && selectedScheme && (
          <SchemeDetailView
            language={language}
            scheme={selectedScheme}
            userProfile={userProfile || undefined}
            onBack={goBack}
            isSaved={savedSchemeIds.includes(selectedScheme.id)}
            onToggleSave={handleToggleSave}
            onTrackApplication={handleTrackApplication}
            onOpenChecklistVault={() => navigateTo('vault')}
            documentVaultStatus={documentVaultStatus}
            onToggleDocumentReady={handleToggleDocumentReady}
          />
        )}

        {/* Browse All Schemes View */}
        {currentView === 'browse' && (
          <BrowseAllSchemesView
            language={language}
            schemes={schemes}
            onSelectScheme={handleSelectScheme}
            onToggleCompare={handleToggleCompare}
            comparedSchemeIds={comparedSchemeIds}
            onToggleSave={handleToggleSave}
            savedSchemeIds={savedSchemeIds}
            onStartMatching={() => navigateTo('form')}
            onBack={goBack}
          />
        )}

        {/* Document Checklist & Readiness Vault */}
        {currentView === 'vault' && (
          <DocumentChecklistVault
            language={language}
            documentVaultStatus={documentVaultStatus}
            onToggleDocumentReady={handleToggleDocumentReady}
            onClose={goBack}
          />
        )}

        {/* Scheme Comparison Matrix */}
        {currentView === 'compare' && (
          <SchemeComparisonModal
            language={language}
            comparedSchemes={comparedSchemes}
            allSchemes={schemes}
            onRemoveScheme={(id) => setComparedSchemeIds(prev => prev.filter(s => s !== id))}
            onAddScheme={(scheme) => handleToggleCompare(scheme)}
            onSelectScheme={handleSelectScheme}
            onClose={goBack}
          />
        )}

        {/* User Dashboard - Protected with Login Gatekeeper */}
        {currentView === 'dashboard' && (
          authUser ? (
            <UserDashboardView
              language={language}
              savedSchemes={savedSchemes}
              allSchemes={schemes}
              trackedApplications={trackedApplications}
              userProfile={userProfile || undefined}
              user={authUser}
              documentVaultStatus={documentVaultStatus}
              onRemoveSavedScheme={(id) => handleToggleSave(id)}
              onUpdateApplicationStage={handleUpdateApplicationStage}
              onRemoveTrackedApplication={handleRemoveTrackedApplication}
              onSelectScheme={handleSelectScheme}
              onEditProfile={() => navigateTo('form')}
              onOpenVault={() => navigateTo('vault')}
              onBack={goBack}
            />
          ) : (
            <div className="max-w-md mx-auto my-16 px-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#4F46E5] text-[#06B6D4] flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl font-bold text-[#1E1B4B] mb-2">
                  {language === 'ta' ? 'உள்நுழைவு தேவை' : 'Sign In Required'}
                </h2>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  {language === 'ta' 
                    ? 'உங்கள் சேமிக்கப்பட்ட திட்டங்கள், அரசு விண்ணப்ப கண்காணிப்பு மற்றும் ஆவணங்களை பாதுகாப்பாக அணுக தயவுசெய்து உள்நுழையவும்.' 
                    : 'Please sign in or create a free account to access your entrepreneur command center, saved schemes, and application tracker.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setPendingRedirectView('dashboard');
                      setAuthModalMode('login');
                      setIsAuthModalOpen(true);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    {language === 'ta' ? 'உள்நுழைக' : 'Sign In'}
                  </button>
                  <button
                    onClick={() => {
                      setPendingRedirectView('dashboard');
                      setAuthModalMode('signup');
                      setIsAuthModalOpen(true);
                    }}
                    className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {language === 'ta' ? 'புதிய கணக்கு துவங்க' : 'Create Free Account'}
                  </button>
                </div>
              </div>
            </div>
          )
        )}

      </main>

      {/* 3. Global AI Chat Assistant Floating Widget */}
      <AiChatAssistant 
        language={language} 
        isOpen={isChatOpen}
        onToggleOpen={(open) => setIsChatOpen(open)}
      />

      {/* 4. Notification Center Modal */}
      <NotificationCenterModal
        language={language}
        notifications={notifications}
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        onMarkAllRead={handleMarkAllNotificationsRead}
        onSelectSchemeById={handleSelectSchemeById}
        onNavigateToView={(view) => {
          setIsNotificationModalOpen(false);
          navigateTo(view as AppView);
        }}
        onMarkNotificationRead={(id) => {
          setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true, unread: false } : n));
        }}
      />

      {/* 5. User Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        language={language}
        initialMode={authModalMode}
        onLoginSuccess={(user) => {
          setAuthUser(user);
          try {
            localStorage.setItem('schememate_auth_user', JSON.stringify(user));
          } catch (e) {
            console.warn(e);
          }

          // Load per-user data
          try {
            const userProfileData = localStorage.getItem(`schememate_profile_${user.id}`) || localStorage.getItem('schememate_profile');
            if (userProfileData) {
              setUserProfile(JSON.parse(userProfileData));
            }
            const savedData = localStorage.getItem(`schememate_saved_${user.id}`);
            if (savedData) {
              setSavedSchemeIds(JSON.parse(savedData));
            }
            const trackedData = localStorage.getItem(`schememate_tracked_${user.id}`);
            if (trackedData) {
              setTrackedApplications(JSON.parse(trackedData));
            }
            const docsData = localStorage.getItem(`schememate_docs_${user.id}`);
            if (docsData) {
              setDocumentVaultStatus(JSON.parse(docsData));
            }
          } catch (e) {
            console.warn(e);
          }

          setIsAuthModalOpen(false);

          if (pendingRedirectView) {
            const target = pendingRedirectView;
            setPendingRedirectView(null);
            navigateTo(target);
          }
        }}
      />

      {/* 6. User Profile & Account Settings Modal */}
      {authUser && (
        <UserProfileModal
          isOpen={isUserProfileModalOpen}
          onClose={() => setIsUserProfileModalOpen(false)}
          language={language}
          onLanguageChange={handleLanguageChange}
          user={authUser}
          activeTab={userProfileModalTab}
          onUpdateUser={(updatedUser) => {
            setAuthUser(updatedUser);
            try {
              localStorage.setItem('schememate_auth_user', JSON.stringify(updatedUser));
            } catch (e) {
              console.warn(e);
            }
          }}
        />
      )}

      {/* 5. Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Statutory Notice */}
          <div className="mb-8 p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 text-xs">
            <span className="font-bold text-amber-400 block sm:inline mr-2">
              {t.disclaimer.banner}:
            </span>
            <span>
              {t.disclaimer.text} SchemeMate AI provides algorithmically matched guidance and readiness assessments. Final project sanction, subsidy release, and loan underwriting are subject to District Task Force Committee approvals and scheduled commercial banks in accordance with official Ministry guidelines.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-extrabold text-sm">
                  SM
                </div>
                <span className="font-extrabold text-sm text-white">SchemeMate AI</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Empowering small and marginalized entrepreneurs across India with AI-powered government scheme discovery, Tamil/English accessibility, and readiness checklists.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
                Essential Portals
              </h4>
              <ul className="space-y-2">
                <li><a href="https://udyamregistration.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400">Udyam Registration (Free)</a></li>
                <li><a href="https://www.kviconline.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400">PMEGP Online e-Portal</a></li>
                <li><a href="https://www.mudra.org.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400">Pradhan Mantri MUDRA Yojana</a></li>
                <li><a href="https://www.msmeonline.tn.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400">Tamil Nadu MSME (NEEDS & UYEGP)</a></li>
                <li><a href="https://pmvishwakarma.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400">PM Vishwakarma Portal</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
                Helpline & Support
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>National MSME Helpline: <strong className="text-slate-200">1800-180-6763</strong></li>
                <li>KVIC Central Toll-Free: <strong className="text-slate-200">1800-22-6763</strong></li>
                <li>Tamil Nadu DIC Support: <strong className="text-slate-200">044-2250 1485</strong></li>
                <li>Language Support: English & தமிழ் (Tamil)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">
                SchemeMate AI Platform
              </h4>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                Dedicated digital initiative designed to bridge the government information gap for tier-2/3 micro-enterprises, rural artisans, and marginalized founders with conversational AI assistance.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-[11px] border border-slate-700">
                <span className="w-2 h-2 rounded-full bg-[#06B6D4]"></span>
                <span>Active Government Policy Feed</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-[11px]">
            © 2026 SchemeMate AI. Non-commercial open platform for entrepreneur empowerment.
          </div>
        </div>
      </footer>

    </div>
  );
}

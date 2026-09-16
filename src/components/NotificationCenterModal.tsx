import React from 'react';
import { translations } from '../data/translations';
import { Language, SchemeNotification, Scheme } from '../types';
import { 
  Bell, 
  X, 
  AlertCircle, 
  Calendar, 
  ArrowRight, 
  Check, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface NotificationCenterModalProps {
  language: Language;
  notifications: SchemeNotification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllRead: () => void;
  onSelectSchemeById: (schemeId: string) => void;
  onNavigateToView?: (view: any) => void;
  onMarkNotificationRead?: (id: string) => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  language,
  notifications,
  isOpen,
  onClose,
  onMarkAllRead,
  onSelectSchemeById,
  onNavigateToView,
  onMarkNotificationRead
}) => {
  const t = translations[language];

  if (!isOpen) return null;

  const handleNotificationClick = (n: SchemeNotification) => {
    if (onMarkNotificationRead) {
      onMarkNotificationRead(n.id);
    }

    const schemeId = n.schemeId || n.relatedSchemeId;
    if (schemeId) {
      onSelectSchemeById(schemeId);
      onClose();
      return;
    }

    if (n.targetView && onNavigateToView) {
      onNavigateToView(n.targetView);
      onClose();
      return;
    }

    // Default to browse if no specific target
    if (onNavigateToView) {
      onNavigateToView('browse');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 border border-slate-200">
        
        {/* Modal Header with Deep Navy Blue */}
        <div className="p-5 border-b border-indigo-700 flex items-center justify-between bg-[#4F46E5] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#7C3AED]/30 border border-[#7C3AED]/50 flex items-center justify-center text-[#06B6D4]">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">
                {language === 'ta' ? 'அரசு திட்ட அறிவிப்புகள் & காலக்கெடு' : 'Government Scheme Bulletins & Deadlines'}
              </h3>
              <p className="text-[10px] text-slate-200">
                {language === 'ta' ? 'சமீபத்திய மானிய புதுப்பிப்புகள்' : 'Official MSME tranches & updates • Tap any notification to view'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-3 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-600 font-semibold">
            {notifications.length} {language === 'ta' ? 'அறிவிப்புகள்' : 'Active announcements'}
          </span>
          <button
            onClick={onMarkAllRead}
            className="text-[#4F46E5] hover:text-[#4338CA] font-bold flex items-center gap-1 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{t.notifications.markAllRead}</span>
          </button>
        </div>

        {/* Notifications list */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAFC]">
          {notifications.map(n => {
            const title = language === 'ta' ? n.titleTamil : n.title;
            const message = language === 'ta' ? (n.messageTamil || n.summaryTamil) : (n.message || n.summary);
            const isUnread = n.unread || !n.read;

            return (
              <div 
                key={n.id} 
                onClick={() => handleNotificationClick(n)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer group text-left ${
                  isUnread 
                    ? 'bg-white border-[#4F46E5]/40 shadow-xs hover:border-[#4F46E5] hover:shadow-md' 
                    : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      n.category === 'Deadline Alert' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                      n.category === 'New Scheme' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      'bg-indigo-100 text-[#4F46E5] border border-indigo-200'
                    }`}>
                      {n.category || n.type || 'Notice'}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {n.date}
                    </span>
                  </div>

                  {isUnread && (
                    <span className="w-2 h-2 rounded-full bg-[#4F46E5] shrink-0 mt-1 animate-pulse" title="Unread" />
                  )}
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-[#1E1B4B] leading-snug group-hover:text-[#4F46E5] transition-colors">
                  {title}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {message}
                </p>

                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#4F46E5] group-hover:underline">
                    <span>{language === 'ta' ? 'திட்டத்தைக் காண்க' : 'Open Scheme Details'}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <span className="text-[10px] text-slate-400">Tap to view</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-slate-200 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold transition-all cursor-pointer"
          >
            {language === 'ta' ? 'மூடுக' : 'Close Announcements'}
          </button>
        </div>

      </div>
    </div>
  );
};

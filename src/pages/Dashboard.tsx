import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { EVENT_CONFIG } from '../data/event';
import {
  LogOut,
  Shield,
  Copy,
  Check,
  Users,
  Calendar,
  Radio,
} from 'lucide-react';

interface DashboardProps {
  navigate: (path: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ navigate }) => {
  const { user, isAuthenticated, signOut, updateTeam } = useAuth();
  const [copiedCode, setCopiedCode] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [isEditingTeam, setIsEditingTeam] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) return null;

  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText(`HEROES-${user.operativeId}-SQUAD`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSaveTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeamName.trim()) {
      updateTeam(newTeamName.trim());
      setIsEditingTeam(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 select-none bg-[#050608] relative">
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400 mb-1">
              <span className="w-2 h-2 rounded-full bg-gfg-green animate-pulse" />
              <span>TERMINAL // MISSION CONTROL COMMAND</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
              OPERATIVE DISPATCH: {user.fullName}
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all interactive"
            >
              VISIT HOME
            </button>

            <button
              onClick={() => {
                signOut();
                navigate('/login');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-mono text-rose-300 transition-all interactive"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>SIGN OUT</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-3xl bg-[#090C12]/90 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                  {user.status}
                </span>
                <span className="font-mono text-[10px] text-slate-500">
                  {EVENT_CONFIG.sector}
                </span>
              </div>

              <div className="my-6">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  OPERATIVE CALLSIGN
                </div>
                <div className="text-2xl font-black font-display text-white tracking-tight">
                  {user.fullName}
                </div>
                <div className="text-lg font-mono font-bold text-gfg-green mt-1">
                  {user.operativeId}
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/[0.07] text-xs font-mono text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">SECTOR / BASE:</span>
                  <span className="text-white">{user.college}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">ACADEMIC STANDING:</span>
                  <span className="text-white">{user.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">DEPARTMENT:</span>
                  <span className="text-white">{user.branch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SPECIALIZATION:</span>
                  <span className="text-cyan-400">{user.roleSpecialization}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.06] text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <span>{user.clearanceLevel}</span>
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#090C12]/90 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <h3 className="font-display font-bold text-lg text-white">SQUAD ROSTER</h3>
                </div>
                <span className="font-mono text-[10px] text-amber-400 font-semibold">
                  2–4 OPERATIVES ALLOWED
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-4">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
                  CURRENT SQUAD
                </div>
                {isEditingTeam ? (
                  <form onSubmit={handleSaveTeam} className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      placeholder="Enter new squad name"
                      className="px-3 py-1.5 rounded-lg bg-space-950 border border-white/20 text-xs text-white outline-none w-full"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-gfg-green text-black font-mono text-xs font-bold"
                    >
                      SAVE
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-lg text-white">
                      {user.teamName || 'SOLO OPERATIVE (UNASSIGNED)'}
                    </span>
                    <button
                      onClick={() => {
                        setNewTeamName(user.teamName || '');
                        setIsEditingTeam(true);
                      }}
                      className="text-xs font-mono text-gfg-green hover:underline"
                    >
                      EDIT
                    </button>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                  TACTICAL SQUAD INVITE CODE
                </label>
                <div className="flex items-center gap-2">
                  <div className="w-full px-3 py-2 rounded-xl bg-space-950 border border-white/10 font-mono text-xs text-slate-200">
                    HEROES-{user.operativeId}-SQUAD
                  </div>
                  <button
                    onClick={handleCopyInviteCode}
                    className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-all interactive"
                    title="Copy Invite Code"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-gfg-green" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                  Share this code with teammates so they can link into your unit.
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center justify-between text-xs font-mono p-2 rounded-lg bg-white/[0.02]">
                <span className="text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gfg-green" />
                  {user.fullName} (You)
                </span>
                <span className="text-slate-500">SQUAD LEADER</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono p-2 rounded-lg border border-dashed border-white/10 text-slate-500">
                <span>[SLOT 02: PENDING INVITATION]</span>
                <span className="text-amber-400">OPEN</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#090C12]/90 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <h3 className="font-display font-bold text-lg text-white">MISSION PARAMETERS</h3>
              </div>

              <div className="space-y-3 mb-6 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-slate-500 block text-[10px]">EVENT</span>
                  <span className="text-white font-bold">{EVENT_CONFIG.eventName}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-slate-500 block text-[10px]">COORDINATES / BASE</span>
                  <span className="text-white">{EVENT_CONFIG.venue}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-slate-500 block text-[10px]">SCHEDULE TIMEFRAME</span>
                  <span className="text-amber-400 font-bold">{EVENT_CONFIG.date} • {EVENT_CONFIG.time}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06]">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
                PRE-FLIGHT READINESS CHECKLIST
              </div>
              <div className="space-y-1.5 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>Operative Identity Cleared</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="w-3.5 h-3.5 rounded-full border border-white/20 flex items-center justify-center text-[8px]" />
                  <span>Hardware Check & Laptop Setup</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="w-3.5 h-3.5 rounded-full border border-white/20 flex items-center justify-center text-[8px]" />
                  <span>Join Official GFG Discord Sector</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <Radio className="w-4 h-4 text-gfg-green animate-pulse" />
            <span>
              AUTHENTICATED TRANSMISSION STREAM ACTIVE // SESSION CIPHER: <code>{user.id}</code>
            </span>
          </div>
          <span className="text-slate-500 text-[11px]">
            GFG STUDENT CHAPTER × BENNETT UNIVERSITY
          </span>
        </div>
      </div>
    </div>
  );
};

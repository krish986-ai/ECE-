import React from 'react';
import { EcePillar } from '../types/ece';

interface PillarDetailModalProps {
  pillar: EcePillar | null;
  onClose: () => void;
}

export const PillarDetailModal: React.FC<PillarDetailModalProps> = ({ pillar, onClose }) => {
  if (!pillar) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0c111d] border border-cyan-500/40 rounded-xl p-6 sm:p-8 shadow-2xl">
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-white/[0.08] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <span className="material-symbols-outlined text-[26px]">{pillar.iconName}</span>
            </span>
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
                <span>{pillar.number}</span>
                <span>•</span>
                <span>EDA: {pillar.edaSuites}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">{pillar.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Overview */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 mb-2">Architectural Scope</h4>
          <p className="text-sm text-zinc-300 leading-relaxed">{pillar.overview}</p>
        </div>

        {/* Core Concepts */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 mb-2">Core Technical Disciplines</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {pillar.coreConcepts.map((concept, idx) => (
              <div key={idx} className="p-2.5 rounded bg-black/40 border border-white/[0.05] text-xs text-zinc-200 flex items-start gap-2">
                <span className="text-cyan-400 font-mono">0{idx + 1}.</span>
                <span>{concept}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Equations */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 mb-2">Governing Physics &amp; Formulas</h4>
          <div className="space-y-2 font-mono">
            {pillar.keyEquations.map((eq, idx) => (
              <div key={idx} className="p-3 rounded bg-black/60 border border-white/[0.06]">
                <div className="flex justify-between text-xs text-cyan-400 mb-1">
                  <span>{eq.name}</span>
                </div>
                <div className="text-sm text-white font-semibold mb-1">{eq.formula}</div>
                <div className="text-[11px] text-zinc-400">{eq.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Meta: Reference texts & Companies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.08] text-xs">
          <div>
            <div className="font-mono text-zinc-500 mb-1.5 uppercase tracking-wider text-[11px]">Recommended Canonical Texts</div>
            <ul className="space-y-1 text-zinc-300">
              {pillar.recommendedBooks.map((b, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="text-cyan-400">📖</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-zinc-500 mb-1.5 uppercase tracking-wider text-[11px]">Key Hiring Enterprises</div>
            <div className="flex flex-wrap gap-1.5">
              {pillar.topCompanies.map((c, i) => (
                <span key={i} className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-800 border border-white/[0.06] text-zinc-300">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

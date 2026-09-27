import React, { useState } from 'react';
import { CURRICULUM_TIERS } from '../data/eceData';
import { ModuleItem } from '../types/ece';

export const RoadmapSection: React.FC = () => {
  const [activeTierId, setActiveTierId] = useState<number>(1);
  const [selectedModule, setSelectedModule] = useState<ModuleItem | null>(null);

  const activeTier = CURRICULUM_TIERS.find((t) => t.id === activeTierId) || CURRICULUM_TIERS[0];

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 w-full border-b border-white/[0.07]" id="roadmap">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
            <span className="material-symbols-outlined text-[15px]">account_tree</span>
            Curriculum Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Progressive 4-Tier Learning Trajectory
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            A linear progression from fundamental lumped Kirchhoff circuits and semiconductor physics to deep sub-micron ASIC synthesis.
          </p>
        </div>

        {/* Segmented Tab Controls */}
        <div className="inline-flex p-1 bg-zinc-900/90 rounded-lg border border-white/[0.08] text-xs font-mono self-start md:self-auto overflow-x-auto max-w-full">
          {CURRICULUM_TIERS.map((tier) => {
            const isActive = tier.id === activeTierId;
            return (
              <button
                key={tier.id}
                onClick={() => {
                  setActiveTierId(tier.id);
                  setSelectedModule(null);
                }}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white/[0.08] text-white font-medium border border-white/[0.08]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tier.semesterRange.replace('SEMESTERS', 'Sem')}: {tier.title.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Card */}
      <div className="relative min-h-[320px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-xl bg-zinc-900/50 border border-white/[0.08] transition-all duration-300">
          {/* Left Sub-column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
                <span>{activeTier.stageLabel}</span>
                <span>•</span>
                <span>{activeTier.semesterRange}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{activeTier.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{activeTier.description}</p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>PRIMARY TOOLS: {activeTier.primaryTools}</span>
              <span className="text-cyan-400 font-semibold">{activeTier.labSessionsCount} LAB SESSIONS</span>
            </div>
          </div>

          {/* Right Sub-column: 4 Module Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeTier.modules.map((mod) => {
              const isSelected = selectedModule?.id === mod.id;
              return (
                <div
                  key={mod.id}
                  onClick={() => setSelectedModule(isSelected ? null : mod)}
                  className={`p-4 rounded-lg bg-black/40 border transition-all cursor-pointer hover:border-cyan-500/40 ${
                    isSelected ? 'border-cyan-400 bg-cyan-950/20' : 'border-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-cyan-300">{mod.code}</span>
                    <span className="text-[10px] font-mono text-zinc-500">{mod.labHours} hrs</span>
                  </div>
                  <p className="text-xs text-zinc-300 font-medium">{mod.description}</p>
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-mono text-cyan-400/80">
                    <span>{isSelected ? 'Collapse details ▲' : 'View syllabus & formula ▼'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Module Detail Panel */}
        {selectedModule && (
          <div className="mt-4 p-5 rounded-xl bg-[#0c121e] border border-cyan-500/30 text-xs font-mono animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">{selectedModule.code}</span>
                <span className="text-zinc-500">|</span>
                <span className="text-white font-medium">{selectedModule.title}</span>
              </div>
              <button
                onClick={() => setSelectedModule(null)}
                className="text-zinc-400 hover:text-white px-2 py-0.5 rounded bg-zinc-800"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-zinc-400 mb-1 text-[11px] uppercase tracking-wider">Curriculum Topics Covered</div>
                <ul className="space-y-1 text-zinc-200">
                  {selectedModule.topics.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-cyan-400">▹</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-zinc-400 mb-1 text-[11px] uppercase tracking-wider">Key Mathematical Governing Equation</div>
                <div className="p-3 bg-black/60 rounded border border-white/[0.08] text-cyan-300 font-mono text-xs">
                  {selectedModule.keyFormula}
                </div>
                <div className="mt-2 text-[11px] text-zinc-400">
                  Total laboratory contact: <span className="text-white font-bold">{selectedModule.labHours} hours</span> with verified SPICE simulation decks and physical probe analysis.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

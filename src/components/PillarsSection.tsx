import React, { useState } from 'react';
import { ECE_PILLARS } from '../data/eceData';
import { EcePillar } from '../types/ece';
import { PillarDetailModal } from './PillarDetailModal';

export const PillarsSection: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<EcePillar | null>(null);

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 w-full border-b border-white/[0.07]" id="domains">
      <div className="flex flex-col gap-2 mb-12">
        <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-[15px]">grid_view</span>
          Domain Categorization
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">The 5 Core Pillars of Modern ECE</h2>
        <p className="text-sm text-zinc-400 max-w-2xl">
          Deep-dive across the industry's five core hardware specializations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ECE_PILLARS.map((pillar, idx) => {
          const isSpanTwo = idx === 4;
          return (
            <div
              key={pillar.id}
              onClick={() => setSelectedPillar(pillar)}
              className={`group p-6 rounded-xl bg-zinc-900/40 border border-white/[0.08] hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all flex flex-col justify-between cursor-pointer ${
                isSpanTwo ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all">
                    <span className="material-symbols-outlined text-[20px]">{pillar.iconName}</span>
                  </span>
                  <span className="font-mono text-[11px] text-zinc-500">{pillar.number}</span>
                </div>

                <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {pillar.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {pillar.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="font-mono text-[10px] px-2 py-0.5 rounded bg-zinc-800/70 text-zinc-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-500">{pillar.edaSuites}</span>
                <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Explore →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-dive details modal */}
      <PillarDetailModal pillar={selectedPillar} onClose={() => setSelectedPillar(null)} />
    </section>
  );
};

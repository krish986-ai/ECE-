import React, { useState } from 'react';
import { VERIFIED_PROJECTS } from '../data/eceData';
import { HardwareProject } from '../types/ece';
import { DossierModal } from './DossierModal';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<HardwareProject | null>(null);

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 w-full border-b border-white/[0.07]" id="projects">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest flex items-center gap-2">
            <span className="material-symbols-outlined text-[15px]">folder_open</span>
            Open Source Schematics
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Verified Production Projects</h2>
          <p className="text-sm text-zinc-400 mt-1">Complete dossiers with verified KiCad layout files, BOM tables, and testbenches.</p>
        </div>
        <div className="font-mono text-xs text-zinc-500">
          LICENSE: CERN-OHL-S V2
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {VERIFIED_PROJECTS.map((proj) => (
          <div
            key={proj.id}
            className="p-6 rounded-xl bg-zinc-900/40 border border-white/[0.08] hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono">
                <span className={`px-2 py-0.5 rounded bg-zinc-800 ${
                  proj.id === 'proj-2' ? 'text-teal-300' : 'text-cyan-300'
                }`}>
                  {proj.stage}
                </span>
                <span className="text-zinc-500">BOM: {proj.bomCost}</span>
              </div>

              <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                {proj.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {proj.description}
              </p>

              <div className="mt-4 p-3 rounded bg-black/40 border border-white/[0.04] space-y-1 font-mono text-[11px]">
                {proj.id === 'proj-1' && (
                  <>
                    <div className="flex justify-between text-zinc-400">
                      <span>CORE IC:</span>
                      <span className="text-zinc-200">NE555P Precision</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>RAIL:</span>
                      <span className="text-zinc-200">5V – 12V DC</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>FORMAT:</span>
                      <span className="text-zinc-200">Single-sided FR4</span>
                    </div>
                  </>
                )}
                {proj.id === 'proj-2' && (
                  <>
                    <div className="flex justify-between text-zinc-400">
                      <span>MCU:</span>
                      <span className="text-zinc-200">ARM Cortex-M4 84MHz</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>ADC:</span>
                      <span className="text-zinc-200">2.4 MSPS DMA Dual</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>LIB:</span>
                      <span className="text-zinc-200">CMSIS-DSP Native</span>
                    </div>
                  </>
                )}
                {proj.id === 'proj-3' && (
                  <>
                    <div className="flex justify-between text-zinc-400">
                      <span>SPEC:</span>
                      <span className="text-zinc-200">RV32I User-Level v2.2</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>CLOCK:</span>
                      <span className="text-zinc-200">62.5 MHz Post-PAR</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>TARGET:</span>
                      <span className="text-zinc-200">Artix-7 / Tang Nano</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">
                {proj.id === 'proj-1' ? 'KiCad Schematics' : proj.id === 'proj-2' ? 'Firmware & C-Code' : 'Verilog RTL Testbench'}
              </span>
              <button
                onClick={() => setSelectedProject(proj)}
                className="text-cyan-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Dossier</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dossier Modal */}
      <DossierModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

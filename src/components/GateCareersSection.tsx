import React, { useState } from 'react';
import { GATE_SYLLABUS, TOOLKIT_DOSSIERS } from '../data/eceData';
import { SyllabusItem, ToolkitDossier } from '../types/ece';
import { ToolkitModal } from './ToolkitModal';

export const GateCareersSection: React.FC = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<SyllabusItem | null>(null);
  const [selectedToolkit, setSelectedToolkit] = useState<ToolkitDossier | null>(null);

  // Quick Score Calculator
  const [targetScore, setTargetScore] = useState<number>(78);

  const recruiters = [
    'Qualcomm',
    'TI Labs',
    'Intel Logic',
    'NVIDIA Silicon',
    'Apple HW',
    'AMD VLSI',
    'Broadcom',
    'ISRO / NASA',
  ];

  const getAdmissionVerdict = (score: number) => {
    if (score >= 80) return { label: 'Top 100 AIR // IISc / IIT Bombay Microelectronics', color: 'text-cyan-300' };
    if (score >= 68) return { label: 'IIT Madras / Delhi / Kharagpur VLSI & DSP Direct', color: 'text-teal-300' };
    if (score >= 50) return { label: 'Top NITs / IIITs Embedded Systems & Microwave', color: 'text-amber-300' };
    if (score >= 27) return { label: 'Qualifying Cutoff Cleared // PSU Eligible', color: 'text-zinc-300' };
    return { label: 'Below Qualifying Cutoff Threshold', color: 'text-rose-400' };
  };

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 w-full" id="gate">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* GATE Mark Distribution */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-xl bg-zinc-900/40 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-white">GATE ECE Syllabus Mark Weightage</h3>
              <span className="font-mono text-xs text-cyan-400 bg-black/40 px-2 py-0.5 rounded border border-white/[0.06]">
                10-Yr Calibrated
              </span>
            </div>
            <p className="text-xs text-zinc-400 mb-6">
              Standard question frequency distribution across Graduate Aptitude examination disciplines:
            </p>

            <div className="space-y-3 font-mono text-xs">
              {GATE_SYLLABUS.map((item, idx) => {
                const isSelected = selectedDiscipline?.discipline === item.discipline;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedDiscipline(isSelected ? null : item)}
                    className="cursor-pointer group"
                  >
                    <div className="flex justify-between text-zinc-300 mb-1">
                      <span className="group-hover:text-white transition-colors">
                        {item.discipline}
                      </span>
                      <span
                        className={
                          item.color === '#00f2fe'
                            ? 'text-cyan-400'
                            : item.color === '#3fddbf'
                            ? 'text-teal-300'
                            : item.percentage === 28
                            ? 'text-zinc-500'
                            : 'text-zinc-400'
                        }
                      >
                        {item.percentage}% ({item.marks} Marks)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.percentage === 28 ? 100 : item.percentage * 10}%`,
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>

                    {/* Expandable Topic Hints */}
                    {isSelected && (
                      <div className="mt-2 p-2.5 rounded bg-black/60 border border-cyan-500/20 text-[11px] font-sans text-zinc-300 space-y-1">
                        <div className="font-mono text-[10px] text-cyan-400 font-bold uppercase">
                          High-Yield Syllabus Topics:
                        </div>
                        <ul className="list-disc list-inside space-y-0.5 text-zinc-300">
                          {item.topics.map((t, ti) => (
                            <li key={ti}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.06]">
            {/* Interactive Target Score Estimator */}
            <div className="mb-4 p-3 rounded-lg bg-black/40 border border-white/[0.05]">
              <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                <span className="text-zinc-400">Target Score Simulator:</span>
                <span className="text-cyan-400 font-bold text-sm">{targetScore} / 100</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={targetScore}
                onChange={(e) => setTargetScore(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded appearance-none cursor-pointer"
              />
              <div className="mt-2 text-[11px] font-mono flex items-center justify-between">
                <span className="text-zinc-500">Predicted Allocation:</span>
                <span className={`font-semibold ${getAdmissionVerdict(targetScore).color}`}>
                  {getAdmissionVerdict(targetScore).label}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500">
              <span>QUALIFYING CUTOFF: ~27 MARKS</span>
              <span className="text-cyan-400 font-semibold">IIT/PSU TARGET: 75+ MARKS</span>
            </div>
          </div>
        </div>

        {/* Hiring Giants & Student Downloads */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Hiring Matrix */}
          <div className="p-6 rounded-xl bg-zinc-900/40 border border-white/[0.08]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-white">Tier-1 Semiconductor &amp; Space Recruiters</h3>
              <span className="font-mono text-xs text-zinc-500">PHYSICAL DESIGN &amp; RF</span>
            </div>
            <p className="text-xs text-zinc-400 mb-4">Enterprise labs hiring specialized graduates from this syllabus:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
              {recruiters.map((recruiter, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded bg-black/40 border border-white/[0.04] text-center text-zinc-200 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors cursor-default"
                >
                  {recruiter}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Dossier Downloads */}
          <div className="p-6 rounded-xl bg-zinc-900/40 border border-white/[0.08]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Student Engineering Toolkit</h3>
              <span className="font-mono text-[11px] text-cyan-400">PDF DOSSIERS</span>
            </div>
            <div className="space-y-2 text-xs font-mono">
              {TOOLKIT_DOSSIERS.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedToolkit(doc)}
                  className="w-full p-2.5 rounded bg-black/30 hover:bg-black/60 border border-white/[0.04] hover:border-cyan-500/30 flex items-center justify-between text-zinc-300 hover:text-white transition-all cursor-pointer text-left"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-cyan-400">description</span>
                    <span>{doc.title}</span>
                  </span>
                  <span className="text-zinc-500 text-[10px] shrink-0 ml-2">{doc.fileSize}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toolkit Modal Viewer */}
      <ToolkitModal dossier={selectedToolkit} onClose={() => setSelectedToolkit(null)} />
    </section>
  );
};

import React from 'react';
import { ToolkitDossier } from '../types/ece';

interface ToolkitModalProps {
  dossier: ToolkitDossier | null;
  onClose: () => void;
}

export const ToolkitModal: React.FC<ToolkitModalProps> = ({ dossier, onClose }) => {
  if (!dossier) return null;

  const handleDownload = () => {
    const content = `ECE MATRIX // STUDENT ENGINEERING TOOLKIT
Title: ${dossier.title}
Category: ${dossier.category}
Pages: ${dossier.pages} pages (${dossier.fileSize})

${dossier.sections
  .map(
    (sec) =>
      `=== ${sec.heading} ===\n` +
      sec.formulas.map((f) => `* ${f.name}\n  Equation: ${f.eq}\n  Note: ${f.desc || ''}\n`).join('\n')
  )
  .join('\n\n')}
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${dossier.id}_handbook_dossier.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0c111d] border border-cyan-500/40 rounded-xl p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/[0.08] pb-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <span className="material-symbols-outlined text-[24px]">description</span>
            </span>
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-0.5">
                <span>{dossier.category}</span>
                <span>•</span>
                <span className="text-zinc-400">{dossier.pages} Pages</span>
                <span>•</span>
                <span className="text-teal-300">{dossier.fileSize}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">{dossier.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content sections */}
        <div className="space-y-6">
          {dossier.sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 border-b border-white/[0.06] pb-1.5">
                {section.heading}
              </h4>
              <div className="space-y-2.5">
                {section.formulas.map((item, fIdx) => (
                  <div key={fIdx} className="p-3 rounded-lg bg-black/50 border border-white/[0.06] font-mono text-xs">
                    <div className="text-cyan-400 font-bold mb-1">{item.name}</div>
                    <div className="p-2 rounded bg-black/80 text-white font-mono text-xs overflow-x-auto mb-1 border border-white/[0.04]">
                      <code>{item.eq}</code>
                    </div>
                    {item.desc && <div className="text-[11px] text-zinc-400">{item.desc}</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-500">IEEE Standard Academic Reference</span>
          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-md bg-[#00f2fe]/10 border border-[#00f2fe]/40 text-[#00f2fe] hover:bg-[#00f2fe] hover:text-black font-mono text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Download Engineering Sheet</span>
          </button>
        </div>
      </div>
    </div>
  );
};

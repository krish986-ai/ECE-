import React, { useState } from 'react';
import { HardwareProject } from '../types/ece';

interface DossierModalProps {
  project: HardwareProject | null;
  onClose: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bom' | 'code' | 'verification'>('overview');
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.details.verilogOrCodeSnippet) {
      navigator.clipboard.writeText(project.details.verilogOrCodeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPackage = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({
        project: project.title,
        license: "CERN-OHL-S V2",
        specs: project.specs,
        bom: project.details.bomList,
        verification: project.details.verificationNotes,
        snippet: project.details.verilogOrCodeSnippet,
      }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${project.id}_schematic_dossier.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0c111d] border border-cyan-500/40 rounded-xl p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/[0.08] pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>{project.stage}</span>
              <span>•</span>
              <span className="text-zinc-400">LICENSE: CERN-OHL-S V2</span>
              <span>•</span>
              <span className="text-teal-300">BOM: {project.bomCost}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 border-b border-white/[0.08] mb-5 text-xs font-mono">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Schematic Circuit Architecture
          </button>
          <button
            onClick={() => setActiveTab('bom')}
            className={`px-3 py-2 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'bom'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Bill of Materials (BOM)
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-2 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'code'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            SPICE / Verilog Netlist
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`px-3 py-2 border-b-2 font-medium transition-colors cursor-pointer ${
              activeTab === 'verification'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Lab Verification
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <p className="text-sm text-zinc-300 leading-relaxed">
              {project.details.schematicOverview}
            </p>

            <div className="p-4 rounded-lg bg-black/60 border border-white/[0.06] space-y-2 font-mono text-xs">
              <div className="text-cyan-400 font-bold mb-2">Hardware Specifications:</div>
              {Object.entries(project.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between border-b border-white/[0.04] pb-1">
                  <span className="text-zinc-400 uppercase">{key}:</span>
                  <span className="text-white">{String(val)}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono text-zinc-400">Layout format: KiCad 8.0 &amp; Gerbers Verified</span>
              <button
                onClick={handleDownloadPackage}
                className="px-3 py-1.5 rounded bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500 hover:text-black font-mono text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Download Dossier Bundle (.json)</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'bom' && (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border border-white/[0.08] rounded">
                <thead>
                  <tr className="bg-zinc-900 border-b border-white/[0.08] text-zinc-400">
                    <th className="p-2.5">Designator</th>
                    <th className="p-2.5">Component</th>
                    <th className="p-2.5">Value / Rating</th>
                    <th className="p-2.5">Package</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {project.details.bomList.map((b, i) => (
                    <tr key={i} className="hover:bg-white/[0.02]">
                      <td className="p-2.5 text-cyan-300 font-bold">{b.designator}</td>
                      <td className="p-2.5 text-zinc-200">{b.item}</td>
                      <td className="p-2.5 text-zinc-300">{b.value}</td>
                      <td className="p-2.5 text-zinc-500">{b.package}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-[11px] font-mono text-zinc-500">
              * Unit pricing sourced via DigiKey &amp; LCSC electronics distributor averages. Total est. {project.bomCost}.
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400">Hardware Description / SPICE Netlist File:</span>
              <button
                onClick={handleCopyCode}
                className="text-cyan-400 hover:text-white px-2 py-0.5 rounded bg-zinc-800 transition-colors cursor-pointer"
              >
                {copied ? '✓ Copied!' : 'Copy Code'}
              </button>
            </div>
            <pre className="p-4 rounded-lg bg-black text-cyan-300 font-mono text-xs overflow-x-auto border border-white/[0.08] max-h-72">
              <code>{project.details.verilogOrCodeSnippet}</code>
            </pre>
          </div>
        )}

        {activeTab === 'verification' && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-zinc-900/60 border border-teal-500/20 text-xs font-mono space-y-2">
              <div className="flex items-center gap-2 text-teal-400 font-bold">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Bench Testbench Results</span>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                {project.details.verificationNotes}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-black/40 border border-white/[0.06] rounded">
                <div className="text-zinc-500 uppercase text-[10px]">Thermal Stress</div>
                <div className="text-white mt-1">24hr Soak @ 65°C Validated</div>
              </div>
              <div className="p-3 bg-black/40 border border-white/[0.06] rounded">
                <div className="text-zinc-500 uppercase text-[10px]">Power Margin</div>
                <div className="text-white mt-1">+35% Over-voltage Headroom</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

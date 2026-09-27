import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RoadmapSection } from './components/RoadmapSection';
import { PillarsSection } from './components/PillarsSection';
import { SandboxSection } from './components/SandboxSection';
import { ProjectsSection } from './components/ProjectsSection';
import { GateCareersSection } from './components/GateCareersSection';
import { Footer } from './components/Footer';
import { VirtualScopeModal } from './components/VirtualScopeModal';

export default function App() {
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<{ title: string; content: string } | null>(null);

  const handleSearchTopic = (topic: string) => {
    // Jump to appropriate section or show info
    const lower = topic.toLowerCase();
    if (lower.includes('smith') || lower.includes('rf') || lower.includes('antenna')) {
      document.getElementById('domains')?.scrollIntoView({ behavior: 'smooth' });
    } else if (lower.includes('verilog') || lower.includes('rtl') || lower.includes('vlsi') || lower.includes('fsm')) {
      document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' });
    } else if (lower.includes('nyquist') || lower.includes('filter') || lower.includes('rc') || lower.includes('555')) {
      document.getElementById('bench')?.scrollIntoView({ behavior: 'smooth' });
    } else if (lower.includes('scope') || lower.includes('project') || lower.includes('risc-v')) {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    } else if (lower.includes('gate') || lower.includes('career') || lower.includes('maxwell')) {
      document.getElementById('gate')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090c14] text-[#cfd6e6] flex flex-col font-sans selection:bg-[#00f2fe]/20 selection:text-[#00f2fe]">
      {/* Top Application Navigation */}
      <Header
        onOpenSandbox={() => setIsSandboxOpen(true)}
        onSearchSelect={handleSearchTopic}
      />

      {/* Main Content Area */}
      <main className="w-full pt-16 flex flex-col">
        {/* Hero Section with Live Oscilloscope Canvas */}
        <HeroSection
          onSearchTopic={handleSearchTopic}
          onOpenSandbox={() => setIsSandboxOpen(true)}
        />

        {/* 4-Tier Learning Trajectory */}
        <RoadmapSection />

        {/* The 5 Core Pillars */}
        <PillarsSection />

        {/* Interactive Engineering Sandbox */}
        <SandboxSection />

        {/* Verified Production Projects */}
        <ProjectsSection />

        {/* GATE Exam Distribution & Careers */}
        <GateCareersSection />
      </main>

      {/* Industry Footer */}
      <Footer
        onOpenInfoModal={(title, content) => setInfoModal({ title, content })}
      />

      {/* Virtual Digital Oscilloscope & Function Generator Modal */}
      <VirtualScopeModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />

      {/* Information Dialog */}
      {infoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#0c111d] border border-cyan-500/40 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
              <div className="flex items-center gap-2 font-mono text-sm text-cyan-400 font-bold">
                <span className="material-symbols-outlined text-[18px]">info</span>
                <span>{infoModal.title}</span>
              </div>
              <button
                onClick={() => setInfoModal(null)}
                className="text-zinc-400 hover:text-white p-1 rounded-md bg-zinc-800 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 font-mono leading-relaxed">
              {infoModal.content}
            </p>
            <div className="mt-5 pt-3 border-t border-white/[0.06] flex justify-end">
              <button
                onClick={() => setInfoModal(null)}
                className="px-3.5 py-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500 hover:text-black font-mono text-xs transition-colors cursor-pointer"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

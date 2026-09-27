import React, { useState } from 'react';
import { Logo } from './Logo';

interface HeaderProps {
  onOpenSandbox: () => void;
  onSearchSelect?: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSandbox, onSearchSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchableItems = [
    { title: 'Smith Chart & Impedance Matching', category: 'RF & Microwave', anchor: '#domains' },
    { title: 'Verilog RTL & FSM Synthesis', category: 'VLSI & Silicon', anchor: '#roadmap' },
    { title: 'Nyquist-Shannon Sampling Rate', category: 'Signals & DSP', anchor: '#domains' },
    { title: 'KCL & KVL Circuit Theorems', category: 'Fundamentals', anchor: '#roadmap' },
    { title: 'RC Low-Pass / High-Pass Filter', category: 'Interactive Bench', anchor: '#bench' },
    { title: '555 Astable Multivibrator Frequency', category: 'Interactive Bench', anchor: '#bench' },
    { title: 'STM32 200kHz Digital Scope Schematic', category: 'Open Source Schematics', anchor: '#projects' },
    { title: 'Pipelined RV32I RISC-V CPU Core', category: 'Open Source Schematics', anchor: '#projects' },
    { title: 'GATE ECE Syllabus Mark Weightage', category: 'Exam & Careers', anchor: '#gate' },
    { title: 'Maxwell Equations & Waveguides', category: 'Toolkit PDF', anchor: '#gate' },
    { title: 'FreeRTOS Mutex & Task Prioritization', category: 'Embedded Systems', anchor: '#domains' },
    { title: 'Field-Oriented Control (FOC)', category: 'Robotics & Control', anchor: '#domains' },
  ];

  const filteredResults = searchQuery.trim()
    ? searchableItems.filter(
        item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectResult = (anchor: string, title: string) => {
    setShowSearchResults(false);
    setSearchQuery('');
    if (onSearchSelect) onSearchSelect(title);
    const element = document.querySelector(anchor);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#090c14]/90 backdrop-blur-md border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Logo + Spec Badge */}
        <div className="flex items-center gap-6">
          <a className="flex items-center gap-3 group" href="#top">
            <Logo size="md" />
            <div className="flex flex-col">
              <span className="font-mono text-xs font-semibold tracking-wider text-white flex items-center gap-1.5">
                ECE MATRIX
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-pulse"></span>
              </span>
              <span className="font-mono text-[10px] text-zinc-400 tracking-wider">SYSTEMS LAB v2.4</span>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-2 border-l border-white/[0.08] pl-6">
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-900 border border-white/[0.08] text-cyan-400">
              IEEE ECE 2025 Curricula
            </span>
            <span className="font-mono text-[11px] text-zinc-500">CERN-OHL-S v2</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          <a
            className="px-3 py-1.5 rounded-md text-white bg-white/[0.06] border border-white/[0.08] transition-colors"
            href="#roadmap"
          >
            Roadmap
          </a>
          <a
            className="px-3 py-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-colors"
            href="#domains"
          >
            Domains
          </a>
          <a
            className="px-3 py-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-colors"
            href="#bench"
          >
            Interactive Bench
          </a>
          <a
            className="px-3 py-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-colors"
            href="#projects"
          >
            Schematics
          </a>
          <a
            className="px-3 py-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-colors"
            href="#gate"
          >
            GATE &amp; Careers
          </a>
        </nav>

        {/* Utilities & Actions */}
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:flex items-center">
            <span className="material-symbols-outlined absolute left-2.5 text-zinc-500 text-[16px]">
              terminal
            </span>
            <input
              className="w-56 bg-zinc-900/90 text-xs text-zinc-200 placeholder-zinc-500 pl-8 pr-3 py-1.5 rounded-md border border-white/[0.08] focus:outline-none focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/50 transition-all font-mono"
              placeholder="Search ICs, registers, formulas..."
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 250)}
            />

            {/* Quick dropdown results */}
            {showSearchResults && filteredResults.length > 0 && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-[#0c101c] border border-cyan-500/30 rounded-lg shadow-2xl overflow-hidden py-1 z-50">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-cyan-400 border-b border-white/[0.06]">
                  Matching Nodes &amp; Registers
                </div>
                {filteredResults.slice(0, 6).map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onMouseDown={() => handleSelectResult(item.anchor, item.title)}
                    className="w-full px-3 py-2 text-left hover:bg-white/[0.06] flex items-center justify-between text-xs transition-colors"
                  >
                    <span className="text-zinc-200 font-sans truncate mr-2">{item.title}</span>
                    <span className="text-[10px] font-mono text-cyan-400/80 shrink-0">{item.category}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={onOpenSandbox}
            className="px-3 py-1.5 rounded-md bg-[#00f2fe]/10 border border-[#00f2fe]/40 text-[#00f2fe] text-xs font-mono font-medium hover:bg-[#00f2fe] hover:text-black transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,242,254,0.1)] active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">electric_bolt</span>
            <span>RUN SANDBOX</span>
          </button>
        </div>
      </div>
    </header>
  );
};

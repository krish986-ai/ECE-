import React, { useEffect, useRef, useState } from 'react';
import workbenchImg from '../assets/images/oscilloscope_workbench_1790527531229.jpg';

interface HeroSectionProps {
  onSearchTopic: (topic: string) => void;
  onOpenSandbox: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearchTopic, onOpenSandbox }) => {
  const [topicInput, setTopicInput] = useState('');
  const [probesActive, setProbesActive] = useState(true);
  const [frequencyKhz, setFrequencyKhz] = useState(4.88);
  const [noiseLevel, setNoiseLevel] = useState(0.08);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Oscilloscope live canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let offset = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const mid = h / 2;

      ctx.clearRect(0, 0, w, h);

      if (probesActive) {
        // Draw Primary Sinusoid (CH1 - Electric Cyan)
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#00f2fe';
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(0, 242, 254, 0.7)';

        const freqScale = (frequencyKhz / 4.88) * 0.05;

        for (let x = 0; x < w; x++) {
          const noise = (Math.random() - 0.5) * noiseLevel * 10;
          const y = mid + Math.sin(x * freqScale + offset) * 20 + noise;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Draw Secondary Faint Harmonic (CH2 - Signal Teal)
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(63, 221, 191, 0.5)';
        ctx.shadowBlur = 0;
        for (let x = 0; x < w; x++) {
          const noise = (Math.random() - 0.5) * noiseLevel * 6;
          const y = mid + Math.cos(x * 0.1 - offset * 0.8) * 12 + noise;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        offset += 0.04;
      } else {
        // Ground flatline
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
        ctx.shadowBlur = 0;
        ctx.moveTo(0, mid);
        ctx.lineTo(w, mid);
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [probesActive, frequencyKhz, noiseLevel]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && topicInput.trim()) {
      onSearchTopic(topicInput.trim());
    }
  };

  const handleChipClick = (topic: string) => {
    setTopicInput(topic);
    onSearchTopic(topic);
  };

  return (
    <section className="relative w-full border-b border-white/[0.07] tech-grid py-16 md:py-24 overflow-hidden" id="top">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-teal-500/5 to-transparent blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Title & Overview */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-white/[0.1] w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="font-mono text-[11px] tracking-widest uppercase text-cyan-300">
                SYSTEM ARCHITECTURE // ROADMAP 2025
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.15]">
              From Silicon to Satellite: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-teal-300">
                The Master ECE Architecture
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl font-normal">
              An engineering-grade framework covering circuit foundations, modern VLSI physical tape-out, embedded RTOS, RF microwaves, and edge intelligence.
            </p>

            {/* Metrics bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <a
                href="#roadmap"
                className="p-3.5 rounded-lg bg-zinc-900/70 border border-white/[0.07] hover:border-cyan-500/30 transition-all group"
              >
                <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">Timeline</div>
                <div className="text-xl font-semibold text-white mt-0.5 group-hover:text-cyan-300 transition-colors">
                  8 Semesters
                </div>
                <div className="text-[11px] text-cyan-400/80 font-mono mt-0.5">Structured Path</div>
              </a>

              <a
                href="#domains"
                className="p-3.5 rounded-lg bg-zinc-900/70 border border-white/[0.07] hover:border-cyan-500/30 transition-all group"
              >
                <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">Domains</div>
                <div className="text-xl font-semibold text-white mt-0.5 group-hover:text-cyan-300 transition-colors">
                  5 Core Pillars
                </div>
                <div className="text-[11px] text-cyan-400/80 font-mono mt-0.5">Physical to Wave</div>
              </a>

              <a
                href="#domains"
                className="p-3.5 rounded-lg bg-zinc-900/70 border border-white/[0.07] hover:border-cyan-500/30 transition-all group"
              >
                <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">EDA Toolsets</div>
                <div className="text-xl font-semibold text-white mt-0.5 group-hover:text-cyan-300 transition-colors">
                  18 Industry Suites
                </div>
                <div className="text-[11px] text-cyan-400/80 font-mono mt-0.5">Cadence to KiCad</div>
              </a>

              <a
                href="#projects"
                className="p-3.5 rounded-lg bg-zinc-900/70 border border-white/[0.07] hover:border-cyan-500/30 transition-all group"
              >
                <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">Verification</div>
                <div className="text-xl font-semibold text-white mt-0.5 group-hover:text-cyan-300 transition-colors">
                  100% SPICE
                </div>
                <div className="text-[11px] text-cyan-400/80 font-mono mt-0.5">Open Schematics</div>
              </a>
            </div>

            {/* Terminal Quick Query */}
            <div className="mt-2 p-3 rounded-lg bg-[#0c101b] border border-white/[0.08] flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-2 text-zinc-400 w-full">
                <span className="font-mono text-cyan-400 text-xs">&gt;</span>
                <input
                  className="bg-transparent border-0 text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:ring-0 w-full p-0"
                  id="syntaxInput"
                  placeholder="Jump to topic: 'Smith Chart', 'Verilog RTL', 'Nyquist'..."
                  type="text"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                />
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto font-mono text-[10px] text-zinc-400 shrink-0">
                <button
                  type="button"
                  className="cursor-pointer hover:text-cyan-400 px-2 py-0.5 bg-zinc-800/80 rounded transition-colors active:scale-95"
                  onClick={() => handleChipClick('Smith Chart')}
                >
                  Smith Chart
                </button>
                <button
                  type="button"
                  className="cursor-pointer hover:text-cyan-400 px-2 py-0.5 bg-zinc-800/80 rounded transition-colors active:scale-95"
                  onClick={() => handleChipClick('Verilog RTL')}
                >
                  Verilog
                </button>
                <button
                  type="button"
                  className="cursor-pointer hover:text-cyan-400 px-2 py-0.5 bg-zinc-800/80 rounded transition-colors active:scale-95"
                  onClick={() => handleChipClick('Nyquist')}
                >
                  Nyquist
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Oscilloscope Canvas & Workbench Image */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="rounded-xl overflow-hidden border border-white/[0.1] bg-[#0c101c] shadow-2xl relative group">
              {/* Top Chrome Bar */}
              <div className="h-9 px-4 bg-zinc-900/90 border-b border-white/[0.07] flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <span
                    className={`w-2 h-2 rounded-full inline-block ${
                      probesActive ? 'bg-cyan-400 shadow-[0_0_6px_#00f2fe]' : 'bg-zinc-600'
                    }`}
                  ></span>
                  <span className="font-medium text-white">TESTBENCH RIG #04</span>
                  <span className="text-zinc-500 text-[11px]">// DPO70000SX</span>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="text-cyan-400">100 MHz</span>
                  <span className="text-zinc-500">|</span>
                  <span className="text-zinc-300">3.321 V</span>
                </div>
              </div>

              {/* Lab Workstation Imagery */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  alt="Laboratory Workbench with Oscilloscope and Embedded Hardware"
                  className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] group-hover:scale-[1.02] transition-transform duration-700"
                  src={workbenchImg}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c101c] via-transparent to-black/20 pointer-events-none"></div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono">
                  <button
                    onClick={() => setProbesActive(!probesActive)}
                    className="bg-black/80 backdrop-blur px-2.5 py-1 rounded text-cyan-300 border border-white/10 flex items-center gap-1.5 hover:border-cyan-400/50 transition-all cursor-pointer"
                    title="Click to toggle oscilloscope probes"
                  >
                    <span className="material-symbols-outlined text-[13px] text-cyan-400">
                      {probesActive ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span>{probesActive ? 'PROBES ENGAGED: CH1 & CH2' : 'PROBES DISENGAGED'}</span>
                  </button>
                  <button
                    onClick={onOpenSandbox}
                    className="bg-black/80 backdrop-blur px-2 py-1 rounded text-zinc-400 hover:text-cyan-300 border border-white/10 transition-colors"
                  >
                    2.4 MSPS DMA ↗
                  </button>
                </div>
              </div>

              {/* Real-time Live Oscilloscope Waveform Canvas */}
              <div className="p-4 bg-zinc-950 border-t border-white/[0.08]">
                <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        probesActive ? 'bg-teal-400 animate-pulse' : 'bg-zinc-600'
                      }`}
                    ></span>
                    <span className="text-zinc-200">REALTIME OSCILLATOR DISPLAY</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-mono" id="liveFreqLabel">
                      {probesActive ? `${frequencyKhz.toFixed(2)} kHz Sinusoid` : '0.00 kHz GND'}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-400 font-mono">
                      {probesActive ? 'SNR: 42.8 dB' : 'SNR: -- dB'}
                    </span>
                  </div>
                </div>

                {/* Canvas Component */}
                <div className="relative w-full h-16 bg-[#060910] rounded border border-cyan-500/20 overflow-hidden flex items-center justify-center">
                  <canvas className="w-full h-full" height={64} id="scopeCanvas" ref={canvasRef} width={500}></canvas>

                  {/* Subtle Grid Lines */}
                  <div className="absolute inset-0 pointer-events-none border-dashed border-zinc-800/40 grid grid-cols-6 grid-rows-2">
                    <div className="border-r border-b border-white/[0.04]"></div>
                    <div className="border-r border-b border-white/[0.04]"></div>
                    <div className="border-r border-b border-white/[0.04]"></div>
                    <div className="border-r border-b border-white/[0.04]"></div>
                    <div className="border-r border-b border-white/[0.04]"></div>
                    <div className="border-b border-white/[0.04]"></div>
                    <div className="border-r border-white/[0.04]"></div>
                    <div className="border-r border-white/[0.04]"></div>
                    <div className="border-r border-white/[0.04]"></div>
                    <div className="border-r border-white/[0.04]"></div>
                    <div className="border-r border-white/[0.04]"></div>
                    <div></div>
                  </div>
                </div>

                {/* Mini telemetry adjustment knobs */}
                <div className="mt-2 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setFrequencyKhz(prev => (prev === 4.88 ? 10.0 : prev === 10.0 ? 20.0 : 4.88))}
                      className="hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      FREQ: <span className="text-zinc-300 font-bold">{frequencyKhz} kHz</span>
                    </button>
                    <button
                      onClick={() => setNoiseLevel(prev => (prev === 0.08 ? 0.25 : prev === 0.25 ? 0.01 : 0.08))}
                      className="hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      NOISE: <span className="text-zinc-300 font-bold">{Math.round(noiseLevel * 100)}%</span>
                    </button>
                  </div>
                  <button
                    onClick={onOpenSandbox}
                    className="text-cyan-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>LAUNCH LAB CONTROLS</span>
                    <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

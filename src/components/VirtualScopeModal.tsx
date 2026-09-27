import React, { useState, useEffect, useRef } from 'react';

interface VirtualScopeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VirtualScopeModal: React.FC<VirtualScopeModalProps> = ({ isOpen, onClose }) => {
  const [isRunning, setIsRunning] = useState(true);
  const [waveType, setWaveType] = useState<'sine' | 'square' | 'triangle' | 'sawtooth'>('sine');
  const [frequency, setFrequency] = useState<number>(1000); // 1 kHz
  const [amplitudeVpp, setAmplitudeVpp] = useState<number>(3.3); // 3.3 Vpp
  const [dcOffset, setDcOffset] = useState<number>(0.0);
  const [dutyCycle, setDutyCycle] = useState<number>(50);
  const [noisePercent, setNoisePercent] = useState<number>(2);
  const [ch2Enabled, setCh2Enabled] = useState<boolean>(true);
  const [displayMode, setDisplayMode] = useState<'time' | 'fft'>('time');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const mid = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Draw Grid / Graticule
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      const gridCols = 10;
      const gridRows = 8;
      for (let i = 0; i <= gridCols; i++) {
        const x = (w / gridCols) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let j = 0; j <= gridRows; j++) {
        const y = (h / gridRows) * j;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Center crosshairs with tick marks
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.25)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.moveTo(0, mid);
      ctx.lineTo(w, mid);
      ctx.stroke();

      if (displayMode === 'time') {
        // CH1 Trace
        ctx.beginPath();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#00f2fe';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 242, 254, 0.7)';

        const cyclesAcross = Math.max(1, Math.min(20, (frequency / 1000) * 4));
        const ampScale = (amplitudeVpp / 5) * (h * 0.35);
        const offsetPixels = (dcOffset / 5) * (h * 0.35);

        for (let x = 0; x < w; x++) {
          const t = (x / w) * cyclesAcross * 2 * Math.PI + phase;
          let val = 0;

          if (waveType === 'sine') {
            val = Math.sin(t);
          } else if (waveType === 'square') {
            const mod = (t % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
            val = mod < (dutyCycle / 100) * 2 * Math.PI ? 1 : -1;
          } else if (waveType === 'triangle') {
            const mod = (t / (2 * Math.PI)) % 1;
            val = 4 * Math.abs(mod - 0.5) - 1;
          } else if (waveType === 'sawtooth') {
            const mod = (t / (2 * Math.PI)) % 1;
            val = 2 * (mod - 0.5);
          }

          const noise = (Math.random() - 0.5) * (noisePercent / 100) * (h * 0.5);
          const y = mid - (val * ampScale + offsetPixels) + noise;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // CH2 Trace (Derivative or Quadrature Reference)
        if (ch2Enabled) {
          ctx.beginPath();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = '#3fddbf';
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(63, 221, 191, 0.5)';

          for (let x = 0; x < w; x++) {
            const t = (x / w) * cyclesAcross * 2 * Math.PI + phase;
            const val = Math.cos(t); // 90 deg out of phase
            const y = mid - val * (ampScale * 0.6) + (Math.random() - 0.5) * (noisePercent / 100) * 10;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      } else {
        // FFT Frequency Domain View
        ctx.shadowBlur = 0;
        const numBars = 32;
        const barWidth = (w - numBars * 4) / numBars;
        const fundamentalBin = Math.min(numBars - 2, Math.floor((frequency / 10000) * (numBars - 4)) + 3);

        for (let i = 0; i < numBars; i++) {
          let height = 6;
          if (i === fundamentalBin) {
            height = h * 0.8;
          } else if (waveType === 'square' && i % 2 === 1 && i > fundamentalBin) {
            height = (h * 0.7) / (i - fundamentalBin + 1);
          } else if (waveType === 'sawtooth' && i > fundamentalBin) {
            height = (h * 0.6) / (i - fundamentalBin + 1);
          }
          height += Math.random() * (noisePercent * 0.5);

          const x = i * (barWidth + 4) + 10;
          const y = h - height;

          const grad = ctx.createLinearGradient(0, y, 0, h);
          grad.addColorStop(0, '#00f2fe');
          grad.addColorStop(1, 'rgba(0, 242, 254, 0.1)');

          ctx.fillStyle = grad;
          ctx.fillRect(x, y, barWidth, height);
        }
      }

      if (isRunning) {
        phase += 0.05 * (frequency / 1000);
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isOpen, isRunning, waveType, frequency, amplitudeVpp, dcOffset, dutyCycle, noisePercent, ch2Enabled, displayMode]);

  if (!isOpen) return null;

  const vRms = (amplitudeVpp / (2 * Math.SQRT2)).toFixed(2);
  const periodMs = (1000 / frequency).toFixed(3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto bg-[#0a0e17] border border-cyan-500/40 rounded-xl p-5 sm:p-7 shadow-2xl flex flex-col gap-5">
        {/* Top Instrument Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f2fe]"></span>
            <div>
              <span className="font-mono text-sm font-bold text-white tracking-wider flex items-center gap-2">
                DSO-8400 PRO VIRTUAL BENCH
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 border border-white/[0.08] text-cyan-400">
                  2.4 GSPS REALTIME
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                isRunning
                  ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500 hover:text-black'
                  : 'bg-amber-500/20 border border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-black'
              }`}
            >
              {isRunning ? 'RUNNING ▶' : 'STOPPED ⏸'}
            </button>

            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Oscilloscope Screen & Measurements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main CRT/TFT Display */}
          <div className="lg:col-span-8 flex flex-col gap-2">
            <div className="relative w-full h-72 sm:h-80 bg-[#04070d] rounded-lg border-2 border-zinc-800 overflow-hidden shadow-inner flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={650}
                height={320}
                className="w-full h-full object-cover"
              />

              {/* On-screen HUD Overlays */}
              <div className="absolute top-2 left-3 flex items-center gap-3 text-[11px] font-mono">
                <span className="bg-black/70 backdrop-blur px-2 py-0.5 rounded text-cyan-400 border border-cyan-500/30">
                  CH1: {(amplitudeVpp / 4).toFixed(2)} V/Div
                </span>
                {ch2Enabled && (
                  <span className="bg-black/70 backdrop-blur px-2 py-0.5 rounded text-teal-300 border border-teal-500/30">
                    CH2: {(amplitudeVpp / 4).toFixed(2)} V/Div
                  </span>
                )}
                <span className="bg-black/70 backdrop-blur px-2 py-0.5 rounded text-zinc-400 border border-white/10">
                  M: {(1000 / frequency / 4).toFixed(2)} ms/Div
                </span>
              </div>

              <div className="absolute bottom-2 right-3 flex items-center gap-2 text-[10px] font-mono">
                <button
                  onClick={() => setDisplayMode(displayMode === 'time' ? 'fft' : 'time')}
                  className="bg-black/80 hover:bg-cyan-950 px-2 py-1 rounded text-cyan-300 border border-cyan-500/40 transition-colors cursor-pointer"
                >
                  VIEW: {displayMode.toUpperCase()}
                </button>
              </div>
            </div>

            {/* Live Telemetry Readout Strip */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-2.5 rounded-lg bg-black/60 border border-white/[0.06] text-center font-mono text-xs">
              <div>
                <div className="text-[9px] text-zinc-500 uppercase">Frequency</div>
                <div className="text-cyan-300 font-bold mt-0.5">{frequency} Hz</div>
              </div>
              <div>
                <div className="text-[9px] text-zinc-500 uppercase">Period (T)</div>
                <div className="text-white font-bold mt-0.5">{periodMs} ms</div>
              </div>
              <div>
                <div className="text-[9px] text-zinc-500 uppercase">Amplitude Vpp</div>
                <div className="text-cyan-300 font-bold mt-0.5">{amplitudeVpp.toFixed(2)} V</div>
              </div>
              <div>
                <div className="text-[9px] text-zinc-500 uppercase">V RMS</div>
                <div className="text-white font-bold mt-0.5">{vRms} V</div>
              </div>
              <div>
                <div className="text-[9px] text-zinc-500 uppercase">Duty Cycle</div>
                <div className="text-teal-300 font-bold mt-0.5">{dutyCycle}%</div>
              </div>
              <div>
                <div className="text-[9px] text-zinc-500 uppercase">DC Offset</div>
                <div className="text-white font-bold mt-0.5">{dcOffset.toFixed(1)} V</div>
              </div>
            </div>
          </div>

          {/* Interactive Controls & Function Generator Panel */}
          <div className="lg:col-span-4 flex flex-col gap-4 bg-zinc-900/40 p-4 rounded-xl border border-white/[0.08]">
            <div className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider border-b border-white/[0.06] pb-2">
              Function Generator Controls
            </div>

            {/* Waveform Selector */}
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 mb-1.5">WAVEFORM SELECT</label>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
                {(['sine', 'square', 'triangle', 'sawtooth'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setWaveType(w)}
                    className={`py-1.5 px-2 rounded capitalize transition-all cursor-pointer ${
                      waveType === w
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                        : 'bg-black/40 text-zinc-400 hover:text-white border border-white/[0.04]'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-400">Frequency:</span>
                <span className="text-cyan-400 font-bold">{frequency} Hz</span>
              </div>
              <input
                type="range"
                min="50"
                max="10000"
                step="50"
                value={frequency}
                onChange={(e) => setFrequency(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-zinc-500 mt-0.5">
                <span>50 Hz</span>
                <span>5 kHz</span>
                <span>10 kHz</span>
              </div>
            </div>

            {/* Amplitude Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-400">Amplitude (Vpp):</span>
                <span className="text-cyan-400 font-bold">{amplitudeVpp.toFixed(1)} V</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10.0"
                step="0.1"
                value={amplitudeVpp}
                onChange={(e) => setAmplitudeVpp(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded appearance-none cursor-pointer"
              />
            </div>

            {/* Duty Cycle (for square) */}
            {waveType === 'square' && (
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-400">Duty Cycle (%):</span>
                  <span className="text-teal-300 font-bold">{dutyCycle}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  step="1"
                  value={dutyCycle}
                  onChange={(e) => setDutyCycle(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded appearance-none cursor-pointer"
                />
              </div>
            )}

            {/* Noise Injection */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-zinc-400">Thermal Noise:</span>
                <span className="text-zinc-300 font-bold">{noisePercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={noisePercent}
                onChange={(e) => setNoisePercent(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded appearance-none cursor-pointer"
              />
            </div>

            {/* Channel 2 Probe Toggle */}
            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400">Probe CH2 Reference:</span>
              <button
                onClick={() => setCh2Enabled(!ch2Enabled)}
                className={`px-2.5 py-1 rounded text-xs transition-all cursor-pointer ${
                  ch2Enabled
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                    : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                {ch2Enabled ? 'ENGAGED' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

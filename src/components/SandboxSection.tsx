import React, { useState, useMemo } from 'react';

export const SandboxSection: React.FC = () => {
  // Calculator 1: RC Filter State
  const [resistanceK, setResistanceK] = useState<number>(1.5);
  const [capacitanceNf, setCapacitanceNf] = useState<number>(10.0);
  const [filterType, setFilterType] = useState<'lowpass' | 'highpass'>('lowpass');

  // Calculator 2: 555 Timer State
  const [timerR1, setTimerR1] = useState<number>(10);
  const [timerR2, setTimerR2] = useState<number>(47);
  const [timerC, setTimerC] = useState<number>(0.1);

  // RC Filter Computations
  const rcResults = useMemo(() => {
    const rOhms = Math.max(0.01, resistanceK) * 1000;
    const cFarads = Math.max(0.01, capacitanceNf) * 1e-9;
    const fc = 1 / (2 * Math.PI * rOhms * cFarads);
    const wc = 1 / (rOhms * cFarads);
    const tau = rOhms * cFarads * 1e6; // in microseconds

    const fcFormatted =
      fc >= 1e6
        ? `${(fc / 1e6).toFixed(2)} MHz`
        : fc >= 1e3
        ? `${(fc / 1e3).toFixed(2)} kHz`
        : `${fc.toFixed(1)} Hz`;

    const wcFormatted =
      wc >= 1e6
        ? `${(wc / 1e6).toFixed(2)} Mrad/s`
        : wc >= 1e3
        ? `${(wc / 1e3).toFixed(1)} krad/s`
        : `${wc.toFixed(1)} rad/s`;

    const tauFormatted =
      tau >= 1e3
        ? `${(tau / 1e3).toFixed(2)} ms`
        : `${tau.toFixed(1)} µs`;

    return { fc, wc, tau, fcFormatted, wcFormatted, tauFormatted };
  }, [resistanceK, capacitanceNf]);

  // 555 Timer Computations
  const timerResults = useMemo(() => {
    const r1Ohms = Math.max(0.1, timerR1) * 1000;
    const r2Ohms = Math.max(0.1, timerR2) * 1000;
    const cFarads = Math.max(0.001, timerC) * 1e-6;

    const freq = 1.44 / ((r1Ohms + 2 * r2Ohms) * cFarads);
    const duty = ((r1Ohms + r2Ohms) / (r1Ohms + 2 * r2Ohms)) * 100;
    const thMs = 0.693 * (r1Ohms + r2Ohms) * cFarads * 1000;
    const tlMs = 0.693 * r2Ohms * cFarads * 1000;

    const freqFormatted =
      freq >= 1e6
        ? `${(freq / 1e6).toFixed(2)} MHz`
        : freq >= 1e3
        ? `${(freq / 1e3).toFixed(1)} kHz`
        : `${freq.toFixed(1)} Hz`;

    const thFormatted =
      thMs >= 1e3
        ? `${(thMs / 1e3).toFixed(2)} s`
        : `${thMs.toFixed(2)} ms`;

    return { freq, duty, thMs, tlMs, freqFormatted, thFormatted };
  }, [timerR1, timerR2, timerC]);

  return (
    <section className="py-20 max-w-7xl mx-auto px-6 w-full border-b border-white/[0.07]" id="bench">
      <div className="flex flex-col gap-2 mb-10">
        <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest flex items-center gap-2">
          <span className="material-symbols-outlined text-[15px]">tune</span>
          Verified Parametric Calculators
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Interactive Engineering Sandbox
        </h2>
        <p className="text-sm text-zinc-400 max-w-2xl">
          Instantly calibrate analog filter cutoff points, multivibrator frequencies, and amplifier gains with live computation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator 1: RC Filter with Dynamic Slider */}
        <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <span className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-cyan-400 text-[18px]">filter_alt</span>
                RC Low-Pass / High-Pass -3dB Cutoff
              </span>
              <div className="flex items-center gap-2">
                <div className="inline-flex p-0.5 rounded bg-black/60 border border-white/[0.08] text-[10px] font-mono">
                  <button
                    onClick={() => setFilterType('lowpass')}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                      filterType === 'lowpass' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    Low-Pass
                  </button>
                  <button
                    onClick={() => setFilterType('highpass')}
                    className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                      filterType === 'highpass' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    High-Pass
                  </button>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 bg-black rounded text-cyan-300 border border-white/[0.08]">
                  fc = 1 / (2πRC)
                </span>
              </div>
            </div>

            {/* Parametric Inputs */}
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-400">Resistance (R):</span>
                  <span className="text-cyan-400 font-medium" id="sliderRVal">
                    {resistanceK.toFixed(2)} kΩ
                  </span>
                </div>
                <input
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                  id="sliderR"
                  max="50"
                  min="0.1"
                  step="0.1"
                  type="range"
                  value={resistanceK}
                  onChange={(e) => setResistanceK(parseFloat(e.target.value))}
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-zinc-400">Capacitance (C):</span>
                  <span className="text-cyan-400 font-medium" id="sliderCVal">
                    {capacitanceNf.toFixed(1)} nF
                  </span>
                </div>
                <input
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                  id="sliderC"
                  max="200"
                  min="0.5"
                  step="0.5"
                  type="range"
                  value={capacitanceNf}
                  onChange={(e) => setCapacitanceNf(parseFloat(e.target.value))}
                />
              </div>
            </div>

            {/* Bode Frequency Response Curve Preview */}
            <div className="mt-4 p-3 bg-black/40 rounded-lg border border-white/[0.05]">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1">
                <span>BODE MAGNITUDE RESPONSE (dB)</span>
                <span className="text-cyan-400">@ fc: -3.01 dB</span>
              </div>
              <div className="h-14 w-full relative flex items-center">
                <svg className="w-full h-full" viewBox="0 0 300 50" preserveAspectRatio="none">
                  <line x1="0" y1="10" x2="300" y2="10" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
                  <line x1="0" y1="25" x2="300" y2="25" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
                  <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
                  
                  {/* Rolloff Curve */}
                  {filterType === 'lowpass' ? (
                    <path
                      d="M 0 10 Q 140 10, 160 25 T 300 48"
                      fill="none"
                      stroke="#00f2fe"
                      strokeWidth="2"
                    />
                  ) : (
                    <path
                      d="M 0 48 Q 140 46, 160 25 T 300 10"
                      fill="none"
                      stroke="#3fddbf"
                      strokeWidth="2"
                    />
                  )}
                  {/* -3dB Cutoff Indicator Circle */}
                  <circle cx="160" cy="25" r="3.5" fill="#00f2fe" />
                </svg>
                <div className="absolute right-2 bottom-1 font-mono text-[9px] text-zinc-500">
                  -20 dB / Decaderolloff
                </div>
              </div>
            </div>

            {/* Dynamic Readout */}
            <div className="grid grid-cols-3 gap-2 mt-5 p-4 rounded-lg bg-black/60 border border-white/[0.06] text-center">
              <div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Cutoff (fc)</div>
                <div className="text-base sm:text-lg font-bold text-white font-mono mt-0.5" id="calcFc">
                  {rcResults.fcFormatted}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Angular (ωc)</div>
                <div className="text-base sm:text-lg font-bold text-cyan-300 font-mono mt-0.5" id="calcWc">
                  {rcResults.wcFormatted}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Time Const (τ)</div>
                <div className="text-base sm:text-lg font-bold text-teal-300 font-mono mt-0.5" id="calcTau">
                  {rcResults.tauFormatted}
                </div>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-zinc-500 font-mono mt-4">
            Essential for ADC anti-aliasing pre-filters and high-frequency noise attenuation.
          </p>
        </div>

        {/* Calculator 2: 555 Astable Multivibrator Frequency */}
        <div className="p-6 rounded-xl bg-zinc-900/50 border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <span className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-cyan-400 text-[18px]">timer</span>
                555 Timer Astable Frequency &amp; Duty
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 bg-black rounded text-cyan-300 border border-white/[0.08]">
                1.44 / ((R1 + 2R2)C)
              </span>
            </div>

            {/* Numerical Inputs */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">R1 (Pullup kΩ)</label>
                <input
                  className="w-full bg-black/60 border border-white/[0.08] rounded px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  id="timerR1"
                  step="0.5"
                  min="0.1"
                  type="number"
                  value={timerR1}
                  onChange={(e) => setTimerR1(parseFloat(e.target.value) || 0.1)}
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">R2 (Timing kΩ)</label>
                <input
                  className="w-full bg-black/60 border border-white/[0.08] rounded px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  id="timerR2"
                  step="0.5"
                  min="0.1"
                  type="number"
                  value={timerR2}
                  onChange={(e) => setTimerR2(parseFloat(e.target.value) || 0.1)}
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">C (µF)</label>
                <input
                  className="w-full bg-black/60 border border-white/[0.08] rounded px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  id="timerC"
                  step="0.01"
                  min="0.001"
                  type="number"
                  value={timerC}
                  onChange={(e) => setTimerC(parseFloat(e.target.value) || 0.001)}
                />
              </div>
            </div>

            {/* Live Pulse Train Graphic Preview */}
            <div className="mt-4 p-3 bg-black/40 rounded-lg border border-white/[0.05]">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1">
                <span>DIGITAL CLOCK OUTPUT WAVEFORM</span>
                <span className="text-teal-300">TH: {timerResults.thFormatted}</span>
              </div>
              <div className="h-14 w-full relative flex items-center">
                <svg className="w-full h-full" viewBox="0 0 300 50" preserveAspectRatio="none">
                  <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(255,255,255,0.06)" />
                  <line x1="0" y1="10" x2="300" y2="10" stroke="rgba(255,255,255,0.06)" />
                  
                  {/* Square pulses based on duty cycle */}
                  {(() => {
                    const dutyRatio = Math.max(0.1, Math.min(0.9, timerResults.duty / 100));
                    const period = 75;
                    const highWidth = period * dutyRatio;
                    return (
                      <path
                        d={`M 5 40 L 5 10 L ${5 + highWidth} 10 L ${5 + highWidth} 40 L ${5 + period} 40 L ${5 + period} 10 L ${5 + period + highWidth} 10 L ${5 + period + highWidth} 40 L ${5 + 2 * period} 40 L ${5 + 2 * period} 10 L ${5 + 2 * period + highWidth} 10 L ${5 + 2 * period + highWidth} 40 L 295 40`}
                        fill="none"
                        stroke="#00f2fe"
                        strokeWidth="2"
                      />
                    );
                  })()}
                </svg>
              </div>
            </div>

            {/* Dynamic Readout */}
            <div className="grid grid-cols-3 gap-2 mt-5 p-4 rounded-lg bg-black/60 border border-white/[0.06] text-center">
              <div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Frequency</div>
                <div className="text-base sm:text-lg font-bold text-white font-mono mt-0.5" id="calcTimerFreq">
                  {timerResults.freqFormatted}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase">Duty Cycle</div>
                <div className="text-base sm:text-lg font-bold text-cyan-300 font-mono mt-0.5" id="calcTimerDuty">
                  {timerResults.duty.toFixed(1)} %
                </div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase">High Time (Th)</div>
                <div className="text-base sm:text-lg font-bold text-teal-300 font-mono mt-0.5" id="calcTimerTh">
                  {timerResults.thFormatted}
                </div>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-zinc-500 font-mono mt-4">
            Calibrates astable pulse generation for hardware clock triggers and tone synthesis.
          </p>
        </div>
      </div>
    </section>
  );
};

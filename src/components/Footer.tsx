import React from 'react';
import { Logo } from './Logo';

interface FooterProps {
  onOpenInfoModal?: (title: string, content: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInfoModal }) => {
  const handleLinkClick = (e: React.MouseEvent, title: string, content: string) => {
    e.preventDefault();
    if (onOpenInfoModal) {
      onOpenInfoModal(title, content);
    }
  };

  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#070a10] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <Logo size="sm" />
              <span className="font-mono text-sm font-semibold text-white">ECE MATRIX</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The unified theoretical and empirical engineering hub for electronics, telecommunications, and semiconductor researchers.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500 mt-1">
              <span>NODE: 0x7E3</span>
              <span>•</span>
              <span className="text-cyan-400">STATUS: SYNCHRONIZED</span>
            </div>
          </div>

          {/* Simulation Suites */}
          <div>
            <div className="font-mono text-xs text-white uppercase tracking-wider mb-3">Simulation Suites</div>
            <ul className="space-y-2 text-xs text-zinc-400 font-mono">
              <li>
                <a
                  className="hover:text-cyan-300 transition-colors"
                  href="#bench"
                  onClick={(e) => handleLinkClick(e, 'SPICE Simulation Decks', 'Standard SPICE netlists calibrated against BSIM-CMG and BSIM4 models. Includes DC operating point (.op), transient (.tran), AC small-signal frequency sweep (.ac), and Monte Carlo parameter dispersion analysis.')}
                >
                  SPICE Simulation Decks
                </a>
              </li>
              <li>
                <a
                  className="hover:text-cyan-300 transition-colors"
                  href="#bench"
                  onClick={(e) => handleLinkClick(e, 'RF Smith Chart Solvers', 'Bilinear conformal mapping tool converting complex impedance Z = R + jX into scattering reflection coefficient Gamma. Solves L-match, quarter-wave transformers, and open/shorted reactive stubs.')}
                >
                  RF Smith Chart Solvers
                </a>
              </li>
              <li>
                <a
                  className="hover:text-cyan-300 transition-colors"
                  href="#projects"
                  onClick={(e) => handleLinkClick(e, 'Verilog RTL Testbenches', 'Self-checking SystemVerilog testbenches with constrained random stimulus, functional coverage assertion monitors, and VCD waveform output for GTKWave & ModelSim.')}
                >
                  Verilog RTL Testbenches
                </a>
              </li>
              <li>
                <a
                  className="hover:text-cyan-300 transition-colors"
                  href="#projects"
                  onClick={(e) => handleLinkClick(e, 'FPGA Bitstream Generators', 'Vendor-agnostic synthesis flow supporting Xilinx Vivado (Artix-7), Gowin EDA, and open-source Yosys + nextpnr toolchains.')}
                >
                  FPGA Bitstream Generators
                </a>
              </li>
            </ul>
          </div>

          {/* Handbooks & Models */}
          <div>
            <div className="font-mono text-xs text-white uppercase tracking-wider mb-3">Handbooks &amp; Models</div>
            <ul className="space-y-2 text-xs text-zinc-400 font-mono">
              <li>
                <a
                  className="hover:text-cyan-300 transition-colors"
                  href="#gate"
                  onClick={(e) => handleLinkClick(e, 'Maxwell & Transmission Lines', 'Telegrapher differential equations for TEM lines, characteristic impedance Z_0 = sqrt((R + jwL)/(G + jwC)), phase velocity, skin depth in copper, and dispersion boundaries.')}
                >
                  Maxwell &amp; Transmission Lines
                </a>
              </li>
              <li>
                <a
                  className="hover:text-cyan-300 transition-colors"
                  href="#gate"
                  onClick={(e) => handleLinkClick(e, 'BJT / FinFET Compact Models', 'Analytical formulations for subthreshold leakage, drain-induced barrier lowering (DIBL), quantum mechanical confinement in nanosheets, and thermal velocity saturation.')}
                >
                  BJT / FinFET Compact Models
                </a>
              </li>
              <li>
                <a
                  className="hover:text-cyan-300 transition-colors"
                  href="#gate"
                  onClick={(e) => handleLinkClick(e, 'Shannon Capacity & Nyquist', 'Theoretical spectral efficiency limits: C/B = log2(1 + SNR). Includes Eb/N0 bounds for 10^-5 bit error rate across AWGN and Rayleigh fading channels.')}
                >
                  Shannon Capacity &amp; Nyquist
                </a>
              </li>
              <li>
                <a
                  className="hover:text-cyan-300 transition-colors"
                  href="#bench"
                  onClick={(e) => handleLinkClick(e, 'Discrete Filters (FIR / IIR / FFT)', 'Bilinear transform warping equations, Parks-McClellan equiripple FIR synthesis, Butterworth maximally flat poles, and Cooley-Tukey Radix-2/4 butterfly pipelines.')}
                >
                  Discrete Filters (FIR / IIR / FFT)
                </a>
              </li>
            </ul>
          </div>

          {/* Professional Affiliations */}
          <div>
            <div className="font-mono text-xs text-white uppercase tracking-wider mb-3">Professional Affiliations</div>
            <ul className="space-y-2 text-xs text-zinc-400 font-mono">
              <li>
                <a
                  className="hover:text-cyan-300 transition-colors"
                  href="https://eds.ieee.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IEEE Electron Devices (EDS)
                </a>
              </li>
              <li>
                <a
                  className="hover:text-cyan-300 transition-colors"
                  href="https://comsoc.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IEEE Communications (ComSoc)
                </a>
              </li>
              <li>
                <a
                  className="hover:text-cyan-300 transition-colors"
                  href="https://sigda.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ACM SIGDA Electronic Design
                </a>
              </li>
              <li>
                <a
                  className="hover:text-cyan-300 transition-colors"
                  href="#gate"
                >
                  GATE Academic Circle
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
          <div>© 2025 ECE MATRIX LABS. ALL SCHEMATICS LICENSED UNDER CERN OHL-S V2.</div>
          <div className="flex items-center gap-6">
            <button
              onClick={(e) => handleLinkClick(e, 'Signal Integrity Guarantee', 'All published PCB stackups guarantee differential trace impedance tolerances within +/- 5% and return loss margins exceeding 20 dB up to 10 GHz.')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              SIGNAL INTEGRITY
            </button>
            <button
              onClick={(e) => handleLinkClick(e, 'Privacy & Node Telemetry', 'Zero telemetry tracking. Local calculator states and parameters are computed client-side within your browser sandbox.')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              PRIVACY
            </button>
            <button
              onClick={(e) => handleLinkClick(e, 'CERN Open Hardware License', 'CERN OHL-S v2 permits modification, reproduction, and distribution of hardware schematics, firmware, and layouts provided derivative designs preserve license attributions.')}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              OPEN HARDWARE
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

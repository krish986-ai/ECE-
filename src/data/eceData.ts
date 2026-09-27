import { CurriculumTier, EcePillar, HardwareProject, SyllabusItem, ToolkitDossier } from '../types/ece';

export const CURRICULUM_TIERS: CurriculumTier[] = [
  {
    id: 1,
    stageLabel: 'STAGE 01',
    semesterRange: 'SEMESTERS 1 – 2',
    title: 'Circuit Fundamentals & Solid-State Physics',
    description: 'Mathematical modeling of lumped network topologies, atomic semiconductor band theory, PN junctions, and linear amplifier behaviors.',
    primaryTools: 'SPICE, MULTISIM',
    labSessionsCount: 12,
    modules: [
      {
        id: 'mod-1-1',
        code: '01 / CIRCUIT THEOREMS',
        title: 'Network Analysis & Theorems',
        description: 'KCL, KVL, Thevenin, Norton, Superposition & Maximum Power Transfer',
        topics: ['Node & Mesh Analysis', 'Thevenin-Norton Equivalence', 'Source Transformation', 'Maximum Power Transfer theorem: Z_L = Z_th*'],
        keyFormula: 'P_max = V_th^2 / (4 * R_th)',
        labHours: 18,
      },
      {
        id: 'mod-1-2',
        code: '02 / ACTIVE DEVICES',
        title: 'Semiconductor PN & Transistors',
        description: 'PN Diode equation, BJT common-emitter bias, MOSFET IV-curves',
        topics: ['Shockley Ideal Diode Equation', 'BJT Early Effect & Hybrid-π model', 'Sub-threshold swing & Pinch-off voltage', 'Small signal transconductance gm'],
        keyFormula: 'I_D = I_S * (exp(q*V_D / (n*k*T)) - 1)',
        labHours: 24,
      },
      {
        id: 'mod-1-3',
        code: '03 / AC STEADY STATE',
        title: 'Phasors, Impedance & Resonance',
        description: 'Phasor domain representation, complex impedance, and resonant tanks',
        topics: ['Phasor transforms', 'Series and parallel RLC resonance', 'Quality factor Q & Bandwidth', 'Complex power S = P + jQ'],
        keyFormula: 'omega_0 = 1 / sqrt(L * C)',
        labHours: 16,
      },
      {
        id: 'mod-1-4',
        code: '04 / TRANSIENT DYNAMICS',
        title: 'Time-Domain Differential Response',
        description: 'First & second-order state equations, damping factor, and natural response',
        topics: ['Zero-input & Zero-state responses', 'Overdamped, critically damped, underdamped dynamics', 'Step and Dirac impulse responses', 'Inductor flux and capacitor charge continuity'],
        keyFormula: 's^2 + 2*zeta*omega_n*s + omega_n^2 = 0',
        labHours: 20,
      },
    ],
  },
  {
    id: 2,
    stageLabel: 'STAGE 02',
    semesterRange: 'SEMESTERS 3 – 4',
    title: 'Signals, Logic & Computer Architecture',
    description: 'Transformation of continuous-time signals to discrete domains, synchronous finite state machines, and micro-architecture execution pipelines.',
    primaryTools: 'MATLAB, LOGISIM, GTKWAVE',
    labSessionsCount: 14,
    modules: [
      {
        id: 'mod-2-1',
        code: '01 / DIGITAL LOGIC & FSM',
        title: 'Synchronous Finite State Machines',
        description: 'K-Maps, Mealy/Moore State Machines, Setup/Hold timing constraints',
        topics: ['Boolean Minimization', 'Clock skew & jitter', 'Hazard free asynchronous logic', 'Setup & hold margin verification'],
        keyFormula: 'T_clk >= T_cq + T_comb + T_setup + T_skew',
        labHours: 24,
      },
      {
        id: 'mod-2-2',
        code: '02 / TRANSFORMS & SPECTRA',
        title: 'Fourier, Laplace & Z-Domain',
        description: 'Fourier Series, Laplace s-plane pole-zero plots, discrete Z-transforms',
        topics: ['Continuous-time Fourier Series & Transform', 'Bilateral Laplace & ROC bounds', 'Z-transform stability contours', 'Convolution and LTI system impulse response'],
        keyFormula: 'X(z) = sum_{n=-inf}^{inf} x[n] * z^{-n}',
        labHours: 22,
      },
      {
        id: 'mod-2-3',
        code: '03 / ANALOG MODULATION',
        title: 'Passband Modulation & Demodulation',
        description: 'AM/DSB-SC/SSB, FM Carson bandwidth, heterodyne mixer frontends',
        topics: ['Hilbert transform SSB generation', 'Phase locked loops (PLL)', 'Superheterodyne receiver IF stages', 'Noise figure and SNR degradation'],
        keyFormula: 'B_FM = 2 * (Delta_f + f_m)',
        labHours: 18,
      },
      {
        id: 'mod-2-4',
        code: '04 / MICROCONTROLLER ARCH',
        title: 'Datapath, Memory & Assembly',
        description: 'ALU datapath, interrupt vectors, memory mapped I/O, assembly debugging',
        topics: ['Von Neumann vs Harvard architectures', 'CISC vs RISC instruction encodings', 'Nested vectored interrupt controllers (NVIC)', 'Direct memory access (DMA) descriptors'],
        keyFormula: 'CPI = Total Clock Cycles / Total Instructions',
        labHours: 26,
      },
    ],
  },
  {
    id: 3,
    stageLabel: 'STAGE 03',
    semesterRange: 'SEMESTERS 5 – 6',
    title: 'Embedded RTOS, High-Freq RF & Control',
    description: 'Deterministic real-time scheduling on ARM Cortex platforms, distributed transmission line impedance matching, and closed-loop state space control.',
    primaryTools: 'KEIL, ADS, SIMULINK',
    labSessionsCount: 16,
    modules: [
      {
        id: 'mod-3-1',
        code: '01 / DIGITAL TELECOMM',
        title: 'Baseband & Constellation Slicing',
        description: 'QPSK, 16-QAM constellations, Bit Error Rate (BER), and OFDM channels',
        topics: ['Nyquist ISI criterion & raised cosine pulse', 'Gray coding bit mappings', 'Matched filter AWGN bounds', 'Cyclic prefix and FFT channel equalization'],
        keyFormula: 'C = B * log2(1 + SNR)',
        labHours: 24,
      },
      {
        id: 'mod-3-2',
        code: '02 / EMBEDDED REAL-TIME',
        title: 'Deterministic Kernel Scheduling',
        description: 'FreeRTOS Mutex, task prioritization, DMA ping-pong buffers, SPI/I2C/CAN',
        topics: ['Rate monotonic & EDF scheduling', 'Priority inversion & inheritance protocols', 'Zero-copy ring buffer pipelines', 'CAN bus bit timing & error recovery'],
        keyFormula: 'U = sum(C_i / T_i) <= n * (2^(1/n) - 1)',
        labHours: 28,
      },
      {
        id: 'mod-3-3',
        code: '03 / RF TRANSMISSION LINES',
        title: 'Distributed Networks & Smith Charts',
        description: 'Smith Charts, stub matching, microstrip geometry, scattering S-parameters',
        topics: ['Characteristic impedance Z_0 calculations', 'Voltage Standing Wave Ratio (VSWR)', 'Single and double-stub quarter wave tuners', 'Vector network analyzer (VNA) 2-port calibration'],
        keyFormula: 'Gamma = (Z_L - Z_0) / (Z_L + Z_0)',
        labHours: 22,
      },
      {
        id: 'mod-3-4',
        code: '04 / FEEDBACK STABILITY',
        title: 'State-Space & Frequency Domain',
        description: 'Bode plots, Nyquist phase margins, Root-Locus and state-space regulators',
        topics: ['Bode gain/phase margins', 'Nyquist encirclement theorem', 'Controllability and observability gramians', 'Linear quadratic regulator (LQR) optimization'],
        keyFormula: 'det(sI - A) = 0, x_dot = Ax + Bu',
        labHours: 20,
      },
    ],
  },
  {
    id: 4,
    stageLabel: 'STAGE 04',
    semesterRange: 'SEMESTERS 7 – 8',
    title: 'VLSI Tape-out, 5G/6G & Silicon AI',
    description: 'Full-custom ASIC layout, RTL-to-GDSII flow, static timing analysis (STA), FinFET fabrication physics, and edge neural processing units.',
    primaryTools: 'VIVADO, SYNOPSYS, CADENCE',
    labSessionsCount: 18,
    modules: [
      {
        id: 'mod-4-1',
        code: '01 / ASIC SYNTHESIS & STA',
        title: 'RTL to GDSII Tape-out Flow',
        description: 'SystemVerilog RTL, Clock Tree Synthesis (CTS), DRC/LVS, tape-out workflow',
        topics: ['Logic synthesis cell mapping', 'CTS mesh and H-tree skew balancing', 'Metal layer electromigration & IR drop', 'Design Rule Check (DRC) & Layout Versus Schematic (LVS)'],
        keyFormula: 'Slack = Required Time - Arrival Time >= 0',
        labHours: 32,
      },
      {
        id: 'mod-4-2',
        code: '02 / ADVANCED WIRELESS',
        title: '5G mmWave & Massive MIMO',
        description: '5G NR mmWave, phased arrays, massive MIMO beamforming antennas',
        topics: ['Hybrid analog-digital beamforming', 'Spatial multiplexing singular value decomposition', 'Path loss models at 28 GHz / 39 GHz', 'Patch array mutual coupling compensation'],
        keyFormula: 'Array Factor AF = sum_{n=0}^{N-1} a_n * exp(j*n*psi)',
        labHours: 24,
      },
      {
        id: 'mod-4-3',
        code: '03 / DSP ARCHITECTURES',
        title: 'Pipelined Pointers & MAC Units',
        description: 'Fixed-point MAC engines, polyphase decimation filters, radar target tracking',
        topics: ['Q-format arithmetic overflow prevention', 'Distributed arithmetic for FIR implementation', 'Cooley-Tukey Radix-2/4 butterfly pipelines', 'Range-Doppler 2D FFT radar processing'],
        keyFormula: 'y[n] = sum_{k=0}^{M} b_k * x[n-k] - sum_{m=1}^{N} a_m * y[n-m]',
        labHours: 26,
      },
      {
        id: 'mod-4-4',
        code: '04 / EDGE SILICON ACCELERATORS',
        title: 'Systolic Arrays & TinyML HW',
        description: 'Systolic array TPU, INT8 quantized TinyML models, RISC-V extensions',
        topics: ['Weight-stationary vs output-stationary dataflows', 'SRAM line buffer memory reuse', 'Post-training quantization & hardware clipping', 'Custom RISC-V vector (RVV) co-processors'],
        keyFormula: 'TOPS/W = (2 * MACs * Frequency) / Dissipated Power',
        labHours: 30,
      },
    ],
  },
];

export const ECE_PILLARS: EcePillar[] = [
  {
    id: 'pillar-1',
    number: 'PILLAR // 01',
    title: 'VLSI Design & Silicon Physics',
    description: 'Front-to-back semiconductor design. Synthesis, timing closure, FinFET leakage control, and full-custom CMOS ASIC tapeouts.',
    iconName: 'developer_board',
    tags: ['SystemVerilog', 'Static Timing', 'GDSII'],
    edaSuites: 'Cadence, Synopsys',
    overview: 'From digital register-transfer level (RTL) specifications down to atomic silicon layout. Covers standard cell libraries, floorplanning, placement and routing (P&R), clock tree synthesis (CTS), parasitic extraction (PEX), and silicon fabrication economics.',
    coreConcepts: [
      'Standard Cell Library Characterization (.lib / Liberty)',
      'Floorplanning, Macro Placement & Power Mesh Design',
      'Clock Tree Synthesis (CTS) and Setup/Hold Timing Closure',
      'DRC, LVS, Antenna Rules & ERC checks for TSMC/GF PDKs',
      'FinFET & Gate-All-Around (GAA) Quantum Leakage Control',
    ],
    keyEquations: [
      { name: 'Dynamic Power', formula: 'P_dyn = alpha * C_L * V_dd^2 * f', note: 'Switched capacitance and quadratic supply dependency' },
      { name: 'Static Leakage', formula: 'I_sub = I_0 * exp((V_gs - V_th) / (n * V_t)) * (1 - exp(-V_ds / V_t))', note: 'Sub-threshold conduction across nanosheet gates' },
      { name: 'Clock Slack', formula: 'Slack_setup = T_period - (T_cq + T_logic + T_setup + T_skew)', note: 'Must remain strictly >= 0 ps across PVT corners' },
    ],
    recommendedBooks: ['CMOS VLSI Design (Weste & Harris)', 'Digital Integrated Circuits (Rabaey)', 'Static Timing Analysis for Nanometer Designs (Bhasker)'],
    topCompanies: ['NVIDIA', 'Apple Silicon', 'TSMC', 'Intel', 'Qualcomm', 'AMD'],
  },
  {
    id: 'pillar-2',
    number: 'PILLAR // 02',
    title: 'Embedded Systems & Firmware',
    description: 'Bare-metal C/C++, deterministic RTOS task engines, peripheral drivers, memory architecture, and ultra-low power wireless mesh.',
    iconName: 'memory',
    tags: ['ARM Cortex-M', 'FreeRTOS', 'CAN / SPI'],
    edaSuites: 'STM32Cube, Keil, ESP',
    overview: 'Bridging physical electronic pins to deterministic software execution. Focuses on low-level register manipulation, direct memory access (DMA), preemptive RTOS kernel primitives, low-power sleep modes, and industrial bus communications.',
    coreConcepts: [
      'ARM Cortex-M3/M4/M7/M33 Vector Tables & Startup Assembly',
      'Circular DMA Buffers with Half-Transfer & Transfer-Complete ISRs',
      'FreeRTOS Preemption, Semaphores, Mutex Priority Inversion',
      'CAN Bus 2.0B / CAN-FD Arbitrations & Physical Transceivers',
      'Low Power Modes: Stop2/Standby with RTC wakeup (sub-microamp)',
    ],
    keyEquations: [
      { name: 'Baud Rate Generator', formula: 'BRR = f_clk / (16 * BaudRate)', note: 'UART peripheral clock divider calculation' },
      { name: 'ADC Quantization', formula: 'V_lsb = V_ref / (2^N - 1)', note: 'Step voltage for 12-bit or 16-bit successive approximation converters' },
      { name: 'RTOS CPU Utilization', formula: 'U = sum_{i=1}^n (C_i / T_i)', note: 'Liu & Layland schedulability bound' },
    ],
    recommendedBooks: ['The Definitive Guide to ARM Cortex-M3 and Cortex-M4 (Yiu)', 'Making Embedded Systems (White)', 'Real-Time Concepts for Embedded Systems (Qing Li)'],
    topCompanies: ['STMicroelectronics', 'Texas Instruments', 'Tesla Autopilot', 'Nordic Semiconductor', 'NXP'],
  },
  {
    id: 'pillar-3',
    number: 'PILLAR // 03',
    title: 'RF, Microwave & Antennas',
    description: 'Maxwell field solutions, planar patch radiators, microstrip design, VSWR impedance tuning, and phased-array radar systems.',
    iconName: 'settings_input_antenna',
    tags: ['Smith Chart', 'S-Params', 'Phased Arrays'],
    edaSuites: 'Keysight ADS, HFSS',
    overview: 'Physical propagation of electro-magnetic waves at microwave and millimeter-wave frequencies where trace lengths are comparable to wavelength. Encompasses scattering parameters, impedance matching networks, patch antennas, and RF amplifiers.',
    coreConcepts: [
      'Transmission Line Equations, Telegrapher Model & Characteristic Impedance',
      'Smith Chart Analytical Mapping: L-Sections, Single & Double Stubs',
      'S-Parameter Matrices (S11 Return Loss, S21 Insertion Gain)',
      'Microstrip & Coplanar Waveguide FR4/Rogers substrate dimensions',
      'Phased-Array Antenna Factors & mmWave Active Beamsteering',
    ],
    keyEquations: [
      { name: 'Reflection Coefficient', formula: 'Gamma = (Z_L - Z_0) / (Z_L + Z_0)', note: 'Complex voltage reflection at load boundary' },
      { name: 'VSWR', formula: 'VSWR = (1 + |Gamma|) / (1 - |Gamma|)', note: 'Voltage Standing Wave Ratio (1:1 is ideal matched)' },
      { name: 'Friis Transmission', formula: 'P_r / P_t = G_t * G_r * (lambda / (4 * pi * R))^2', note: 'Free space path attenuation' },
    ],
    recommendedBooks: ['Microwave Engineering (David M. Pozar)', 'Antenna Theory: Analysis and Design (Balanis)', 'RF Microelectronics (Razavi)'],
    topCompanies: ['Keysight Technologies', 'Broadcom', 'Skyworks', 'Qorvo', 'ISRO / NASA', 'SpaceX'],
  },
  {
    id: 'pillar-4',
    number: 'PILLAR // 04',
    title: 'Signals, DSP & Communications',
    description: 'Discrete spectrum decomposition, digital FIR/IIR filtering, Kalman state estimation, audio/video codecs, and wireless channel capacity.',
    iconName: 'graphic_eq',
    tags: ['FFT / DWT', 'Butterworth', 'QAM Demod'],
    edaSuites: 'MATLAB, GNU Radio',
    overview: 'Sampling, mathematical transformation, noise filtering, and reconstruction of information signals. Explores digital signal processors, optimal filter design, OFDM wireless transmissions, and spectral estimation algorithms.',
    coreConcepts: [
      'Nyquist-Shannon Sampling Theorem & Anti-Aliasing Pre-filtering',
      'Discrete Fourier Transform (DFT) and Radix-2 FFT implementations',
      'FIR Linear Phase Design (Hamming/Blackman windows) & Parks-McClellan',
      'IIR Bilinear Transform (Butterworth, Chebyshev, Elliptic filters)',
      'Digital Constellations: BPSK, QPSK, 16-QAM, 64-QAM & Costas Loops',
    ],
    keyEquations: [
      { name: 'Shannon-Hartley Capacity', formula: 'C = B * log2(1 + S/N)', note: 'Theoretical upper bound for channel data rate in AWGN' },
      { name: 'Discrete Fourier Transform', formula: 'X[k] = sum_{n=0}^{N-1} x[n] * exp(-j * 2*pi * k * n / N)', note: 'Spectral frequency bin distribution' },
      { name: 'FIR Convolution', formula: 'y[n] = sum_{k=0}^{M} h[k] * x[n-k]', note: 'Discrete finite impulse response output' },
    ],
    recommendedBooks: ['Discrete-Time Signal Processing (Oppenheim & Schafer)', 'Digital Communications (Proakis)', 'Understanding DSP (Lyons)'],
    topCompanies: ['Qualcomm', 'Dolby Laboratories', 'Analog Devices', 'Ericsson', 'Sony HW'],
  },
  {
    id: 'pillar-5',
    number: 'PILLAR // 05',
    title: 'Robotics, Control & Mechatronics',
    description: 'Dynamic feedback loops, Field-Oriented Motor Control (FOC), ROS 2 node architecture, and state-space modern control regulators.',
    iconName: 'precision_manufacturing',
    tags: ['FOC Control', 'PID Tuning', 'ROS 2'],
    edaSuites: 'LabVIEW, Code Composer',
    overview: 'Hardware-in-the-loop cyber-physical actuation. Integrates brushless DC motor vector commutation, closed-loop state estimation, Kalman filters, robotic kinematics, and real-time distributed ROS 2 publishers/subscribers.',
    coreConcepts: [
      'Field-Oriented Control (FOC): Clarke & Park Vector Transforms',
      'Space Vector PWM (SVPWM) for 3-Phase Inverter Bridges',
      'PID Gain Tuning via Ziegler-Nichols & Root-Locus Synthesis',
      'State-Space Modeling: Controllability, Observability, LQR Regulators',
      'ROS 2 DDS Middleware: Node communication & micro-ROS on MCUs',
    ],
    keyEquations: [
      { name: 'Park Transform (d-q frame)', formula: 'I_d = I_alpha * cos(theta) + I_beta * sin(theta)', note: 'Decoupling flux and torque in BLDC/PMSM machines' },
      { name: 'Continuous PID Control', formula: 'u(t) = K_p * e(t) + K_i * int e(tau) dtau + K_d * (de/dt)', note: 'Three-term error correction feedback loop' },
      { name: 'State-Space Representation', formula: 'x_dot = A*x + B*u,  y = C*x + D*u', note: 'Multi-input multi-output dynamic vector equation' },
    ],
    recommendedBooks: ['Modern Control Engineering (Ogata)', 'Feedback Control of Dynamic Systems (Franklin)', 'Vector Control of Three-Phase AC Machines (Nguyen)'],
    topCompanies: ['Boston Dynamics', 'ABB Robotics', 'Tesla Optimus', 'Intuitive Surgical', 'KUKA'],
  },
];

export const VERIFIED_PROJECTS: HardwareProject[] = [
  {
    id: 'proj-1',
    stage: 'STAGE 1 • ANALOG',
    domain: 'Analog & Power',
    bomCost: '~$4.50',
    title: 'Precision 555 Moisture Controller',
    description: 'Hysteresis threshold circuit utilizing an NE555 comparator with dual 2N2222 switching transistors to drive high-current solenoid pumps.',
    specs: {
      coreIc: 'NE555P Precision',
      rail: '5V – 12V DC',
      format: 'Single-sided FR4',
    },
    details: {
      schematicOverview: 'Utilizes the internal resistor ladder (5k-5k-5k) of the 555 timer configured as a Schmitt trigger comparator. When soil moisture impedance drops below the calibrated potentiometer threshold, Pin 3 switches HIGH, biasing Q1 and Q2 in Darlington arrangement to trigger the 12V flyback-protected solenoid coil.',
      bomList: [
        { item: 'Precision Timer IC', designator: 'U1', value: 'NE555P', package: 'DIP-8' },
        { item: 'NPN Transistors', designator: 'Q1, Q2', value: '2N2222A', package: 'TO-92' },
        { item: 'Flyback Diode', designator: 'D1', value: '1N4007', package: 'DO-41' },
        { item: 'Trimmer Potentiometer', designator: 'RV1', value: '100 kΩ 10-turn', package: 'Bourns 3296W' },
        { item: 'Electrolytic Capacitor', designator: 'C1', value: '100 µF 25V', package: 'Radial 6.3x11mm' },
        { item: 'Ceramic Capacitor', designator: 'C2', value: '10 nF', package: 'Radial 2.54mm' },
      ],
      verilogOrCodeSnippet: `// SPICE Netlist snippet for Transient Simulation
* Precision 555 Moisture Threshold Comparator Netlist
VCC 1 0 DC 12V
R_SENSE 1 2 47K
R_SOIL 2 0 10K ; Variable soil resistance model
X555 1 2 2 4 0 6 7 8 NE555_MODEL
R_PULL 8 1 10K
Q1 9 8 0 2N2222A
D_CLAMP 0 9 1N4007
L_SOLENOID 1 9 250mH RSER=12
.tran 0.1m 50m`,
      verificationNotes: 'Tested over 120 operational hours with 12V inductive solenoid loads. Snubber diode 1N4007 limits inductive kickback spike to < 13.2V, ensuring transistor $V_{CE}$ breakdown margins remain > 28V.',
    },
  },
  {
    id: 'proj-2',
    stage: 'STAGE 2 • EMBEDDED',
    domain: 'Embedded Systems',
    bomCost: '~$18.20',
    title: 'STM32 200kHz Digital Scope',
    description: 'Interleaved 12-bit DMA ADC sampling engine running on STM32F401, featuring hardware trigger holdoff and SSD1306 vector screen rendering.',
    specs: {
      mcu: 'ARM Cortex-M4 84MHz',
      adc: '2.4 MSPS DMA Dual',
      lib: 'CMSIS-DSP Native',
      coreIc: 'STM32F401CCU6 BlackPill',
      rail: '3.3V / 5V USB-C',
      format: '2-Layer FR4 0.8mm',
    } as any,
    details: {
      schematicOverview: 'High-speed analog frontend includes TL972 rail-to-rail op-amp for input buffering, 1MΩ input impedance attenuation network (1x / 10x switch), and hardware trigger comparator. Dual ADC1 channels operate in interleaved continuous DMA circular buffer mode.',
      bomList: [
        { item: 'MCU Development Board', designator: 'U1', value: 'STM32F401CCU6 84MHz', package: 'BlackPill Header' },
        { item: 'Rail-to-Rail Dual Op-Amp', designator: 'U2', value: 'TL972IDR', package: 'SOIC-8' },
        { item: 'OLED Display Module', designator: 'DISP1', value: 'SSD1306 0.96" I2C/SPI', package: 'Module' },
        { item: 'High Speed Rotary Encoder', designator: 'SW1', value: 'PEC11R-4215F', package: 'Through-hole' },
        { item: 'Low-ESR Tantalum Cap', designator: 'C3, C4', value: '10 µF 16V', package: '1206' },
      ],
      verilogOrCodeSnippet: `/* STM32F401 High Speed Interleaved DMA Configuration */
void MX_ADC1_Init(void) {
  ADC_ChannelConfTypeDef sConfig = {0};
  hadc1.Instance = ADC1;
  hadc1.Init.ClockPrescaler = ADC_CLOCK_SYNC_PCLK_DIV2;
  hadc1.Init.Resolution = ADC_RESOLUTION_12B;
  hadc1.Init.ScanConvMode = DISABLE;
  hadc1.Init.ContinuousConvMode = ENABLE;
  hadc1.Init.DMAContinuousRequests = ENABLE;
  hadc1.Init.ExternalTrigConvEdge = ADC_EXTERNALTRIGCONVEDGE_RISING;
  hadc1.Init.ExternalTrigConv = ADC_EXTERNALTRIGCONV_T2_TRGO;
  HAL_ADC_Init(&hadc1);
  HAL_ADC_Start_DMA(&hadc1, (uint32_t*)dmaBuffer, BUFFER_SIZE);
}`,
      verificationNotes: 'Achieved 2.4 MSPS aggregate throughput with dual-interleaved ADCs. Timebase calibrated against 1 kHz external calibration square wave; jitter measured at under 14 ps RMS.',
    },
  },
  {
    id: 'proj-3',
    stage: 'STAGE 3 • VLSI / FPGA',
    domain: 'Digital Logic & Architecture',
    bomCost: '~$45.00',
    title: 'Pipelined RV32I RISC-V CPU Core',
    description: 'Full 5-stage hazard-resolved pipelined RISC-V processor synthesized in Verilog for Artix-7 and Gowin FPGAs, including UART Bootloader.',
    specs: {
      spec: 'RV32I User-Level v2.2',
      clock: '62.5 MHz Post-PAR',
      target: 'Artix-7 / Tang Nano',
      coreIc: 'XC7A35T / GW1NR-9',
      rail: '1.0V Core / 3.3V IO',
      format: '4-Layer Impedance Match',
    } as any,
    details: {
      schematicOverview: 'Implements classical 5-stage pipeline: IF (Instruction Fetch), ID (Instruction Decode & Register Read), EX (ALU Execution & Branch Resolver), MEM (Data Memory Access), and WB (Register Writeback). Features full data forwarding paths and dynamic branch penalty squashing.',
      bomList: [
        { item: 'FPGA Core Board', designator: 'U1', value: 'Xilinx Artix-7 35T / Tang Nano 9K', package: 'BGA / Module' },
        { item: 'QSPI NOR Flash', designator: 'U2', value: 'W25Q64JVSSIQ 64Mbit', package: 'SOIC-8' },
        { item: 'Low-Jitter MEMS Oscillator', designator: 'OSC1', value: '50.000 MHz 15pF', package: 'SMD-3225' },
        { item: 'USB-to-UART Bridge', designator: 'U3', value: 'CH340C / FT232R', package: 'SOP-16' },
        { item: 'Core Buck Regulator', designator: 'REG1', value: 'TLV62568 1.0V 1A', package: 'SOT-23-5' },
      ],
      verilogOrCodeSnippet: `\`timescale 1ns / 1ps
// RISC-V RV32I 5-Stage Hazard Unit Data Forwarding
module hazard_unit (
  input  wire [4:0] rs1_ex,
  input  wire [4:0] rs2_ex,
  input  wire [4:0] rd_mem,
  input  wire [4:0] rd_wb,
  input  wire       reg_write_mem,
  input  wire       reg_write_wb,
  output reg  [1:0] forward_a,
  output reg  [1:0] forward_b
);
  always @(*) begin
    // EX Hazard Forwarding
    if (reg_write_mem && (rd_mem != 0) && (rd_mem == rs1_ex))
      forward_a = 2'b10;
    else if (reg_write_wb && (rd_wb != 0) && (rd_wb == rs1_ex))
      forward_a = 2'b01;
    else
      forward_a = 2'b00;

    if (reg_write_mem && (rd_mem != 0) && (rd_mem == rs2_ex))
      forward_b = 2'b10;
    else if (reg_write_wb && (rd_wb != 0) && (rd_wb == rs2_ex))
      forward_b = 2'b01;
    else
      forward_b = 2'b00;
  end
endmodule`,
      verificationNotes: 'Passes 100% of RISC-V compliance architectural tests (rv32ui-p-*). Synthesized on Xilinx Vivado 2024.1 targeting 62.5 MHz clock with positive slack +1.84 ns at worst-case slow corner.',
    },
  },
];

export const GATE_SYLLABUS: SyllabusItem[] = [
  {
    discipline: 'Communications & Networks',
    percentage: 10,
    marks: 10,
    color: '#00f2fe',
    topics: ['Random processes & Autocorrelation', 'Analog AM/FM/PM Modulation', 'Digital PAM/QAM & Matched Filter', 'Information Theory & Shannon Limit', 'Baseband Pulse Shaping & ISI'],
  },
  {
    discipline: 'Electronic Devices & VLSI (EDC)',
    percentage: 10,
    marks: 10,
    color: '#00f2fe',
    topics: ['Energy bands in Silicon & Fermi level', 'Carrier transport: Diffusion, Drift, Mobility', 'PN Junction, Zener & Avalanche breakdown', 'MOS capacitor, Threshold voltage & Flatband', 'FinFET short channel effects'],
  },
  {
    discipline: 'Analog Circuits (Op-Amps, BJT)',
    percentage: 9,
    marks: 9,
    color: '#3fddbf',
    topics: ['Small signal BJT & MOSFET amplifiers', 'Op-Amp inverting/non-inverting configurations', 'Feedback topologies & Nyquist stability', 'Active filters, Schmitt triggers & Oscillators', 'Precision rectifiers & 555 timers'],
  },
  {
    discipline: 'Electromagnetics & Antennas',
    percentage: 9,
    marks: 9,
    color: '#3fddbf',
    topics: ['Maxwell Equations & Boundary conditions', 'Wave propagation in lossy & lossless dielectrics', 'Poynting vector & Radiation power flow', 'Transmission lines: Z_0, VSWR, Smith Chart', 'Half-wave dipole & Radiation resistance'],
  },
  {
    discipline: 'Digital Logic & Processors',
    percentage: 8,
    marks: 8,
    color: '#94a3b8',
    topics: ['Combinational logic & K-map simplification', 'Synchronous sequential circuits & Flip-flops', 'Counters, Registers & State diagrams', 'Data converters: ADC (SAR, Flash) & DAC', 'Microprocessor 8085/8086/ARM memory mapping'],
  },
  {
    discipline: 'Signals & System Transforms',
    percentage: 7,
    marks: 7,
    color: '#94a3b8',
    topics: ['Continuous & Discrete LTI systems', 'Fourier Series & Fourier Transform', 'Laplace transform & Pole-zero stability', 'Z-transform, ROC & Inverse transforms', 'DFT and Fast Fourier Transform properties'],
  },
  {
    discipline: 'Engineering Mathematics & Aptitude',
    percentage: 28,
    marks: 28,
    color: '#475569',
    topics: ['Linear Algebra: Eigenvalues & Cayley-Hamilton', 'Calculus: Gradient, Divergence, Curl, Stokes', 'Differential Equations: 1st & 2nd order Cauchy', 'Complex Variables: Cauchy-Riemann & Residues', 'Probability & Statistics: Gaussian, Poisson'],
  },
];

export const TOOLKIT_DOSSIERS: ToolkitDossier[] = [
  {
    id: 'tool-1',
    title: 'Maxwell Equations & Waveguide Formulas',
    fileSize: '1.2 MB',
    pages: 14,
    category: 'Electromagnetics & Wave Theory',
    sections: [
      {
        heading: 'Maxwell Fundamental Equations (Differential & Integral Form)',
        formulas: [
          { name: "Gauss's Law for Electricity", eq: 'div D = rho_v,  oint D * da = Q_enclosed', desc: 'Electric flux divergence is proportional to free charge density.' },
          { name: "Gauss's Law for Magnetism", eq: 'div B = 0,  oint B * da = 0', desc: 'No magnetic monopoles exist; magnetic field lines form closed continuous loops.' },
          { name: "Faraday's Law of Induction", eq: 'curl E = - dB / dt', desc: 'Time-varying magnetic flux induces an opposing electric field circulation.' },
          { name: "Ampere-Maxwell Law", eq: 'curl H = J + dD / dt', desc: 'Conduction current and displacement current density both produce magnetic curl.' },
        ],
      },
      {
        heading: 'Rectangular Waveguide Cutoff Frequencies (TE_mn & TM_mn)',
        formulas: [
          { name: 'Cutoff Frequency f_c', eq: 'f_c(m,n) = (c / (2*pi*sqrt(mu_r*eps_r))) * sqrt((m*pi/a)^2 + (n*pi/b)^2)', desc: 'Waveguide dimension parameters: a = width, b = height. Dominant mode is TE_10.' },
          { name: 'Wave Impedance TE', eq: 'Z_TE = eta / sqrt(1 - (f_c / f)^2)', desc: 'Impedance approaches infinity as operating frequency approaches cutoff.' },
        ],
      },
    ],
  },
  {
    id: 'tool-2',
    title: 'BJT & MOSFET Small-Signal Hybrid-π Sheet',
    fileSize: '890 KB',
    pages: 9,
    category: 'Analog Solid-State Modeling',
    sections: [
      {
        heading: 'Bipolar Junction Transistor (BJT) Small-Signal Parameters',
        formulas: [
          { name: 'Transconductance g_m', eq: 'g_m = I_C / V_T = I_C / 26mV (at 300K)', desc: 'Ratio of collector current change to small base-emitter signal voltage.' },
          { name: 'Input Resistance r_pi', eq: 'r_pi = beta / g_m = beta * V_T / I_C', desc: 'Impedance looking into base terminal with emitter grounded.' },
          { name: 'Output Resistance r_o', eq: 'r_o = (V_A + V_CE) / I_C approx V_A / I_C', desc: 'Accounts for base-width modulation (Early effect).' },
        ],
      },
      {
        heading: 'MOSFET Small-Signal Parameters (Saturation Region)',
        formulas: [
          { name: 'MOSFET g_m', eq: 'g_m = mu_n * C_ox * (W/L) * (V_GS - V_th) = sqrt(2 * mu_n * C_ox * (W/L) * I_D)', desc: 'Drain current response to gate-source bias swing.' },
          { name: 'Drain-Source Output Resistance r_o', eq: 'r_o = 1 / (lambda * I_D)', desc: 'Channel length modulation parameter lambda.' },
        ],
      },
    ],
  },
  {
    id: 'tool-3',
    title: 'SystemVerilog FSM Synthesis & Timing Sheet',
    fileSize: '2.1 MB',
    pages: 18,
    category: 'VLSI Digital Synthesis & Verification',
    sections: [
      {
        heading: 'Static Timing Analysis (STA) Critical Equations',
        formulas: [
          { name: 'Setup Timing Slack', eq: 'Slack_setup = (T_clk - T_skew) - (T_cq + T_comb_max + T_setup)', desc: 'Must be positive to prevent meta-stability on rising clock edge.' },
          { name: 'Hold Timing Slack', eq: 'Slack_hold = (T_cq + T_comb_min) - (T_hold + T_skew)', desc: 'Independent of clock frequency; only dependent on min propagation delay and clock skew.' },
          { name: 'Max Operating Frequency', eq: 'f_max = 1 / (T_cq + T_comb_max + T_setup + T_skew)', note: 'Absolute physical speed ceiling for the synchronous block.' } as any,
        ],
      },
      {
        heading: 'SystemVerilog Two-Always-Block Clean FSM Template',
        formulas: [
          { name: 'State Storage (Sequential)', eq: 'always_ff @(posedge clk or negedge rst_n) state <= (!rst_n) ? IDLE : next_state;', desc: 'D-flip-flop register inferred without combinational glitches.' },
          { name: 'Next-State & Output Logic', eq: 'always_comb begin unique case (state) ... endcase end', desc: 'Full case coverage prevents unintended hardware latch inference.' },
        ],
      },
    ],
  },
];

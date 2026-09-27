export interface ModuleItem {
  id: string;
  code: string;
  title: string;
  description: string;
  topics: string[];
  keyFormula?: string;
  labHours: number;
}

export interface CurriculumTier {
  id: number;
  stageLabel: string;
  semesterRange: string;
  title: string;
  description: string;
  primaryTools: string;
  labSessionsCount: number;
  modules: ModuleItem[];
}

export interface EcePillar {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
  tags: string[];
  edaSuites: string;
  overview: string;
  coreConcepts: string[];
  keyEquations: { name: string; formula: string; note: string }[];
  recommendedBooks: string[];
  topCompanies: string[];
}

export interface HardwareProject {
  id: string;
  stage: string;
  domain: string;
  bomCost: string;
  title: string;
  description: string;
  specs: {
    coreIc: string;
    rail: string;
    format: string;
  };
  details: {
    schematicOverview: string;
    bomList: { item: string; designator: string; value: string; package: string }[];
    verilogOrCodeSnippet?: string;
    verificationNotes: string;
  };
}

export interface SyllabusItem {
  discipline: string;
  percentage: number;
  marks: number;
  color: string;
  topics: string[];
}

export interface ToolkitDossier {
  id: string;
  title: string;
  fileSize: string;
  pages: number;
  category: string;
  sections: { heading: string; formulas: { name: string; eq: string; desc: string }[] }[];
}

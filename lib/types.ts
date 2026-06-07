export interface Contribution {
  id: string;
  name: string;
  context: string;
  type: ContributionType;
  text: string;
  principleTitle?: string;
  createdAt: string;
}

export interface Signatory {
  id: string;
  name: string;
  context: string;
  createdAt: string;
}

export type ContributionType =
  | "A new principle"
  | "A refinement to existing text"
  | "A challenge or counterpoint"
  | "A real-world example or evidence"
  | "A question the document doesn't answer";

export interface Principle {
  num: string;
  title: string;
  body: string;
}

export interface DocSection {
  id: string;
  label: string;
  title: string;
  content: React.ReactNode;
}

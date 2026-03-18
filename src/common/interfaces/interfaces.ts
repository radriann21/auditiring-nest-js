export interface HeaderInfo {
  secureValue: string | string[] | null;
  purpose: string;
  description: string;
  infoUrl: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
}

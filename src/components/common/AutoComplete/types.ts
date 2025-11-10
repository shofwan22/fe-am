export interface AutoCompleteProps {
  endpoint: string;
  value: string;
  onSelect: (v: string) => void;
}

export interface Options {
  id: number;
  name: string;
}

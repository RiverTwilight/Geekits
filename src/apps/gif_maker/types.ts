export interface GifConfig {
  delay: number;
  workers?: number;
  quality?: number;
  width?: string | number | null;
  height?: string | number | null;
}

export interface FormField {
  name: string;
  value: string | number;
} 

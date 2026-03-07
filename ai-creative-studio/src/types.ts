export interface GeneratedItem {
  id: string;
  type: 'image' | 'video' | 'audio' | 'voice' | '3d';
  prompt: string;
  url: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}
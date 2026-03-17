export interface GeneratedItem {
  id: string;
  type: 'image' | 'video' | 'audio' | 'voice' | '3d';
  prompt: string;
  url: string;
  thumbnail?: string;
  createdAt: Date;
  metadata?: Record<string, unknown>;
}

export type TabType = 'dashboard' | 'image' | 'video' | 'audio' | 'voice' | '3d' | 'gallery' | 'history';

export interface GenerationParams {
  prompt: string;
  width?: number;
  height?: number;
  duration?: number;
  voice?: string;
  style?: string;
  seed?: number;
}
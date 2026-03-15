export interface Camera {
  id: string;
  name: string;
  location: string;
  streamUrl: string;
  status: 'online' | 'offline' | 'recording';
  lastSeen: Date;
  resolution: string;
}

export interface CameraGridProps {
  cameras: Camera[];
  selectedCamera: Camera | null;
  onSelectCamera: (camera: Camera) => void;
  layout: 'grid' | 'list';
}

export interface CameraFeedProps {
  camera: Camera;
  isExpanded?: boolean;
  onExpand?: () => void;
  onClose?: () => void;
}
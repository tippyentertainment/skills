import CameraTile from './CameraTile'
import { Camera } from '../types'

interface CameraGridProps {
  cameras: Camera[]
  onCameraSelect: (camera: Camera) => void
}

function CameraGrid({ cameras, onCameraSelect }: CameraGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cameras.map((camera) => (
        <CameraTile
          key={camera.id}
          camera={camera}
          onClick={() => onCameraSelect(camera)}
        />
      ))}
    </div>
  )
}

export default CameraGrid
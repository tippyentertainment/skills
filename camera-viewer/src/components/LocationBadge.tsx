import { MapPin } from 'lucide-react'

interface LocationBadgeProps {
  location: string
}

function LocationBadge({ location }: LocationBadgeProps) {
  return (
    <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 px-2 py-1 rounded-lg">
      <MapPin className="w-3 h-3 text-accent" />
      <span className="text-xs text-white">{location}</span>
    </div>
  )
}

export default LocationBadge
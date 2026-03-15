export interface Camera {
  id: string
  name: string
  location: string
  streamUrl: string
}

export interface PTZState {
  pan: number
  tilt: number
  zoom: number
}
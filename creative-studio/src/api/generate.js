// API stubs for generation endpoints
// Replace these with actual API calls to your backend

const API_BASE = '/api/generate'

async function fetchAPI(endpoint, data) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }
  
  return response.json()
}

export async function generateImage(params) {
  return fetchAPI('/image', params)
}

export async function generateVideo(params) {
  return fetchAPI('/video', params)
}

export async function generateAudio(params) {
  return fetchAPI('/audio', params)
}

export async function generateVoice(params) {
  return fetchAPI('/voice', params)
}

export async function generate3DModel(params) {
  return fetchAPI('/3d', params)
}
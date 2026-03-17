import { useState, useCallback } from 'react'
import { generateImage, generateVideo, generateAudio, generateVoice, generate3DModel } from '../api/generate'

const GENERATORS = {
  image: generateImage,
  video: generateVideo,
  audio: generateAudio,
  voice: generateVoice,
  '3d': generate3DModel,
}

export function useGeneration(type) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const generate = useCallback(async (params) => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const generator = GENERATORS[type]
      if (!generator) {
        throw new Error(`Unknown generation type: ${type}`)
      }

      const response = await generator(params)
      setResult(response)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [type])

  const reset = useCallback(() => {
    setIsLoading(false)
    setError(null)
    setResult(null)
  }, [])

  return {
    isLoading,
    error,
    result,
    generate,
    reset,
  }
}
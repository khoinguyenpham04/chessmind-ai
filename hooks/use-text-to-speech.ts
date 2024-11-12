import { useState, useCallback } from 'react';

export function useTextToSpeech() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateSpeech = useCallback(async (text: string) => {
    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      return url;
    } catch (err) {
      console.error('Text-to-speech error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate speech');
      return null;
    }
  }, []);

  const playAudio = useCallback(async (text: string) => {
    try {
      setIsPlaying(true);
      setError(null);
      
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      const url = await generateSpeech(text);
      
      if (!url) {
        throw new Error('Failed to generate audio URL');
      }

      const audio = new Audio(url);
      
      audio.onerror = (e) => {
        console.error('Audio playback error:', e);
        setError('Error playing audio');
        setIsPlaying(false);
        URL.revokeObjectURL(url);
        setAudioUrl(null);
      };

      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
        setAudioUrl(null);
      };

      await audio.play();
    } catch (err) {
      console.error('Playback error:', err);
      setError(err instanceof Error ? err.message : 'Error playing audio');
      setIsPlaying(false);
    }
  }, [audioUrl, generateSpeech]);

  const stopAudio = useCallback(() => {
    setIsPlaying(false);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  }, [audioUrl]);

  return {
    isPlaying,
    error,
    playAudio,
    stopAudio
  };
} 
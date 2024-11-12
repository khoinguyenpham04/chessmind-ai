'use client';

import React from 'react';
import { useCompletion } from 'ai/react';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import { useTextToSpeech } from '@/hooks/use-text-to-speech';
import { AudioControls } from '@/components/audio-controls';
import { cleanAnalysisText } from '@/utils/text-helpers';

interface MoveAnalysisProps {
  move: string | null;
  position: string;
  moveHistory: string[];
}

export function MoveAnalysis({ move, position, moveHistory }: MoveAnalysisProps) {
  const [lastAnalyzedMove, setLastAnalyzedMove] = React.useState<string | null>(null);
  const [audioError, setAudioError] = React.useState<string | null>(null);
  const { isPlaying, playAudio, stopAudio } = useTextToSpeech();
  
  const { complete, completion, isLoading } = useCompletion({
    api: '/api/chess-analysis',
    onError: (error) => {
      console.error('Error in analysis:', error);
    },
  });

  React.useEffect(() => {
    if (move && move !== lastAnalyzedMove && position && moveHistory.length > 0) {
      const moveNumber = Math.ceil(moveHistory.length / 2);
      const color = moveHistory.length % 2 === 0 ? 'Black' : 'White';
      
      complete('', {
        body: {
          move,
          position,
          moveNumber,
          color,
          moveHistory: moveHistory.join(' ')
        }
      });
      
      setLastAnalyzedMove(move);
    }
  }, [move, position, moveHistory, complete, lastAnalyzedMove]);

  const handlePlayAnalysis = React.useCallback(() => {
    if (completion) {
      try {
        const cleanText = cleanAnalysisText(completion);
        playAudio(cleanText);
        setAudioError(null);
      } catch (error) {
        setAudioError(error instanceof Error ? error.message : 'Failed to play audio');
      }
    }
  }, [completion, playAudio]);

  

  return (
    <Card className="h-full">
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">Move Analysis</h3>
          <AudioControls
            isPlaying={isPlaying}
            onPlay={handlePlayAnalysis}
            onStop={stopAudio}
            disabled={!completion || isLoading}
          />
        </div>
        <ScrollArea className="flex-1 w-full rounded-md border p-4">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              <p className="text-muted-foreground">Analyzing move...</p>
            </div>
          ) : (
            <>
              <ReactMarkdown className="leading-relaxed prose prose-neutral dark:prose-invert max-w-none">
                {completion || 'Make a move to see analysis'}
              </ReactMarkdown>
              {audioError && (
                <p className="text-sm text-red-500 mt-2">
                  Error generating audio: {audioError}
                </p>
              )}
            </>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
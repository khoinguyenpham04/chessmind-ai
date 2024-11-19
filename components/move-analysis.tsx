'use client';

import React from 'react';
import { useCompletion } from 'ai/react';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import { useTextToSpeech } from '@/hooks/use-text-to-speech';
import { AudioControls } from '@/components/audio-controls';
import { cleanAnalysisText } from '@/utils/text-helpers';
import { Button } from './ui/button';
import { BookOpen } from 'lucide-react';

interface MoveAnalysisProps {
  move: string | null;
  position: string;
  moveHistory: string[];
}

export function MoveAnalysis({ move, position, moveHistory }: MoveAnalysisProps) {
  const [audioError, setAudioError] = React.useState<string | null>(null);
  const { isPlaying, playAudio, stopAudio } = useTextToSpeech();
  
  const { complete, completion, isLoading } = useCompletion({
    api: '/api/chess-analysis',
    onError: (error) => {
      console.error('Error in analysis:', error);
    },
  });

  const handleAnalyzeMove = React.useCallback(() => {
    if (move && position && moveHistory.length > 0) {
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
    }
  }, [move, position, moveHistory, complete]);

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
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAnalyzeMove}
              disabled={!move || isLoading}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Analyze
            </Button>
            <AudioControls
              isPlaying={isPlaying}
              onPlay={handlePlayAnalysis}
              onStop={stopAudio}
              disabled={!completion || isLoading}
            />
          </div>
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
                {completion || 'Click Analyze to see move analysis'}
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
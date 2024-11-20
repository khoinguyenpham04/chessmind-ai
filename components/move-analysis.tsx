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
    <Card className="h-full bg-white/10 dark:bg-gray-800/10 backdrop-filter backdrop-blur-md border border-white/20 dark:border-gray-700/20 shadow-lg rounded-xl overflow-hidden">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Move Analysis</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAnalyzeMove}
              disabled={!move || isLoading}
              className="bg-white/20 dark:bg-gray-700/20 backdrop-filter backdrop-blur-sm hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200 text-gray-800 dark:text-gray-200 border border-white/30 dark:border-gray-600/30"
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
        <ScrollArea className="flex-1 w-full rounded-xl border border-white/20 dark:border-gray-700/20 p-6 bg-white/10 dark:bg-gray-800/10 backdrop-filter backdrop-blur-lg shadow-lg">
          <div className="space-y-4 relative z-10">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 dark:border-gray-100"></div>
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
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
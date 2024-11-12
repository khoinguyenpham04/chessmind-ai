import { Button } from "@/components/ui/button";
import { Play, Square } from "lucide-react";

interface AudioControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
  disabled?: boolean;
}

export function AudioControls({ isPlaying, onPlay, onStop, disabled }: AudioControlsProps) {
  return (
    <div className="flex items-center gap-2">
      {isPlaying ? (
        <Button
          size="sm"
          variant="outline"
          onClick={onStop}
          disabled={disabled}
        >
          <Square className="h-4 w-4" />
          <span className="sr-only">Stop</span>
        </Button>
      ) : (
        <Button
          size="sm"
          variant="outline"
          onClick={onPlay}
          disabled={disabled}
        >
          <Play className="h-4 w-4" />
          <span className="sr-only">Play</span>
        </Button>
      )}
    </div>
  );
} 
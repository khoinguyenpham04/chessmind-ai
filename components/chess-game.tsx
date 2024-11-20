'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { MoveAnalysis } from './move-analysis'
import { Undo2, Redo2 } from 'lucide-react'
import { useStockfish } from '@/hooks/use-stockfish';

export function ChessGameComponent() {
  const [game, setGame] = useState(new Chess())
  const [message, setMessage] = useState<string>("White to move")
  const [moveHistory, setMoveHistory] = useState<string[]>([])
  const [currentPosition, setCurrentPosition] = useState<string>(game.fen())
  const [lastMove, setLastMove] = useState<string | null>(null)
  const chessboardContainerRef = useRef<HTMLDivElement>(null)
  const [boardWidth, setBoardWidth] = useState(400)
  const [moveStack, setMoveStack] = useState<Chess[]>([new Chess()])
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0)
  const engine = useStockfish();
  const [playingWithBot, setPlayingWithBot] = useState(false);
  const [botLevel, setBotLevel] = useState(2);

  const levels = {
    "Easy 🤓": 2,
    "Medium 🧐": 8,
    "Hard 😵": 18
  };

  useEffect(() => {
    updateGameStatus()
  }, [game])

  useEffect(() => {
    const updateDimensions = () => {
      if (chessboardContainerRef.current) {
        setBoardWidth(chessboardContainerRef.current.offsetWidth)
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const updateGameStatus = () => {
    if (game.isGameOver()) {
      if (game.isCheckmate()) {
        setMessage(`Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins!`)
      } else if (game.isDraw()) {
        setMessage("Game drawn!")
      } else {
        setMessage("Game over!")
      }
    } else {
      if (game.isCheck()) {
        setMessage(`Check! ${game.turn() === 'w' ? 'White' : 'Black'} to move`)
      } else {
        setMessage(`${game.turn() === 'w' ? 'White' : 'Black'} to move`)
      }
    }
  }

  const findBestMove = useCallback(() => {
    if (!engine) return;
    
    engine.evaluatePosition(game.fen(), botLevel, (bestMove) => {
      try {
        const move = game.move({
          from: bestMove.slice(0, 2),
          to: bestMove.slice(2, 4),
          promotion: bestMove.slice(4, 5) || 'q'
        });

        if (move) {
          setMoveHistory([...moveHistory, move.san]);
          setLastMove(move.san);
          setGame(new Chess(game.fen()));
          setCurrentPosition(game.fen());
        }
      } catch (error) {
        console.error('Invalid bot move:', error);
      }
    });
  }, [engine, game, botLevel, moveHistory]);

  function onDrop(sourceSquare: string, targetSquare: string) {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });

      if (move) {
        const newGame = new Chess(game.fen());
        setMoveHistory([...moveHistory, move.san]);
        setLastMove(move.san);
        setGame(newGame);
        setCurrentPosition(newGame.fen());
        
        const newMoveStack = moveStack.slice(0, currentMoveIndex + 1);
        newMoveStack.push(newGame);
        setMoveStack(newMoveStack);
        setCurrentMoveIndex(currentMoveIndex + 1);

        // Make bot move if playing with bot and game not over
        if (playingWithBot && !newGame.isGameOver()) {
          setTimeout(() => findBestMove(), 300);
        }
        
        return true;
      }
    } catch (error) {
      console.error("Invalid move:", error);
    }
    return false;
  }

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setMoveHistory([]);
    setMessage("White to move");
    setLastMove(null);
    setCurrentPosition(newGame.fen());
    setMoveStack([newGame]);
    setCurrentMoveIndex(0);
  };

  const canUndo = currentMoveIndex > 0
  const canRedo = currentMoveIndex < moveStack.length - 1

  const handleUndo = () => {
    if (canUndo) {
      const previousIndex = currentMoveIndex - 1
      const previousGame = moveStack[previousIndex]
      setGame(new Chess(previousGame.fen()))
      setCurrentPosition(previousGame.fen())
      setCurrentMoveIndex(previousIndex)
      setMoveHistory(moveHistory.slice(0, -1))
      setLastMove(moveHistory[moveHistory.length - 2] || null)
    }
  }

  const handleRedo = () => {
    if (canRedo) {
      const nextIndex = currentMoveIndex + 1
      const nextGame = moveStack[nextIndex]
      setGame(new Chess(nextGame.fen()))
      setCurrentPosition(nextGame.fen())
      setCurrentMoveIndex(nextIndex)
      setMoveHistory([...moveHistory, moveStack[nextIndex].history().pop() || ''])
      setLastMove(moveStack[nextIndex].history().pop() || null)
    }
  }

  useEffect(() => {
    if (playingWithBot) {
      try {
        console.log('Initializing bot play');
        // Any bot initialization code
      } catch (error) {
        console.error('Error initializing bot:', error);
      }
    }
  }, [playingWithBot]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full max-w-6xl mx-auto p-4">
      <Card className="lg:w-[60%]">
        <CardContent className="p-4">
          <div 
            ref={chessboardContainerRef} 
            className="relative aspect-square w-full"
          >
            <Chessboard 
              position={game.fen()}
              onPieceDrop={onDrop}
              boardWidth={boardWidth}
              customBoardStyle={{
                borderRadius: '4px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              }}
              customDarkSquareStyle={{ backgroundColor: '#b58863' }}
              customLightSquareStyle={{ backgroundColor: '#f0d9b5' }}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 lg:w-[40%]">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Game Status</h2>
              <div className="flex gap-2">
                <Button 
                  onClick={handleUndo}
                  disabled={!canUndo}
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 p-0"
                  aria-label="Undo move"
                >
                  <Undo2 className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={handleRedo}
                  disabled={!canRedo}
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 p-0"
                  aria-label="Redo move"
                >
                  <Redo2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-base mb-4">{message}</p>
            <button
              onClick={resetGame}
              className="relative inline-flex h-12 w-full overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mb-4"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-large text-white backdrop-blur-3xl">
                New Game
              </span>
            </button>
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Play vs Computer</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPlayingWithBot(!playingWithBot);
                    resetGame();
                  }}
                >
                  {playingWithBot ? 'Play vs Human' : 'Play vs Computer'}
                </Button>
              </div>
              
              {playingWithBot && (
                <div className="flex flex-col items-center gap-4 my-4">
                  <h3 className="text-lg font-semibold text-gray-200">Select Difficulty</h3>
                  <div className="flex justify-center gap-4">
                    {Object.entries(levels).map(([level, depth]) => (
                      <Button
                        key={level}
                        variant={depth === botLevel ? "default" : "outline"}
                        size="sm"
                        onClick={() => setBotLevel(depth)}
                        className={`
                          px-6 py-3 rounded-xl font-medium transition-all duration-200
                          ${depth === botLevel 
                            ? "bg-gray-800 text-green-400 shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.4),_inset_0px_2px_4px_rgba(255,255,255,0.1)]" 
                            : "bg-gray-900 text-gray-300 hover:text-green-400 shadow-[6px_6px_12px_rgba(0,0,0,0.2),_-6px_-6px_12px_rgba(255,255,255,0.05)]"
                          }
                          hover:shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.4),_inset_0px_2px_4px_rgba(255,255,255,0.1)]
                          active:shadow-[inset_0px_-2px_4px_rgba(0,0,0,0.4),_inset_0px_2px_4px_rgba(255,255,255,0.1)]
                          active:transform active:scale-95
                        `}
                      >
                        {level}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold mb-2">Move History</h3>
            <ScrollArea className="h-32 w-full rounded-md border p-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                {moveHistory.map((move, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {index % 2 === 0 && (
                      <span className="text-muted-foreground">{Math.floor(index / 2) + 1}.</span>
                    )}
                    <span>{move}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        
        <Card className="flex-grow max-h-[calc(100vh-24rem)]">
          <CardContent className="p-4 h-full">
            <MoveAnalysis 
              move={lastMove}
              position={currentPosition}
              moveHistory={moveHistory}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
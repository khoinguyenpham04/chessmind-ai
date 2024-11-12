'use client'

import { useState, useEffect } from 'react'
import { Chess, Square } from 'chess.js'
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MoveAnalysis } from './move-analysis'

const CHESS_PIECES = {
  bK: '♔', bQ: '♕', bR: '♖', bB: '♗', bN: '♘', bP: '♙',
  wK: '♚', wQ: '♛', wR: '♜', wB: '♝', wN: '♞', wP: '♟',
}

export function ChessGameComponent() {
  const [game, setGame] = useState(new Chess())
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null)
  const [validMoves, setValidMoves] = useState<string[]>([])
  const [message, setMessage] = useState<string>("White to move")
  const [moveHistory, setMoveHistory] = useState<string[]>([])
  const [currentPosition, setCurrentPosition] = useState<string>(game.fen())
  const [lastMove, setLastMove] = useState<string | null>(null)

  useEffect(() => {
    updateGameStatus()
  }, [game])

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

  const getValidMoves = (square: string) => {
    return game.moves({ square: square as any, verbose: true }).map(move => move.to)
  }

  const handleSquareClick = (square: string) => {
    if (selectedSquare === null) {
      const piece = game.get(square as Square)
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square)
        setValidMoves(getValidMoves(square))
      }
    } else {
      try {
        const move = game.move({
          from: selectedSquare,
          to: square,
          promotion: 'q' // Always promote to queen for simplicity
        })

        if (move) {
          setMoveHistory([...moveHistory, move.san])
          setLastMove(move.san)
          const newGame = new Chess(game.fen())
          setGame(newGame)
          setCurrentPosition(newGame.fen())
        }
      } catch (error) {
        console.error("Invalid move:", error)
      }
      setSelectedSquare(null)
      setValidMoves([])
    }
  }

  const resetGame = () => {
    setGame(new Chess())
    setSelectedSquare(null)
    setValidMoves([])
    setMoveHistory([])
    setMessage("White to move")
    setLastMove(null)
    setCurrentPosition(new Chess().fen())
  }

  const getPieceCode = (piece: any) => {
    if (!piece) return null
    return piece.color + piece.type.toUpperCase()
  }

  const getLastMove = () => {
    return moveHistory.length > 0 ? moveHistory[moveHistory.length - 1] : null;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto p-4">
      <Card className="flex-1 min-w-[min(100%,70vh)]">
        <CardContent className="p-4">
          <div className="relative aspect-square">
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
              {Array.from({ length: 64 }, (_, i) => {
                const file = String.fromCharCode(97 + (i % 8))
                const rank = 8 - Math.floor(i / 8)
                const square = `${file}${rank}` as Square
                const piece = game.get(square)
                const isLight = (Math.floor(i / 8) + (i % 8)) % 2 === 0
                const isSelected = selectedSquare === square
                const isValidMove = validMoves.includes(square)

                return (
                  <div
                    key={square}
                    className={cn(
                      "relative w-full h-full flex items-center justify-center",
                      "transition-colors duration-200 cursor-pointer text-4xl",
                      isLight ? "bg-[#f0d9b5]" : "bg-[#b58863]",
                      isSelected && "ring-4 ring-blue-500 ring-inset ring-opacity-50",
                      isValidMove && "ring-4 ring-green-500 ring-inset ring-opacity-50"
                    )}
                    onClick={() => handleSquareClick(square)}
                  >
                    {piece && (
                      <span className={piece.color === 'w' ? 'text-white' : 'text-black'}>
                        {CHESS_PIECES[getPieceCode(piece) as keyof typeof CHESS_PIECES]}
                      </span>
                    )}
                    {rank === 1 && (
                      <span className="absolute bottom-0 left-1 text-xs font-semibold opacity-50">{file}</span>
                    )}
                    {file === 'a' && (
                      <span className="absolute top-0 right-1 text-xs font-semibold opacity-50">{rank}</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 flex-1 max-w-md h-screen">
        <Card className="h-1/3">
          <CardContent className="p-4 h-full flex flex-col">
            <div>
              <h2 className="text-2xl font-bold mb-2">Game Status</h2>
              <p className="text-lg mb-4">{message}</p>
              <Button 
                onClick={resetGame} 
                className="relative w-full mb-4 bg-gray-800 shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(255,255,255,0.05)] overflow-hidden
                  before:absolute before:inset-[2px] before:z-[2] before:bg-gray-800 before:rounded-md
                  after:absolute after:inset-[-2px] after:animate-[gradient_5s_linear_infinite] after:bg-[length:200%] 
                  after:bg-gradient-to-r after:from-[#ff0000] after:via-[#00ff00,#0000ff,#ff0000] after:to-[#ff0000]"
              >
                <span className="relative z-[2] text-gray-100 text-bold">New Game</span>
              </Button>
            </div>
            <div className="flex-1 min-h-0">
              <h3 className="text-xl font-semibold mb-2">Move History</h3>
              <ScrollArea className="h-[calc(100%-2rem)] w-full rounded-md border p-4">
                <div className="grid grid-cols-2 gap-2">
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
            </div>
          </CardContent>
        </Card>
        
        <div className="h-2/3">
          <MoveAnalysis 
            move={lastMove}
            position={currentPosition}
            moveHistory={moveHistory}
          />
        </div>
      </div>
    </div>
  )
}
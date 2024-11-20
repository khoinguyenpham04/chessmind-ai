import { useState, useEffect, useCallback } from 'react';

export function useStockfish() {
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stockfish = new Worker('/stockfish/stockfish-16.1-lite.js');
      stockfish.postMessage('uci');
      stockfish.postMessage('isready');
      setWorker(stockfish);
    }
    return () => worker?.terminate();
  }, []);

  const evaluatePosition = useCallback((fen: string, depth: number, callback: (bestMove: string) => void) => {
    if (!worker) return;

    worker.addEventListener('message', function onMessage(e) {
      const message = e.data;
      if (typeof message === 'string' && message.startsWith('bestmove')) {
        const bestMove = message.split(' ')[1];
        callback(bestMove);
        worker.removeEventListener('message', onMessage);
      }
    });

    worker.postMessage(`position fen ${fen}`);
    worker.postMessage(`go depth ${depth}`);
  }, [worker]);

  return { evaluatePosition };
} 
import React, {useState, useRef, useEffect} from 'react';
import {Dimension, Line} from '../../types';
import {LINE_COLOR_ACTIVE} from '../../constants';
import {useDraw} from '../../hooks/useDraw';

const currentLineInitialState = {
  start: null,
  end: null
};

interface LinesCanvasProps {
  canvasElementSize: Dimension,
  canvasBitmapSize: Dimension,
  onLineListUpdated: (lineList: Line[]) => void,
}

const LinesCanvas: React.FC<LinesCanvasProps> = ({
                                                   canvasElementSize,
                                                   canvasBitmapSize,
                                                   onLineListUpdated
                                                 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    drawLine,
    drawMultipleLines,
    clearCanvas,
    getCanvasMouseCoordinates,
    getLineDirectionEndPoint
  } = useDraw();
  const [lineList, setLineList] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<Line>(currentLineInitialState);

  const handleLineListUpdated = (lineList: Line[]) => {
    setLineList(lineList);
    if (onLineListUpdated) {
      onLineListUpdated(lineList);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    clearCanvas(ctx, canvas);
    drawMultipleLines(ctx, lineList);

    if (currentLine.start && currentLine.end) {
      drawLine({ctx, line: currentLine, color: LINE_COLOR_ACTIVE});
    }
  }, [lineList, currentLine, clearCanvas, drawMultipleLines, drawLine]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || currentLine.start) return;

    const canvasMouseCoordinates = getCanvasMouseCoordinates(e, canvasRef.current);

    if (!canvasMouseCoordinates) return;

    setCurrentLine({
      start: canvasMouseCoordinates,
      end: canvasMouseCoordinates,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!currentLine.start || !canvasRef.current) return;

    setCurrentLine({
      start: currentLine.start,
      end: getLineDirectionEndPoint(getCanvasMouseCoordinates(e, canvasRef.current)!, currentLine)
    });
  };

  const handleMouseUp = () => {
    if (!currentLine.start || !currentLine.end) return;

    handleLineListUpdated([...lineList, {start: currentLine.start, end: currentLine.end}]);
    setCurrentLine({start: null, end: null});
  };

  return (
    <canvas
      ref={canvasRef}
      width={canvasBitmapSize.width}
      height={canvasBitmapSize.height}
      style={{
        width: canvasElementSize.width,
        height: canvasElementSize.height,
        border: '2px solid red',
        background: 'white',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      data-testid="canvas-test"
    />
  );
};

LinesCanvas.defaultProps = {
  canvasElementSize: {width: 600, height: 400},
  canvasBitmapSize: {width: 900, height: 600},
  onLineListUpdated: () => {
  }
}

export default LinesCanvas;

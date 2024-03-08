import React, {useState} from 'react';
import LinesCanvas from './components/LinesCanvas';
import {Dimension, Line} from './types';
import LinePointsList from './components/UI/LinePointsList';
import {CanvasSizeDimension} from './constants';
import {SizeControlButtons} from './components/SizeControlButtons';
import {AppLayout} from './layouts/App';

function App() {
  const [canvasSize, setCanvasSize] = useState<Dimension>(CanvasSizeDimension.LARGE);
  const [lineList, setLineList] = useState<Line[]>([]);

  const handleCanvasSizeChange = (dimension: Dimension) => {
    if (canvasSize.width === dimension.width && canvasSize.height === dimension.height) return;

    setCanvasSize(dimension);
  };

  return <AppLayout
    buttons={<SizeControlButtons onCanvasSizeChange={handleCanvasSizeChange}/>}
    canvas={<LinesCanvas
      canvasBitmapSize={CanvasSizeDimension.X_LARGE}
      canvasElementSize={canvasSize}
      onLineListUpdated={setLineList}
    />}
    list={<LinePointsList lineList={lineList}/>}
  />;
}

export default App;

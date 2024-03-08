import React from 'react';
import { render, screen } from '@testing-library/react';
import LinesCanvas from './components/LinesCanvas';
import {setupJestCanvasMock} from 'jest-canvas-mock';

describe('CanvasCheck', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    setupJestCanvasMock();
  });

  it('renders canvas element', () => {
    render(
      <LinesCanvas
        canvasElementSize={{ width: 1200, height: 800 }}
        canvasBitmapSize={{ width: 1200, height: 800 }}
        onLineListUpdated={() => {}}
      />
    );

    const canvasElement = screen.getByTestId('canvas-test');
    expect(canvasElement).toBeInTheDocument();
  });
});

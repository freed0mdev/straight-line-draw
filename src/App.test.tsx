import React from 'react';
import {render, screen} from '@testing-library/react';
import LinesCanvas from './components/LinesCanvas';
import {setupJestCanvasMock} from 'jest-canvas-mock';
import {SizeControlButtons} from './components/SizeControlButtons';
import Button from './components/UI/Button';
import LinePoints from './components/UI/LinePoints';

describe('CanvasCheck', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    setupJestCanvasMock();
  });

  it('renders canvas element', () => {
    render(
      <LinesCanvas
        canvasElementSize={{width: 1200, height: 800}}
        canvasBitmapSize={{width: 1200, height: 800}}
        onLineListUpdated={() => {
        }}
      />
    );

    const canvasElement = screen.getByTestId('canvas-test');
    expect(canvasElement).toBeInTheDocument();
  });

  it('should render a canvas element with the specified size and style', () => {
    render(
      <LinesCanvas
        canvasElementSize={{width: 1200, height: 800}}
        canvasBitmapSize={{width: 1200, height: 800}}
        onLineListUpdated={() => {
        }}
      />
    );

    const canvasElement = screen.getByTestId('canvas-test');
    expect(canvasElement).toBeInTheDocument();
    expect(canvasElement).toHaveStyle({
      width: '1200px',
      height: '800px',
      border: '2px solid red',
      background: 'white',
    });
  });

  it('should render three buttons with labels "Маленький", "Середній", and "Великий"', () => {
    render(<SizeControlButtons onCanvasSizeChange={() => {
    }}/>);

    expect(screen.getByText('Маленький')).toBeInTheDocument();
    expect(screen.getByText('Середній')).toBeInTheDocument();
    expect(screen.getByText('Великий')).toBeInTheDocument();
  });

  it('should not throw an error when \'onCanvasSizeChange\' function is not provided', () => {
    expect(() => {
      render(<SizeControlButtons/>);
    }).not.toThrow();
  });


  it('should render a button element with the class name "button"', () => {
    const onClick = jest.fn();
    const children = 'Click me';

    render(<Button onClick={onClick}>{children}</Button>);

    expect(screen.getByRole('button')).toHaveClass('button');
  });

  it('should render a button element without an onClick function', () => {
    const children = 'Click me';

    render(<Button>{children}</Button>);

    expect(screen.getByRole('button')).not.toHaveAttribute('onClick');
  });

  it('should render the formatted start and end points of a line with its line number in a list item', () => {
    const line = {
      start: {x: 1.5, y: 2.5},
      end: {x: 3.5, y: 4.5}
    };
    const lineNumber = 1;

    render(<LinePoints lineNumber={lineNumber} line={line}/>);

    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveTextContent('Line 1 points - [2, 3], [4, 5]');
  });

  it('should render an empty list item if the line is null', () => {
    const line = null;
    const lineNumber = 1;

    // @ts-ignore
    render(<LinePoints lineNumber={lineNumber} line={line}/>);

    const listItem = screen.getByRole('listitem');
    expect(listItem).toBeEmptyDOMElement();
  });
});

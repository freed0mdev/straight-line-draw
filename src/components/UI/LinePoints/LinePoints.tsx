import React from 'react';
import {Line, Point} from '../../../types';

interface LinePointsProps {
  lineNumber: number,
  line: Line,
}

const formatPoint = (point: Point | null) => {
  if (!point) return '';

  const {x, y} = point;
  const xFormatted = Math.round(x);
  const yFormatted = Math.round(y);
  return `[${xFormatted}, ${yFormatted}]`;
}

function LinePoints({lineNumber, line}: LinePointsProps) {
  if(!line) return (<li></li>);
  const {start, end} = line;
  const startPointFormatted = formatPoint(start);
  const endPointFormatted = formatPoint(end);
  const textFormatted = `Line ${lineNumber} points - ${startPointFormatted}, ${endPointFormatted}`;

  return <li>{textFormatted}</li>;
}

LinePoints.defaultProps = {
  lineNumber: 0,
  line: {
    start: {x: 0, y: 0},
    end: {x: 0, y: 0}
  }
}

export default LinePoints;
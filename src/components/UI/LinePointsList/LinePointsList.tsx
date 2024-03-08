import React from 'react';
import {Line} from '../../../types';
import LinePoints from '../LinePoints';

interface LinePointsProps {
  lineList: Line[]
}

const getLineNumber = (index: number) => {
  return index + 1;
}

function LinePointsList({lineList}: LinePointsProps) {

  const renderLinePoints = (line: Line, index: number) => (
    <LinePoints key={index} lineNumber={getLineNumber(index)} line={line}/>
  )

  return <ul>
    {lineList.map(renderLinePoints)}
  </ul>;
}

LinePointsList.defaultProps = {
  lineList: []
}

export default LinePointsList;
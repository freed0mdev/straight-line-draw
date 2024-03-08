import Button from '../UI/Button';
import React from 'react';
import {CanvasSizeDimension} from '../../constants';
import {Dimension} from '../../types';

const BUTTONS_CONFIG = [
  {dimension: CanvasSizeDimension.SMALL, label: 'Маленький'},
  {dimension: CanvasSizeDimension.MEDIUM, label: 'Середній'},
  {dimension: CanvasSizeDimension.LARGE, label: 'Великий'},
];

interface SizeControlButtonsProps {
  onCanvasSizeChange?: (dimension: Dimension) => void;
}

export const SizeControlButtons: React.FC<SizeControlButtonsProps> = ({onCanvasSizeChange}) => {
  const handleCanvasSizeChange = (dimension: Dimension) => () => {
    if(!onCanvasSizeChange) return;
    onCanvasSizeChange(dimension);
  };

  const renderSizeButton = ({dimension, label}: {
    dimension: Dimension,
    label: string
  }) => {
    return (<Button key={label} onClick={handleCanvasSizeChange(dimension)}>{label}</Button>);
  }

  return <div style={{
    display: 'flex',
    justifyContent: 'space-around',
  }}>
    {BUTTONS_CONFIG.map(renderSizeButton)}
  </div>;
}
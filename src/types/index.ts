export type Dimension = {
  width: number;
  height: number;
};

export type Point = {
  x: number;
  y: number;
};

export type Line = {
  start: Point | null;
  end: Point | null;
}

export type DrawLineParams = {
  ctx: CanvasRenderingContext2D | null
  line: Line,
  color: string
};
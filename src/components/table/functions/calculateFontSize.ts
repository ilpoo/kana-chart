import { originalFontSize } from "../Table";

export function calculateFontSize (
  cell: HTMLTableDataCellElement,
) {
  const cellSize = cell.getBoundingClientRect();
  const contentSize = cell.firstElementChild!.getBoundingClientRect();
  const proportion = Math.min((cellSize.height / contentSize.height), (cellSize.width / (contentSize.width * 1.3)));
  const fontSize = ~~Math.max(originalFontSize, originalFontSize * proportion * .9);

  return fontSize;
}

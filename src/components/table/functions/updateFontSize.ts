import Options from "../../../interfaces/Options";
import { decideWhichCellToBaseCalculationsOn } from "./decideWhichCellToBaseCalculationsOn";
import { calculateFontSize } from "./calculateFontSize";
import { originalFontSize } from "../Table";
import { setFontSize } from "./setFontSize";

let lastOptions = "";
let lastkyoukashoLoaded = false;
let lastTranspose = false;

export function updateFontSize (
  options: Options,
  kyoukashoLoaded: boolean,
  transpose: boolean,
  table: HTMLTableElement,
  forceUpdate = false,
) {
  const newOptions = JSON.stringify(options);

  if (
       (newOptions !== lastOptions) // Options changed
    || (kyoukashoLoaded !== lastkyoukashoLoaded) // Font got loaded since last update
    || (transpose !== lastTranspose) // Orientation changed
    || forceUpdate
  ) {
    lastOptions = newOptions;
    lastkyoukashoLoaded = kyoukashoLoaded;
    lastTranspose = transpose;

    setFontSize(originalFontSize, table);
    const cell = decideWhichCellToBaseCalculationsOn(
      transpose,
      table,
      options.transcription,
      options.diagraphs,
    );

    // Let the browser paint first to get accurate measurements:
    requestAnimationFrame(
      () => setFontSize(
        calculateFontSize(cell),
        table,
      ),
    );
  }
}

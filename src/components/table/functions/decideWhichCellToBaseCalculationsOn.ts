export function decideWhichCellToBaseCalculationsOn (
  transpose: boolean,
  table: HTMLTableElement,
  transcription: boolean,
  digraphs: boolean,
) {
  const rows = table.getElementsByTagName("tr");

  return transpose
    ? (!transcription && digraphs)
      ? rows[rows.length - 1].getElementsByTagName("td")[2]
      : (!transcription && !digraphs)
        ? rows[1].getElementsByTagName("td")[1]
        : rows[2].getElementsByTagName("td")[0]
    : (digraphs)
      ? rows[2].getElementsByTagName("td")[6]
      : rows[1].getElementsByTagName("td")[1];
}

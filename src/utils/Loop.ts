const repeat = <T>(count: number, render: (index: number) => T): T[] =>
  Array.from({ length: count }, (_, index) => render(index));

export default repeat;

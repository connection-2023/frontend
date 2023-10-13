const createOptions = (from: number, to: number) => {
  return Array.from({ length: to - from + 1 }, (_, i) => ({
    value: i + from,
    label: String(i + from),
  }));
};

export default createOptions;

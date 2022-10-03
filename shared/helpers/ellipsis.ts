const ellipsis = (value: string, limit: number = 100) => {
  if (value.length > limit) {
    return `${value.substring(0, limit)}...`;
  }

  return value;
};

export default ellipsis;

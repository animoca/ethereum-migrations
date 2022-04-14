function buildArguments(args) {
  return async (hre) => {
    const result = [];
    for (const arg of args) {
      if (typeof arg.value === 'function') {
        result.push({
          name: arg.name,
          value: await arg.value(hre),
        });
      } else {
        result.push(arg);
      }
    }
    return result;
  };
}

module.exports = {
  buildArguments,
};

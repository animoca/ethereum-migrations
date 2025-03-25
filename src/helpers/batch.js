const progress = require('cli-progress');

async function batchDoWhile(doFunction, doArgss, message, conditionFunction, acceptRevert = false) {
  const format = `${message} [{bar}] {percentage}% | {value}/{total}...`;
  const bar = new progress.SingleBar({format}, progress.Presets.shades_classic);
  bar.start(doArgss.length, 0);

  const results = [];
  let index = 0;
  for (const doArgs of doArgss) {
    let result;
    if (acceptRevert) {
      try {
        result = await doFunction(...doArgs);
      } catch (_err) {
        result = null;
      }
    } else {
      result = await doFunction(...doArgs);
    }

    if (conditionFunction(result, index)) {
      results.push(result);
      bar.increment();
    } else {
      break;
    }
    index++;
  }
  bar.stop();
  return results;
}

async function batchDo(doFunction, doArgss, message, acceptRevert = false) {
  return batchDoWhile(doFunction, doArgss, message, async () => true, acceptRevert);
}

module.exports = {
  batchDo,
  batchDoWhile,
};

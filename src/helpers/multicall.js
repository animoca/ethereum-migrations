const {ethers} = require('hardhat');

async function encodeCalls(calls) {
  let lastContractName = null;
  let contract;
  const encodedCalls = [];
  for (const call of calls) {
    if (lastContractName === null || lastContractName !== call.contractName) {
      // avoid instantiating the same ethers contract several times
      lastContractName = call.contractName;
      contract = await ethers.getContract(call.contractName);
    }
    encodedCalls.push([contract.address, contract.interface.encodeFunctionData(call.method, call.args)]);
  }
  return encodedCalls;
}

function decodeAggregateReturnData(returnData, returnTypes) {
  return returnData.map((res, i) => {
    return {
      success: res.success,
      returnData: res.success ? ethers.AbiCoder.defaultAbiCoder().decode([returnTypes[i]], res.returnData)[0] : null,
    };
  });
}

async function tryAggregate(name, requireSuccess, calls) {
  const multicall = await ethers.getContract(name);
  const returnData = await multicall.callStatic.tryAggregate(requireSuccess, await encodeCalls(calls));
  return decodeAggregateReturnData(
    returnData,
    calls.map((call) => call.returnType),
  );
}

async function tryBlockAndAggregate(name, requireSuccess, calls) {
  const multicall = await ethers.getContract(name);
  const result = await multicall.callStatic.tryBlockAndAggregate(requireSuccess, await encodeCalls(calls));
  return {
    blockNumber: result.blockNumber,
    returnData: decodeAggregateReturnData(
      result.returnData,
      calls.map((call) => call.returnType),
    ),
  };
}

module.exports = {
  encodeCalls,
  decodeAggregateReturnData,
  tryAggregate,
  tryBlockAndAggregate,
};

const {multiSkip} = require('../helpers/common');

const templatedMigration = (script) => {
  const migration = async (hre) => {
    await script(hre);
  };

  Object.defineProperty(migration, 'skip', {
    get: function () {
      return this._skip;
    },
    set: function (skip) {
      if (!this._skip) {
        this._skip = skip;
      } else {
        this._skip = multiSkip(skip, this._skip);
      }
    },
  });

  Object.defineProperty(migration, 'tags', {
    get: function () {
      return this._tags;
    },
    set: function (tags) {
      if (!this._tags) {
        this._tags = tags;
      } else {
        this._tags.push(...tags);
      }
    },
  });

  Object.defineProperty(migration, 'dependencies', {
    get: function () {
      return this._dependencies;
    },
    set: function (dependencies) {
      if (!this._dependencies) {
        this._dependencies = dependencies;
      } else {
        this._dependencies.push(...dependencies);
      }
    },
  });

  return migration;
};

async function buildNamedArgs(hre, args) {
  const result = [];
  for (const arg of args) {
    if (Array.isArray(arg.value)) {
      result.push({
        name: arg.name,
        value: await buildArrayArg(hre, arg.value),
      });
    } else if (typeof arg.value === 'function') {
      result.push({
        name: arg.name,
        value: await arg.value(hre),
      });
    } else {
      result.push(arg);
    }
  }
  return result;
}

async function buildArg(hre, arg) {
  if (Array.isArray(arg)) {
    return buildArrayArg(hre, arg);
  } else if (typeof arg === 'function') {
    return arg(hre);
  }
  return arg;
}

async function buildArrayArg(hre, args) {
  const result = [];
  for (const arg of args) {
    result.push(await buildArg(hre, arg));
  }
  return result;
}

function argValueString(value) {
  if (Array.isArray(value)) {
    return `[${value.map((v) => argValueString(v))}]`;
  }
  return `${value}`;
}

function namedArgsToString(args) {
  return `[${args.map((arg) => `${arg.name}: ${argValueString(arg.value)}`).join(', ')}]`;
}

module.exports = {
  templatedMigration,
  buildArg,
  buildNamedArgs,
  namedArgsToString,
};

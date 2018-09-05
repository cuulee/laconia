const LaconiaContext = require("./LaconiaContext");
const SingleCache = require("./SingleCache");

const cacheResult = (fn, maxAge) => {
  const cache = new SingleCache(maxAge);

  return async () => {
    if (cache.isEmpty() || cache.hasExpired()) {
      cache.set(await fn(arguments));
    }
    return cache.get();
  };
};

module.exports = class CoreLaconiaContext extends LaconiaContext {
  constructor(baseContext) {
    super(baseContext);
    const coreInstances = {
      env: process.env
    };
    this.registerInstances(coreInstances);
    this._registerInstancesWithPrefix(coreInstances);
  }

  registerFactory(factory, { cache = true, maxAge = Infinity } = {}) {
    super.registerFactory(cache ? cacheResult(factory, maxAge) : factory);
  }
};

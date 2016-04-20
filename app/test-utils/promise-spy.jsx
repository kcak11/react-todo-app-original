import expect from 'expect';

export default (spy, shouldSucceed = true) => {
  var resolveCompletedPromise;
  var spy = expect.createSpy();
  var completedPromise = new Promise((resolve) => {
    resolveCompletedPromise = resolve
  });
  var promiseSpy = (...args) => {
    if (typeof spy === 'function') {
      spy.apply(undefined, args);
    }

    return new Promise((resolve, reject) => {
      shouldSucceed ? resolve() : reject();
      resolveCompletedPromise();
    });
  };

  return {
    completedPromise,
    spy,
    promiseSpy
  }
};

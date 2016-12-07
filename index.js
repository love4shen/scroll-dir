module.exports = ({
  target = window,
  lowerThreshold = -50,
  upperThreshold = 10,
  cb1 = (() => {
    // console.log('up');
  }),
  cb2 = (() => {
    // console.log('down');
  }),
} = {}) => {
  if (target === undefined) {
    throw new Exception('target is undefined');
  }

  let lastPos = 0;
  let flag = false;
  let timer;

  const listener = () => {
    const currentPos = target.scrollY;

    if (lastPos !== undefined) {
      const delta = currentPos - lastPos;

      if (delta < lowerThreshold && !flag) {
        flag = true;
        cb1();
      } else if (delta > upperThreshold && flag) {
        flag = false;
        cb2();
      }
    }

    lastPos = currentPos;

    if (timer !== undefined) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      lastPos = undefined;
    }, 100);
  };

  const listen = () => {
    target.addEventListener('scroll', listener);
  };

  const unListen = () => {
    target.removeEventListener('scroll', listener);
  };

  return {
    listen,
    unListen,
  }
}

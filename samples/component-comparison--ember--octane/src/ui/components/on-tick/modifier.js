import useEffect from 'ember-functional-modifiers';

export default useEffect((element, [callback, delay]) => {
  let timer = setInterval(callback, delay || 1000);

  return () => clearInterval(timer);
});

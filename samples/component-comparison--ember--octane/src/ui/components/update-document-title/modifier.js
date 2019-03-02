import useEffect from 'ember-functional-modifiers';

export default useEffect((element, [count]) => {
  document.title = `You clicked ${count} times`;
});

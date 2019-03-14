import React, { useMemo, useState } from 'react';

import { useTick } from 'effects/use-tick';
import { useUpdateableDocumentTitle } from 'effects/use-updateable-document-title';

export default function MyComponent({ someProp }) {
  const [seconds, setSeconds] = useState(0);
  const [count, setCount] = useState(0);
  const minutes = useMemo(() => seconds / 60, [seconds]);

  const incrementSeconds = () => setSeconds(seconds + 1);
  const incrementCount = () => setCount(count + 1);
  const clearElapsedTime = () => setSeconds(0);

  useTick(incrementSeconds);
  useUpdateableDocumentTitle(count);

  return (
    <div>
      Passed Prop: {someProp}<br />
      Elapsed Seconds: {seconds}<br />
      Elapsed Minutes: {minutes}<br /><br />

      <button onClick={incrementCount}>
        Bump document title count
      </button><br /><br />

      <button onClick={clearElapsedTime}>
        Clear Elapsed Time
      </button>
    </div>
  );
}

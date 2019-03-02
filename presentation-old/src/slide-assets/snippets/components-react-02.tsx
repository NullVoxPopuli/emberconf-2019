import React, { useState } from 'react';

export default function Incrementer() {
  const [number, setNumber] = useState(0);
  const increment = () => setNumber(number + 1);

  return (
    Num: {number} <br />

    <button onClick={increment}>
      Add
    </button>
  );
}

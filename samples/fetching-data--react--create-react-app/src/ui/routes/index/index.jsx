import React, { useState, useEffect } from 'react';

export default function IndexRoute() {
  const [model, setModel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch('https://swapi.co/api/people/1');
      let json = await response.json();

      setModel({ person: json });
    }

    fetchData();
  }, []);

  return (
    <pre>
      {JSON.stringify(model, undefined, 4)}
    </pre>
  );
}

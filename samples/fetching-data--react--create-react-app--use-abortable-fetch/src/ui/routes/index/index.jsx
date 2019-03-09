import React from 'react';
import useAbortableFetch from 'use-abortable-fetch';

export default function IndexRoute() {
  const {
    data, loading, error
  } = useAbortableFetch('https://swapi.co/api/people/1');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <pre>
      {JSON.stringify(data, undefined, 4)}
    </pre>
  );
}

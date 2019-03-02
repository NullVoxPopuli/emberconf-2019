import { useEffect } from 'react';

export function updateDocumentTitle(count) {
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);
}

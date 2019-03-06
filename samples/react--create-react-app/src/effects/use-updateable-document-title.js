import { useEffect } from 'react';

export function useUpdateableDocumentTitle(count) {
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);
}

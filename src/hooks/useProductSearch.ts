import { useState } from 'react';
import { useDebounce } from 'use-debounce';

export const useProductSearch = (initialValue = '') => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [debouncedQuery] = useDebounce(searchQuery, 300);

  return {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
  };
};

import { TextInput } from '@mantine/core';
import { useEffect } from 'react';
import { Search } from 'tabler-icons-react';
import useDebounce from '../../../hooks/useDebounce';
import { useSearch } from '../../../store/search';

const Searchbar: React.FC = () => {
  const search = useSearch();
  const debouncedSearch = useDebounce(search.value);

  useEffect(() => {
    search.setDebouncedValue(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <>
      <TextInput
        sx={{ flex: '1 1 auto', padding: 2 }}
        icon={<Search size={20} />}
        placeholder="Search"
        value={search.value ?? ''}
        onChange={(e) => search.setValue(e.target.value)}
      />
    </>
  );
};

export default Searchbar;

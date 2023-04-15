import { TextInput } from '@mantine/core';
import { useEffect } from 'react';
import { TbSearch } from 'react-icons/tb';
import useDebounce from '../../../hooks/useDebounce';
import { useSearch } from '../../../store/search';
import { Locale } from '../../../store/locale';

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
        icon={<TbSearch size={20} />}
        placeholder={Locale.ui_search}
        value={search.value ?? ''}
        onChange={(e) => search.setValue(e.target.value)}
      />
    </>
  );
};

export default Searchbar;

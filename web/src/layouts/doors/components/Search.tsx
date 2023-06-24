import { TextInput } from '@mantine/core';
import { useEffect } from 'react';
import { TbSearch } from 'react-icons/tb';
import useDebounce from '../../../hooks/useDebounce';
import { useSearch } from '../../../store/search';
import { useLocales } from '../../../providers/LocaleProvider';

const Searchbar: React.FC = () => {
  const search = useSearch();
  const debouncedSearch = useDebounce(search.value);
  const { locale } = useLocales();

  useEffect(() => {
    search.setDebouncedValue(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <>
      <TextInput
        sx={{ flex: '1 1 auto', padding: 2 }}
        icon={<TbSearch size={20} />}
        placeholder={locale.ui.search}
        value={search.value ?? ''}
        onChange={(e) => search.setValue(e.target.value)}
      />
    </>
  );
};

export default Searchbar;

import { useEffect } from 'react';
import { useSetters } from '../../../../store';
import ItemFields from './components/ItemFields';
import Layout from '../../Layout';

const Items: React.FC = () => {
  const setItemFields = useSetters((setter) => setter.setItems);

  // Clear empty item fields when leaving the page
  useEffect(() => {
    return () => {
      setItemFields((prevState) => prevState.filter((item, index) => index === 0 || item.name !== ''));
    };
  }, []);

  return (
    <Layout setter={() => setItemFields((prevState) => [...prevState, { name: '', metadata: '', remove: false }])}>
      <ItemFields />
    </Layout>
  );
};

export default Items;

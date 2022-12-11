import Layout from '../../Layout';
import { useSetters } from '../../../../store';
import LockpickFields from './components/LockpickFields';
import { useEffect } from 'react';

const Lockpick: React.FC = () => {
  const setLockpickFields = useSetters((setter) => setter.setLockpickDifficulty);

  useEffect(() => {
    return () => {
      setLockpickFields((prevState) => prevState.filter((field, index) => index === 0 || field !== ''));
    };
  }, []);

  return (
    <Layout setter={() => setLockpickFields((prevState) => [...prevState, ''])}>
      <LockpickFields />
    </Layout>
  );
};
export default Lockpick;

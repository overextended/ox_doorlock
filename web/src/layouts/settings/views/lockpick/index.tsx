import Layout from '../../Layout';
import { useSetters } from '../../../../store';
import LockpickFields from './components/LockpickFields';

const Lockpick: React.FC = () => {
  const setLockpickFields = useSetters((setter) => setter.setLockpickDifficulty);

  return (
    <Layout setter={() => setLockpickFields((prevState) => [...prevState, ''])}>
      <LockpickFields />
    </Layout>
  );
};
export default Lockpick;

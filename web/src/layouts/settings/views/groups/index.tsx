import { Box, Text, Stack, Button, Group, Tooltip } from '@mantine/core';
import { useEffect } from 'react';
import { TbPlus } from 'react-icons/tb';
import { useSetters } from '../../../../store';
import GroupFields from './components/GroupFields';
import Layout from '../../Layout';

const Groups: React.FC = () => {
  const setGroups = useSetters((setter) => setter.setGroups);

  // Remove empty fields on unmount
  useEffect(() => {
    return () => {
      setGroups((prevState) =>
        prevState.filter((item, index) => item.name !== '' || item.grade !== null || index === 0)
      );
    };
  }, []);

  return (
    <Layout setter={() => setGroups((prevState) => [...prevState, { name: '', grade: null }])}>
      <GroupFields />
    </Layout>
  );
};

export default Groups;

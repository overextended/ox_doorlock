import { ActionIcon, Stack, Text } from '@mantine/core';
import { HiArrowLeft } from 'react-icons/hi';
import { Link, useParams } from 'react-router-dom';
import DoorTable from './components/DoorTable';
import Header from './components/Header';

const Doors: React.FC = () => {
  const { category } = useParams();

  return (
    <Stack sx={{ height: '100%' }}>
      <Header />
      <Link to="/" style={{
          textDecoration: "none",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: ".125rem",
          paddingLeft: "10px",
        }}
      >
        <ActionIcon color="blue.4" variant="transparent">
          <HiArrowLeft size={14} />
        </ActionIcon>
        <Text size="sm" align="center" color="blue.4" weight={700}>
          Back
        </Text>
      </Link>
      <DoorTable />
    </Stack>
  );
};

export default Doors;

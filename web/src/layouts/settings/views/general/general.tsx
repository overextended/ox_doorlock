import {
  Box,
  SimpleGrid,
  TextInput,
  NumberInput,
  Grid,
  Text,
  Switch,
  Center,
  Button,
  Stack,
  Group,
} from '@mantine/core';
import { Check } from 'tabler-icons-react';
import Input from './components/Input';

const General: React.FC = () => {
  return (
    <Stack justify="space-between" sx={{ height: '100%' }}>
      <Box>
        <Grid columns={2} sx={{ fontSize: 16 }}>
          <Input label="Door name" type="text" />
          <Input label="Passcode" type="text" />
          <Input
            label="Autolock Interval"
            type="number"
            infoCircle="Time in milliseconds after which the door will be locked"
          />
          <Input
            label="Interact Distance"
            type="number"
            infoCircle="Controls the distance from which the player can interact with the door"
          />
          <Input label="Door Rate" type="number" span={2} infoCircle="Speed the automatic door will move at" />
        </Grid>

        <SimpleGrid cols={2} pt={16}>
          <Switch label="Locked" />
          <Switch label="Double" />
          <Switch label="Automatic" />
          <Switch label="Lockpick" />
          <Switch label="Hide UI" />
        </SimpleGrid>
      </Box>

      <Center>
        <Button leftIcon={<Check />} color="teal">
          Confirm Door
        </Button>
      </Center>
    </Stack>
  );
};

export default General;

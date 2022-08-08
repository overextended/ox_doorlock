import { Box, SimpleGrid, Grid, Switch, Center, Button, Stack } from '@mantine/core';
import { TbCheck } from 'react-icons/tb';
import Input from './components/Input';
import TooltipSwitch from './components/TooltipSwitch';

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
          <TooltipSwitch label="Locked" infoCircle="Sets whether the targeting door is locked by default" />
          <TooltipSwitch label="Double" infoCircle="Enable if the targeting door is a double door" />
          <TooltipSwitch
            label="Automatic"
            infoCircle="Enable if the targeting door is moving automatically (Garage, poles, etc...)"
          />
          <TooltipSwitch label="Lockpick" infoCircle="Enables the targeting door to be lockpicked" />
          <TooltipSwitch label="Hide UI" infoCircle="Hides UI indicators for the targeting door" />
        </SimpleGrid>
      </Box>

      <Center>
        <Button leftIcon={<TbCheck />} color="teal">
          Confirm Door
        </Button>
      </Center>
    </Stack>
  );
};

export default General;

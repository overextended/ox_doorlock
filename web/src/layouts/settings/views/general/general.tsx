import { Box, SimpleGrid, TextInput, NumberInput, Grid, Text, Switch } from '@mantine/core';

const General: React.FC = () => {
  return (
    <Box>
      <Grid columns={2}>
        <Grid.Col span={1}>
          <Box>
            <Text>Door name</Text>
            <TextInput />
          </Box>
        </Grid.Col>
        <Grid.Col span={1}>
          <Box>
            <Text>Passcode</Text>
            <TextInput />
          </Box>
        </Grid.Col>
        <Grid.Col span={1}>
          <Box>
            <Text>Autolock Interval</Text>
            <NumberInput />
          </Box>
        </Grid.Col>
        <Grid.Col span={1}>
          <Box>
            <Text>Interact Distance</Text>
            <NumberInput />
          </Box>
        </Grid.Col>
        <Grid.Col span={2}>
          <Box>
            <Text>Door Rate</Text>
            <NumberInput />
          </Box>
        </Grid.Col>
      </Grid>

      <SimpleGrid cols={2} pt={16}>
        <Switch label="Locked" />
        <Switch label="Double" />
        <Switch label="Automatic" />
        <Switch label="Lockpick" />
        <Switch label="Hide UI" />
      </SimpleGrid>
    </Box>
  );
};

export default General;

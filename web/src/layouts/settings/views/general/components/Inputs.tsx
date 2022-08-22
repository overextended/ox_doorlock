import { Grid } from '@mantine/core';
import Input from './Input';
import { useStore, useSetters } from '../../../../../store';

const Inputs: React.FC = () => {
  //   const [doorName, passcode, autolockInterval, interactDistance, doorRate] = useStore((state) => [
  //     state.doorName,
  //     state.passcode,
  //     state.autolockInterval,
  //     state.interactDistance,
  //     state.doorRate,
  //   ]);
  const doorName = useStore((state) => state.name);
  const passcode = useStore((state) => state.passcode);
  const autolockInterval = useStore((state) => state.autolock);
  const interactDistance = useStore((state) => state.maxDistance);
  const doorRate = useStore((state) => state.doorRate);

  //   const [setDoorName, setPasscode, setAutolockInterval, setInteractDistance, setDoorRate] = useSetters((setter) => [
  //     setter.setDoorName,
  //     setter.setPasscode,
  //     setter.setAutolockInterval,
  //     setter.setInteractDistance,
  //     setter.setDoorRate,
  //   ]);

  const setDoorName = useSetters((setter) => setter.setName);
  const setPasscode = useSetters((setter) => setter.setPasscode);
  const setAutolockInterval = useSetters((setter) => setter.setAutolock);
  const setInteractDistance = useSetters((setter) => setter.setMaxDistance);
  const setDoorRate = useSetters((setter) => setter.setDoorRate);

  return (
    <>
      <Grid columns={2} sx={{ fontSize: 16 }}>
        <Input label="Door name" type="text" value={doorName || ''} setValue={(value: string) => setDoorName(value)} />
        <Input label="Passcode" type="text" value={passcode || ''} setValue={(value: string) => setPasscode(value)} />
        <Input
          label="Autolock Interval"
          type="number"
          value={autolockInterval || 0}
          setValue={(value: number) => setAutolockInterval(value)}
          infoCircle="Time in seconds after which the door will be locked"
        />
        <Input
          label="Interact Distance"
          type="number"
          value={interactDistance || 0}
          setValue={(value: number) => setInteractDistance(value)}
          infoCircle="Controls the distance from which the player can interact with the door"
        />
        <Input
          label="Door Rate"
          type="number"
          span={2}
          value={doorRate || 0}
          setValue={(value: number) => setDoorRate(value)}
          infoCircle="Speed the automatic door will move at"
        />
      </Grid>
    </>
  );
};

export default Inputs;

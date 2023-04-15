import { Grid } from '@mantine/core';
import Input from './Input';
import { useStore, useSetters } from '../../../../../store';
import { Locale } from '../../../../../store/locale';

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
        <Input label={Locale.ui_door_name} type="text" value={doorName || ''} setValue={(value: string) => setDoorName(value)} />
        <Input label={Locale.ui_passcode} type="text" value={passcode || ''} setValue={(value: string) => setPasscode(value)} />
        <Input
          label={Locale.ui_autolock_interval}
          type="number"
          value={autolockInterval || 0}
          setValue={(value: number) => setAutolockInterval(value)}
          infoCircle={Locale.ui_autolock_interval_info}
        />
        <Input
          label={Locale.ui_interact_distance}
          type="number"
          value={interactDistance || 0}
          setValue={(value: number) => setInteractDistance(value)}
          infoCircle={Locale.ui_interact_distance_info}
        />
        <Input
          label={Locale.ui_door_rate}
          type="number"
          span={2}
          value={doorRate || 0}
          setValue={(value: number) => setDoorRate(value)}
          infoCircle={Locale.ui_door_rate_info}
        />
      </Grid>
    </>
  );
};

export default Inputs;

import { Grid } from '@mantine/core';
import { useMemo, useState } from 'react';
import { useSetters, useStore } from '../../../../../store';
import { useDoors } from '../../../../../store/doors';
import Input from './Input';
import Select from './Select';

const Inputs: React.FC = () => {
  const allDoors = useDoors((state) => state.doors);

  const existingCategories = useMemo(() => {
    const categories = allDoors.map((door) => door.category);
    categories.unshift('Uncategorized'); // add to start
    return Array.from(new Set(categories));
  }, [allDoors]);

  const [selectableCategories, setSelectableCategories] = useState(existingCategories);

  const doorName = useStore((state) => state.name);
  const category = useStore((state) => state.category);
  const passcode = useStore((state) => state.passcode);
  const autolockInterval = useStore((state) => state.autolock);
  const interactDistance = useStore((state) => state.maxDistance);
  const doorRate = useStore((state) => state.doorRate);

  const setDoorName = useSetters((setter) => setter.setName);
  const setDoorCategory = useSetters((setter) => setter.setCategory);
  const setPasscode = useSetters((setter) => setter.setPasscode);
  const setAutolockInterval = useSetters((setter) => setter.setAutolock);
  const setInteractDistance = useSetters((setter) => setter.setMaxDistance);
  const setDoorRate = useSetters((setter) => setter.setDoorRate);

  return (
    <>
      <Grid columns={2} sx={{ fontSize: 16 }}>
        <Input label="Door name" type="text" value={doorName || ''} setValue={(value: string) => setDoorName(value)} />
        <Input label="Passcode" type="text" value={passcode || ''} setValue={(value: string) => setPasscode(value)} />
        <Select
          options={selectableCategories.map((category) => ({ value: category, label: category }))}
          label='Category'
          creatable
          value={category || 'Uncategorized'}
          setValue={(value: string) => setDoorCategory(value)}
          infoCircle="Category the door belongs to (for organization)"
          onCreate={(value: string) => {
            setSelectableCategories((categories) => {
              const newCategories = [...categories, value];
              return newCategories;
            });
            return value;
          }}
        />
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
          value={doorRate || 0}
          setValue={(value: number) => setDoorRate(value)}
          infoCircle="Speed the automatic door will move at"
        />
      </Grid>
    </>
  );
};

export default Inputs;

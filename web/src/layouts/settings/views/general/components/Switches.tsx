import { SimpleGrid } from '@mantine/core';
import { useSetters, useStore } from '../../../../../store';
import TooltipSwitch from './TooltipSwitch';

const Switches: React.FC = () => {
  // const checkboxes = useStore((state) => {locked: state.state,});
  const locked = useStore((state) => state.state);
  const double = useStore((state) => state.doors);
  const automatic = useStore((state) => state.auto);
  const lockpick = useStore((state) => state.lockpick);
  const hideUi = useStore((state) => state.hideUi);

  const toggleCheckbox = useSetters((setter) => setter.toggleCheckbox);

  return (
    <>
      <SimpleGrid cols={2} pt={16}>
        <TooltipSwitch
          label="Locked"
          infoCircle="Sets whether the targeting door is locked by default"
          value={locked || false}
          toggle={() => toggleCheckbox('state')}
        />
        <TooltipSwitch
          label="Double"
          infoCircle="Enable if the targeting door is a double door"
          value={double || false}
          toggle={() => toggleCheckbox('doors')}
        />
        <TooltipSwitch
          label="Automatic"
          infoCircle="Enable if the targeting door is moving automatically (Garage, poles, etc...)"
          value={automatic || false}
          toggle={() => toggleCheckbox('auto')}
        />
        <TooltipSwitch
          label="Lockpick"
          infoCircle="Enables the targeting door to be lockpicked"
          value={lockpick || false}
          toggle={() => toggleCheckbox('lockpick')}
        />
        <TooltipSwitch
          label="Hide UI"
          infoCircle="Hides UI indicators for the targeting door"
          value={hideUi || false}
          toggle={() => toggleCheckbox('hideUi')}
        />
      </SimpleGrid>
    </>
  );
};

export default Switches;

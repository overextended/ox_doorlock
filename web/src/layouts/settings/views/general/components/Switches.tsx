import { SimpleGrid } from '@mantine/core';
import { useSetters, useStore } from '../../../../../store';
import TooltipSwitch from './TooltipSwitch';

const Switches: React.FC = () => {
  const checkboxes = useStore((state) => state.checkboxes);

  const toggleCheckbox = useSetters((setter) => setter.toggleCheckbox);

  return (
    <>
      <SimpleGrid cols={2} pt={16}>
        <TooltipSwitch
          label="Locked"
          infoCircle="Sets whether the targeting door is locked by default"
          value={checkboxes.locked}
          toggle={() => toggleCheckbox('locked')}
        />
        <TooltipSwitch
          label="Double"
          infoCircle="Enable if the targeting door is a double door"
          value={checkboxes.double}
          toggle={() => toggleCheckbox('double')}
        />
        <TooltipSwitch
          label="Automatic"
          infoCircle="Enable if the targeting door is moving automatically (Garage, poles, etc...)"
          value={checkboxes.automatic}
          toggle={() => toggleCheckbox('automatic')}
        />
        <TooltipSwitch
          label="Lockpick"
          infoCircle="Enables the targeting door to be lockpicked"
          value={checkboxes.lockpick}
          toggle={() => toggleCheckbox('lockpick')}
        />
        <TooltipSwitch
          label="Hide UI"
          infoCircle="Hides UI indicators for the targeting door"
          value={checkboxes.hideUi}
          toggle={() => toggleCheckbox('hideUi')}
        />
      </SimpleGrid>
    </>
  );
};

export default Switches;

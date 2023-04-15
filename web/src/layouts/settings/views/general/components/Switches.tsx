import { SimpleGrid } from '@mantine/core';
import { useSetters, useStore } from '../../../../../store';
import TooltipSwitch from './TooltipSwitch';
import { Locale } from '../../../../../store/locale';

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
          label={Locale.ui_locked}
          infoCircle={Locale.ui_locked_info}
          value={locked || false}
          toggle={() => toggleCheckbox('state')}
        />
        <TooltipSwitch
          label={Locale.ui_double}
          infoCircle={Locale.ui_double_info}
          value={double || false}
          toggle={() => toggleCheckbox('doors')}
        />
        <TooltipSwitch
          label={Locale.ui_dutomatic}
          infoCircle={Locale.ui_dutomatic_info}
          value={automatic || false}
          toggle={() => toggleCheckbox('auto')}
        />
        <TooltipSwitch
          label={Locale.ui_lockpick}
          infoCircle={Locale.ui_lockpick_info}
          value={lockpick || false}
          toggle={() => toggleCheckbox('lockpick')}
        />
        <TooltipSwitch
          label={Locale.ui_hide_ui}
          infoCircle={Locale.ui_hide_ui_info}
          value={hideUi || false}
          toggle={() => toggleCheckbox('hideUi')}
        />
      </SimpleGrid>
    </>
  );
};

export default Switches;

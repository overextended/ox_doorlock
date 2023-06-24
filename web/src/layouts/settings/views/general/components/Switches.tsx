import { SimpleGrid } from '@mantine/core';
import { useSetters, useStore } from '../../../../../store';
import TooltipSwitch from './TooltipSwitch';
import { useLocales } from '../../../../../providers/LocaleProvider';

const Switches: React.FC = () => {
  // const checkboxes = useStore((state) => {locked: state.state,});
  const locked = useStore((state) => state.state);
  const double = useStore((state) => state.doors);
  const automatic = useStore((state) => state.auto);
  const lockpick = useStore((state) => state.lockpick);
  const hideUi = useStore((state) => state.hideUi);
  const holdOpen = useStore((state) => state.holdOpen);
  const { locale } = useLocales();

  const toggleCheckbox = useSetters((setter) => setter.toggleCheckbox);

  return (
    <>
      <SimpleGrid cols={2} pt={16}>
        <TooltipSwitch
          label={locale.ui.locked}
          infoCircle={locale.ui.locked_info}
          value={locked || false}
          toggle={() => toggleCheckbox('state')}
        />
        <TooltipSwitch
          label={locale.ui.double}
          infoCircle={locale.ui.double_info}
          value={double || false}
          toggle={() => toggleCheckbox('doors')}
        />
        <TooltipSwitch
          label={locale.ui.dutomatic}
          infoCircle={locale.ui.dutomatic_info}
          value={automatic || false}
          toggle={() => toggleCheckbox('auto')}
        />
        <TooltipSwitch
          label={locale.ui.lockpick}
          infoCircle={locale.ui.lockpick_info}
          value={lockpick || false}
          toggle={() => toggleCheckbox('lockpick')}
        />
        <TooltipSwitch
          label={locale.ui.hide_ui}
          infoCircle={locale.ui.hide_ui_info}
          value={holdOpen || false}
          toggle={() => toggleCheckbox('holdOpen')}
        />
      </SimpleGrid>
    </>
  );
};

export default Switches;

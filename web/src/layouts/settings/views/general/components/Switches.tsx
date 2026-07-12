import { SimpleGrid } from '@mantine/core';
import { useSetters, useStore } from '../../../../../store';
import TooltipSwitch from './TooltipSwitch';
import { t } from '../../../../../utils/t';

const Switches: React.FC = () => {
  // const checkboxes = useStore((state) => {locked: state.state,});
  const locked = useStore((state) => state.state);
  const double = useStore((state) => state.doors);
  const automatic = useStore((state) => state.auto);
  const lockpick = useStore((state) => state.lockpick);
  const hideUi = useStore((state) => state.hideUi);
  const holdOpen = useStore((state) => state.holdOpen);

  const toggleCheckbox = useSetters((setter) => setter.toggleCheckbox);

  return (
    <>
      <SimpleGrid cols={2} pt={16}>
        <TooltipSwitch
          label={t('ui_locked')}
          infoCircle={t('ui_locked_desc')}
          value={locked || false}
          toggle={() => toggleCheckbox('state')}
        />
        <TooltipSwitch
          label={t('ui_double')}
          infoCircle={t('ui_double_desc')}
          value={double || false}
          toggle={() => toggleCheckbox('doors')}
        />
        <TooltipSwitch
          label={t('ui_automatic')}
          infoCircle={t('ui_automatic_desc')}
          value={automatic || false}
          toggle={() => toggleCheckbox('auto')}
        />
        <TooltipSwitch
          label={t('ui_lockpick_switch')}
          infoCircle={t('ui_lockpick_switch_desc')}
          value={lockpick || false}
          toggle={() => toggleCheckbox('lockpick')}
        />
        <TooltipSwitch
          label={t('ui_hide_ui')}
          infoCircle={t('ui_hide_ui_desc')}
          value={hideUi || false}
          toggle={() => toggleCheckbox('hideUi')}
        />
        <TooltipSwitch
          label={t('ui_hold_open')}
          infoCircle={t('ui_hold_open_desc')}
          value={holdOpen || false}
          toggle={() => toggleCheckbox('holdOpen')}
        />
      </SimpleGrid>
    </>
  );
};

export default Switches;

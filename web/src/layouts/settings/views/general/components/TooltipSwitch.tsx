import { Group, Tooltip, Switch, Box } from '@mantine/core';
import { BsQuestionCircle } from 'react-icons/bs';

interface Props {
  label: string;
  infoCircle?: string;
}

const TooltipSwitch: React.FC<Props> = ({ infoCircle, label }) => {
  return (
    <Group spacing={8}>
      <Switch label={label} />
      <Tooltip label={infoCircle} withArrow arrowSize={10} multiline width={200}>
        <Box>
          <BsQuestionCircle size={16} />
        </Box>
      </Tooltip>
    </Group>
  );
};

export default TooltipSwitch;

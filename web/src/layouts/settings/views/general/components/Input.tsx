import { Box, Grid, Tooltip, TextInput, Text, NumberInput, ThemeIcon } from '@mantine/core';
import { InfoCircle } from 'tabler-icons-react';

interface Props {
  label: string;
  type: 'text' | 'number';
  infoCircle?: string;
  span?: number;
}

const Input: React.FC<Props> = ({ label, type, infoCircle, span }) => {
  return (
    <Grid.Col span={span || 1}>
      <Box>
        {type === 'text' ? (
          <TextInput
            label={label}
            rightSection={
              infoCircle && (
                <Tooltip label={infoCircle}>
                  <ThemeIcon variant="light">
                    <InfoCircle size={18} />
                  </ThemeIcon>
                </Tooltip>
              )
            }
          />
        ) : (
          <NumberInput
            label={label}
            step={0.1}
            precision={1}
            hideControls
            rightSection={
              infoCircle && (
                <Tooltip label={infoCircle} withArrow arrowSize={10} multiline width={200}>
                  <ThemeIcon variant="light" mr={10}>
                    <InfoCircle size={18} />
                  </ThemeIcon>
                </Tooltip>
              )
            }
          />
        )}
      </Box>
    </Grid.Col>
  );
};

export default Input;

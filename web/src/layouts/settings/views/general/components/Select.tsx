import { Box, Grid, Select as SelectInput, ThemeIcon, Tooltip } from '@mantine/core';

import { BsQuestionCircle } from 'react-icons/bs';

interface Props {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  creatable?: boolean
  setValue: (value: any) => void;
  onCreate?: (value: string) => string;
  infoCircle?: string;
  span?: number;
}

const Select: React.FC<Props> = ({ label, infoCircle, span, options, creatable = false, value, setValue, onCreate }) => {
  return (
    <Grid.Col span={span || 1}>
      <Box>
        <SelectInput
          data={options}
          value={value}
          onChange={(value) => setValue(value)}
          label={label}
          searchable
          nothingFound="No results found"
          creatable={creatable}
          getCreateLabel={(value) => `+ Add "${value}"`}
          onCreate={onCreate}
          rightSection={
            infoCircle && (
              <Tooltip label={infoCircle} withArrow arrowSize={10} multiline width={200}>
                <ThemeIcon variant="light" mr={10}>
                  <BsQuestionCircle size={18} />
                </ThemeIcon>
              </Tooltip>
            )
          }
        />
      </Box>
    </Grid.Col>
  );
};

export default Select;

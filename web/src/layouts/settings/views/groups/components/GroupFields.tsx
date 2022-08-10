import { Group, Input, NumberInput } from '@mantine/core';
import { useStore, useSetters } from '../../../../../store';

const GroupFields: React.FC = () => {
  const groupFields = useStore((state) => state.groupFields);
  const setGroupFields = useSetters((setter) => setter.setGroupFields);

  const handleChange = (value: string | number | undefined, index: number, property: 'name' | 'grade') => {
    setGroupFields((prevState) => {
      return prevState.map((item, indx) => (index === indx ? { ...item, [property]: value } : item));
    });
  };

  return (
    <>
      {groupFields.map((field, index) => (
        <Group p={8} position="center" key={`group-${index}`} noWrap>
          <Input
            sx={{ width: '100%' }}
            placeholder="Group"
            value={field.name as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, index, 'name')}
          />
          <NumberInput
            sx={{ width: '100%' }}
            placeholder="Grade"
            value={field.grade as number}
            onChange={(e) => handleChange(e, index, 'grade')}
          />
        </Group>
      ))}
    </>
  );
};

export default GroupFields;

import { DoorColumn } from '../store/doors';
import { StoreState } from '../store';

// Converts groups data into array format
export const convertData = (data: DoorColumn) => {
  let newGroupsData: { name: string; grade: number }[] = [];
  if (data.groups) {
    const doorGroupsData = Object.entries(data.groups);
    for (let i = 0; i < doorGroupsData.length; i++) {
      const groupObj = doorGroupsData[i];
      newGroupsData[i] = { name: groupObj[0], grade: groupObj[1] };
    }
  }
  return {
    ...data,
    characters: data.characters || [''],
    groups: [...newGroupsData],
    items: data.items || [{ name: '', metadata: '', remove: false }],
    lockpickDifficulty: data.lockpickDifficulty || [''],
  } as StoreState;
};

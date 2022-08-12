import { DoorColumn } from '../store/doors';
import { StoreState } from '../store';

// Converts groups data into array format
export const convertData = (data: DoorColumn) => {
  const doorGroupsData = Object.entries(data.groups);
  let newGroupsData: { name: string; grade: number }[] = [];
  for (let i = 0; i < doorGroupsData.length; i++) {
    const groupObj = doorGroupsData[i];
    newGroupsData[i] = { name: groupObj[0], grade: groupObj[1] };
  }
  return { ...data, groups: [...newGroupsData] } as StoreState;
};

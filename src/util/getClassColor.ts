import { classColors } from "../const/color";

export const getClassColor = (classId: number): string => {
  return classColors[(classId - 1) % classColors.length];
};

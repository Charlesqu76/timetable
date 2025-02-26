export const getClassName = (sectionId: string, classesData: any): string => {
  for (const classItem of classesData) {
    const section = classItem.sections.find((s) => s.id === sectionId);
    if (section) return classItem.name;
  }
  return "";
};

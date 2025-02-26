// Function to check if two time periods overlap
export const timeOverlap = (
  start1: string,
  duration1: number,
  start2: string,
  duration2: number
): boolean => {
  // Convert times to minutes for easier comparison
  const toMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const s1 = toMinutes(start1);
  const e1 = s1 + duration1;
  const s2 = toMinutes(start2);
  const e2 = s2 + duration2;

  // Check for overlap
  return s1 < e2 && e1 > s2;
};

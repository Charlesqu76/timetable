import { calculateEndTime } from "@/util/calculateEndTime";

const timeSlots: string[] = [];
for (let i = 8; i < 24; i++) {
  timeSlots.push(`${i.toString().padStart(2, "0")}:00`);
  timeSlots.push(`${i.toString().padStart(2, "0")}:30`);
}
export default timeSlots;

const getPositionStyle = (
  startTime: string,
  duration: number
): React.CSSProperties => {
  const endTime = calculateEndTime(startTime, duration);
  const start = timeSlots.indexOf(startTime);
  const end = timeSlots.indexOf(endTime);
  const height = (end - start) * 30; // 30px height per time slot
  return {
    top: `${start * 30}px`,
    height: `${height}px`,
  };
};

export { getPositionStyle };

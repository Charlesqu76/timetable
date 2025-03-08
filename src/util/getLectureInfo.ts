import { calculateEndTime } from "./calculateEndTime";

type LectureInfo = {
  courseName: string;
  type: string;
  subjectCode: string;
  activityGroupCode: string;
  activityCode: string;
  startTime: string;
  duration: string;
  day: string;
  index?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LectureData = Record<string, any>;

export function getLectureInfo(data: LectureData): LectureInfo[] {
  return Object.values(data).map((entry) => {
    const {
      subject_code,
      activity_group_code,
      activity_code,
      start_time,
      duration,
      day_of_week,
    } = entry;
    const courseName = subject_code.split("-")[0];

    return {
      courseName,
      code: courseName + activity_group_code + activity_code,
      type: activity_group_code,
      subjectCode: courseName,
      activityGroupCode: activity_group_code,
      activityCode: activity_code,
      startTime: start_time,
      duration: duration,
      endTime: calculateEndTime(start_time, duration),
      day: day_of_week,
    };
  });
}

type LectureInfo = {
  type: string;
  subjectCode: string;
  activityGroupCode: string;
  activityCode: string;
  startTime: string;
  duration: string;
};

type LectureData = Record<string, any>;




export function getLectureInfo(data: LectureData): LectureInfo[] {
  return Object.values(data).map((entry) => ({
    type: entry.description,
    subjectCode: entry.subject_code,
    activityGroupCode: entry.activity_group_code,
    activityCode: entry.activity_code,
    startTime: entry.start_time,
    duration: entry.duration,
  }));
}

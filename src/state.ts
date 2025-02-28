import { create } from "zustand";
import { loadDataList } from "./util/loadData";
import { getLectureInfo } from "./util/getLectureInfo";

export interface ICourseDeatils {
  code: string;
  type: string;
  subjectCode: string;
  activityGroupCode: string;
  activityCode: string;
  startTime: string;
  duration: number;
  endTime: string;
  day: string;
}

export interface ICourse {
  Lecture?: ICourseDeatils[];
  Tutorial?: ICourseDeatils[];
}

interface storeState {
  courses: ICourse;
  selectedSections: ICourseDeatils[];
  conflicts: ICourseDeatils[];
  getCourses: () => void;
  clearSelections: () => void;
  toggleSectionSelection: (section: ICourseDeatils) => void;
  hasConflict: (sectionId: string) => boolean;
}

export const useStore = create<storeState>((set, get) => ({
  courses: {},
  selectedSections: [],
  conflicts: [],
  clearSelections: () => set({ selectedSections: [] }),
  toggleSectionSelection: (section: ICourseDeatils) => {
    const selectedSections = get().selectedSections;
    const sectionIndex = selectedSections.findIndex(
      (s) => s.code === section.code
    );

    if (sectionIndex >= 0) {
      set({
        selectedSections: selectedSections.filter(
          (s) => s.code !== section.code
        ),
      });
      return;
    }

    // deal with conflict within the same section;
    const selectedInSameSection = selectedSections.filter(
      (s) =>
        s.subjectCode === section.subjectCode &&
        s.activityGroupCode === section.activityGroupCode
    )[0];

    set({
      selectedSections: [
        ...selectedSections.filter(
          (s) => s.code !== selectedInSameSection?.code
        ),
        { ...section },
      ],
    });

    // check conflict with other sections
  },
  hasConflict: (code: string): boolean => {
    const conflicts = get().conflicts;
    return conflicts.some((conflict) => conflict.code === code);
  },
  getCourses: async () => {
    const data = await loadDataList();
    const d = data.map((item) => getLectureInfo(item));
    const dCombined = d.reduce((acc, cur) => [...acc, ...cur], []);
    const combined = dCombined.reduce((acc, cur) => {
      const { courseName, activityGroupCode } = cur;

      if (acc[courseName]) {
        if (acc[courseName][activityGroupCode]) {
          acc[courseName][activityGroupCode].push(cur);
        } else {
          acc[courseName][activityGroupCode] = [cur];
        }
      } else {
        acc[courseName] = {
          [activityGroupCode]: [cur],
        };
      }
      return acc;
    }, {});
    set({
      courses: combined,
    });
  },
}));

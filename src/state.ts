import { create } from "zustand";
import { loadDataList } from "./util/loadData";
import { getLectureInfo } from "./util/getLectureInfo";

export interface ICourseDeatils {
  index?: number;
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
  [type: string]: ICourseDeatils[];
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

    // cancel selecting
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

    const res = selectedSections.filter(
      (s) => s.code !== selectedInSameSection?.code
    );

    set({
      selectedSections: [...res, section],
    });
  },

  hasConflict: (code: string): boolean => {
    const conflicts = get().conflicts;
    return conflicts.some((conflict) => conflict.code === code);
  },

  getCourses: async () => {
    const data = await loadDataList();
    const d = data.map((item) => getLectureInfo(item));
    const dCombined = d.reduce((acc, cur) => [...acc, ...cur], []);
    let index = 0;
    const combined = dCombined.reduce((acc, cur) => {
      const { courseName, activityGroupCode } = cur;

      if (acc[courseName]) {
        if (acc[courseName][activityGroupCode]) {
          acc[courseName][activityGroupCode].push(cur);
          cur.index = acc[courseName][activityGroupCode][0].index;
        } else {
          cur.index = index;
          index += 1;
          acc[courseName][activityGroupCode] = [cur];
        }
      } else {
        cur.index = index;
        index += 1;
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

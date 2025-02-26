import { create } from "zustand";
interface ClassSection {
  id: string;
  day: string;
  startTime: string;
  duration: number; // Duration in minutes instead of endTime
  room: string;
  instructor: string;
  classId?: number; // Added when selected
}

interface ClassData {
  id: number;
  name: string;
  sections: ClassSection[];
}

export const classesData: ClassData[] = [
  {
    id: 1,
    name: "Introduction to Computer Science",
    sections: [
      {
        id: "CS101-A",
        day: "Monday",
        startTime: "09:00",
        duration: 90, // 90 minutes instead of endTime: "10:30"
        room: "Tech-201",
        instructor: "Dr. Smith",
      },
      {
        id: "CS101-B",
        day: "Wednesday",
        startTime: "13:00",
        duration: 90, // 90 minutes instead of endTime: "14:30"
        room: "Tech-201",
        instructor: "Dr. Smith",
      },
      {
        id: "CS101-C",
        day: "Thursday",
        startTime: "15:00",
        duration: 90, // 90 minutes instead of endTime: "16:30"
        room: "Tech-205",
        instructor: "Dr. Johnson",
      },
    ],
  },
  {
    id: 2,
    name: "Calculus I",
    sections: [
      {
        id: "MATH101-A",
        day: "Monday",
        startTime: "11:00",
        duration: 90, // 90 minutes instead of endTime: "12:30"
        room: "Math-101",
        instructor: "Dr. Williams",
      },
      {
        id: "MATH101-B",
        day: "Tuesday",
        startTime: "09:00",
        duration: 90, // 90 minutes instead of endTime: "10:30"
        room: "Math-101",
        instructor: "Dr. Williams",
      },
      {
        id: "MATH101-C",
        day: "Friday",
        startTime: "14:00",
        duration: 90, // 90 minutes instead of endTime: "15:30"
        room: "Math-103",
        instructor: "Dr. Brown",
      },
    ],
  },
  {
    id: 3,
    name: "Introduction to Psychology",
    sections: [
      {
        id: "PSYCH101-A",
        day: "Tuesday",
        startTime: "13:00",
        duration: 90, // 90 minutes instead of endTime: "14:30"
        room: "Psych-201",
        instructor: "Dr. Garcia",
      },
      {
        id: "PSYCH101-B",
        day: "Thursday",
        startTime: "09:00",
        duration: 90, // 90 minutes instead of endTime: "10:30"
        room: "Psych-201",
        instructor: "Dr. Garcia",
      },
    ],
  },
  {
    id: 4,
    name: "World History",
    sections: [
      {
        id: "HIST101-A",
        day: "Wednesday",
        startTime: "09:00",
        duration: 90, // 90 minutes instead of endTime: "10:30"
        room: "History-101",
        instructor: "Dr. Wilson",
      },
      {
        id: "HIST101-B",
        day: "Friday",
        startTime: "11:00",
        duration: 90, // 90 minutes instead of endTime: "12:30"
        room: "History-101",
        instructor: "Dr. Wilson",
      },
    ],
  },
  {
    id: 5,
    name: "English Composition",
    sections: [
      {
        id: "ENG101-A",
        day: "Monday",
        startTime: "09:00",
        duration: 90, // 90 minutes instead of endTime: "10:30"
        room: "Arts-201",
        instructor: "Prof. Taylor",
      },
      {
        id: "ENG101-B",
        day: "Wednesday",
        startTime: "11:00",
        duration: 90, // 90 minutes instead of endTime: "12:30"
        room: "Arts-201",
        instructor: "Prof. Taylor",
      },
    ],
  },
];

interface storeState {
  selectedSections: ClassSection[];
  conflicts: ClassSection[];
  clearSelections: () => void;
  toggleSectionSelection: (section: ClassSection, classId: number) => void;
  setConflicts: (newConflicts: ClassSection[]) => void;
  hasConflict: (sectionId: string) => boolean;
}

export const useStore = create<storeState>((set, get) => ({
  selectedSections: [],
  conflicts: [],
  clearSelections: () => set({ selectedSections: [] }),
  toggleSectionSelection: (section: ClassSection, classId: number) => {
    // Check if this section is already selected
    const selectedSections = get().selectedSections;
    const sectionIndex = selectedSections.findIndex((s) => s.id === section.id);

    if (sectionIndex >= 0) {
      // If already selected, remove it
      set({
        selectedSections: selectedSections.filter((s) => s.id !== section.id),
      });
    } else {
      set({
        selectedSections: [...selectedSections, { ...section, classId }],
      });
    }
  },
  setConflicts: (newConflicts) => {
    set({ conflicts: newConflicts });
  },
  // Check if a section has conflicts
  hasConflict: (sectionId: string): boolean => {
    const conflicts = get().conflicts;
    return conflicts.some((conflict) =>
      conflict.sections.some((section) => section.id === sectionId)
    );
  },
}));

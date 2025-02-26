import { useEffect } from "react";
import { timeOverlap } from "./util/timeOverlap";
import { useStore } from "./state";
import Sections from "./components/Section";
import Timetable from "./components/Timetable";
function App() {
  const selectedSections = useStore((state) => state.selectedSections);
  const setConflicts = useStore((state) => state.setConflicts);
  useEffect(() => {
    const newConflicts: any[] = [];

    // Check each pair of sections for conflicts
    for (let i = 0; i < selectedSections.length; i++) {
      for (let j = i + 1; j < selectedSections.length; j++) {
        const section1 = selectedSections[i];
        const section2 = selectedSections[j];

        if (
          section1.day === section2.day &&
          timeOverlap(
            section1.startTime,
            section1.duration,
            section2.startTime,
            section2.duration
          )
        ) {
          newConflicts.push({
            id: `${section1.id}-${section2.id}`,
            sections: [section1, section2],
          });
        }
      }
    }

    setConflicts(newConflicts);
  }, [selectedSections, setConflicts]);
  return (
    <div className="mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <Sections />
        <Timetable />
        {/* <SelectedSections /> */}
      </div>
    </div>
  );
}

export default App;

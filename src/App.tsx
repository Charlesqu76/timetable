import { useEffect } from "react";
import { useStore } from "./state";
import Sections from "./components/Section";
import Timetable from "./components/Timetable";
function App() {
  const getCourses = useStore((state) => state.getCourses);
  useEffect(() => {
    getCourses();
  });
  return (
    <div className="mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <Sections />
        <Timetable />
      </div>
    </div>
  );
}

export default App;

import { classesData, useStore } from "../state";
import { calculateEndTime } from "../util/calculateEndTime";
import { getClassColor } from "../util/getClassColor";

export default function SelectedSections() {
  const selectedSections = useStore((state) => state.selectedSections);
  const hasConflict = useStore((state) => state.hasConflict);
  if (selectedSections.length <= 0) return null;

  <div className="mt-6">
    <h2 className="text-lg font-semibold mb-2">Selected Classes</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {selectedSections.map((section) => {
        const parentClass = classesData.find((c) =>
          c.sections.some((s) => s.id === section.id)
        );
        const sectionHasConflict = hasConflict(section.id);
        const endTime = calculateEndTime(section.startTime, section.duration);

        return (
          <div
            key={section.id}
            className={`p-3 rounded ${
              sectionHasConflict
                ? "bg-red-100 border border-red-400"
                : section.classId
                ? getClassColor(section.classId)
                : ""
            }`}
          >
            <h3 className="font-medium">{parentClass?.name}</h3>
            <p className="text-sm font-medium">{section.id}</p>
            <p className="text-sm">
              {section.day}: {section.startTime}-{endTime}
            </p>
            <p className="text-sm">Room: {section.room}</p>
            <p className="text-sm">Instructor: {section.instructor}</p>
            {sectionHasConflict && (
              <p className="mt-1 text-sm font-medium text-red-600">
                ⚠️ Time conflict with another class
              </p>
            )}
          </div>
        );
      })}
    </div>
  </div>;
}

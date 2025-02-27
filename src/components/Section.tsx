import { classesData, useStore } from "../state";
import { calculateEndTime } from "../util/calculateEndTime";
import { getClassColor } from "../util/getClassColor";

export default function Sections() {
  const selectedSections = useStore((state) => state.selectedSections);
  const clearSelections = useStore((state) => state.clearSelections);
  const toggleSectionSelection = useStore(
    (state) => state.toggleSectionSelection
  );
  const hasConflict = useStore((state) => state.hasConflict);

  return (
    <div className="w-full md:w-1/3 p-4 bg-gray-50 rounded shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Available Classes</h2>
        <button
          onClick={clearSelections}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {classesData.map((classItem) => (
          <div key={classItem.id} className="border-b pb-4">
            <h3 className="font-medium mb-2">{classItem.name}</h3>
            <div className="space-y-2">
              {classItem.sections.map((section) => {
                const isSelected = selectedSections.some(
                  (s) => s.id === section.id
                );
                const hasTimeConflict = isSelected && hasConflict(section.id);
                const endTime = calculateEndTime(
                  section.startTime,
                  section.duration
                );

                return (
                  <div
                    key={section.id}
                    className={`p-2 rounded cursor-pointer border transition-colors ${
                      isSelected
                        ? hasTimeConflict
                          ? "bg-red-100 border-red-400 border-2"
                          : getClassColor(classItem.id) + " border-2"
                        : "bg-white border-gray-200 hover:bg-gray-100"
                    }`}
                    onClick={() =>
                      toggleSectionSelection(section, classItem.id)
                    }
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{section.id}</span>
                      <span className="text-sm">{section.day}</span>
                    </div>
                    <div className="text-sm">
                      {section.startTime} - {endTime}
                    </div>

                    {hasTimeConflict && (
                      <div className="mt-1 text-xs font-medium text-red-600">
                        Time Conflict!
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

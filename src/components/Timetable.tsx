import React from "react";
import { days } from "../const/days";
import { calculateEndTime } from "../util/calculateEndTime";
import { useStore } from "../state";
import { getClassColor } from "../util/getClassColor";

export default function Timetable() {
  const selectedSections = useStore((state) => state.selectedSections);
  const hasConflict = useStore((state) => state.hasConflict);

  const timeSlots: string[] = [];
  for (let i = 8; i < 18; i++) {
    timeSlots.push(`${i.toString().padStart(2, "0")}:00`);
    timeSlots.push(`${i.toString().padStart(2, "0")}:30`);
  }

  // Calculate position for a class in the timetable
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

  return (
    <div className="w-full">
      <div className="overflow-x-auto bg-white rounded shadow-sm">
        <div className="">
          <div className="grid grid-cols-8 gap-2">
            <div className="font-semibold text-center p-2 bg-gray-100 rounded">
              Time
            </div>
            {days.map((day) => (
              <div
                key={day}
                className="font-semibold text-center p-2 bg-gray-100 rounded"
              >
                {day}
              </div>
            ))}
          </div>

          <div
            className="relative mt-2"
            style={{ height: `${timeSlots.length * 30}px` }}
          >
            {/* Time slots */}
            {timeSlots.map((time, index) => (
              <div
                key={time}
                className="absolute w-full h-8 border-t border-gray-200 flex items-center"
                style={{ top: `${index * 30}px` }}
              >
                <div className="w-1/6 text-xs text-gray-500">{time}</div>
              </div>
            ))}

            {/* Selected class sections */}
            {days.map((day, dayIndex) => (
              <React.Fragment key={day}>
                {selectedSections
                  .filter((section) => section.day === day)
                  .map((section) => {
                    const style = getPositionStyle(
                      section.startTime,
                      section.duration
                    );
                    const sectionHasConflict = hasConflict(section.id);
                    const endTime = calculateEndTime(
                      section.startTime,
                      section.duration
                    );

                    return (
                      <div
                        key={section.id}
                        className={`absolute rounded p-2 ${
                          sectionHasConflict
                            ? "bg-red-100 border border-red-400"
                            : section.classId
                            ? getClassColor(section.classId)
                            : ""
                        } shadow-sm overflow-hidden`}
                        style={{
                          ...style,
                          left: `${(dayIndex + 1) * (100 / 8)}%`,
                          width: `${100 / 8 - 1}%`,
                        }}
                      >
                        <div className="text-sm font-medium">{section.id}</div>
                        <div className="text-xs">
                          {section.startTime} - {endTime}
                        </div>
                        <div className="text-xs">Room: {section.room}</div>
                        {sectionHasConflict && (
                          <div className="absolute top-0 right-0 w-full h-full border-2 border-red-500 rounded pointer-events-none"></div>
                        )}
                      </div>
                    );
                  })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

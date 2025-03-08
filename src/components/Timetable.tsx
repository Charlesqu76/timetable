import React from "react";
import { DAYS } from "../const/days";
import { calculateEndTime } from "../util/calculateEndTime";
import { useStore } from "../state";
import timeSlots, { getPositionStyle, TIMESLOT_HEIGHT } from "@/const/timeslot";
import { groupSections } from "@/util/groupSection";
import { CLASS_COLORS } from "@/const/color";
import { cn } from "@/lib/utils";

export default function Timetable() {
  const selectedSections = useStore((state) => state.selectedSections);
  const hasConflict = useStore((state) => state.hasConflict);

  const groupSection = groupSections(selectedSections);
  return (
    <div className="w-full">
      <div className="overflow-x-auto bg-white rounded shadow-sm">
        <div className="">
          <div className=" relative w-full">
            {new Array(8).fill(0).map((_, index) => (
              <div
                key={index}
                className="absolute h-screen top-0 w-0.5 bg-gray-200"
                style={{ left: `${(index + 1) * (100 / 8)}%` }}
              ></div>
            ))}
          </div>
          <div className="grid grid-cols-8 gap-2">
            <div className="font-semibold text-center p-2 bg-gray-100 rounded">
              Time
            </div>

            {DAYS.map((day) => (
              <div
                key={day}
                className="font-semibold text-center p-2 bg-gray-100 rounded"
              >
                {day}
              </div>
            ))}
          </div>
          <div
            className="relative mt-2 border"
            style={{ height: `${timeSlots.length * TIMESLOT_HEIGHT}px` }}
          >
            {/* Time slots */}
            {timeSlots.map((time, index) => (
              <div
                key={time}
                className="absolute w-full h-8 border-t border-gray-200 flex items-center"
                style={{ top: `${index * TIMESLOT_HEIGHT}px` }}
              >
                <div className="w-1/8 text-xs text-gray-500">{time}</div>
              </div>
            ))}

            {/* Selected class sections */}
            {DAYS.map((day, dayIndex) => (
              <React.Fragment key={day}>
                {groupSection.map((sections) => {
                  const len = sections.length;
                  const normalSctionWidth = 100 / 8;
                  const sectionWidth = normalSctionWidth / len;
                  return sections
                    .filter((section) => section.day === day)
                    .map((section, index) => {
                      const left =
                        (dayIndex + 1) * normalSctionWidth +
                        index * sectionWidth +
                        0.5;
                      const color = CLASS_COLORS[section.index];

                      const width = sectionWidth - 1;
                      const style = getPositionStyle(
                        section.startTime,
                        section.duration
                      );
                      const sectionHasConflict = hasConflict(section.code);
                      const endTime = calculateEndTime(
                        section.startTime,
                        section.duration
                      );

                      return (
                        <div
                          key={section.code}
                          className={cn(
                            `absolute rounded p-2 shadow-sm overflow-hidden`,
                            color
                          )}
                          style={{
                            ...style,
                            left: `${left}%`,
                            width: `${width}%`,
                          }}
                        >
                          <div className="text-sm ">
                            <div className="space-x-1">
                              <span>{section.activityCode}</span>
                              <span>{section.subjectCode}</span>
                            </div>

                            <span>
                              {section.startTime} - {endTime}
                            </span>
                          </div>

                          {sectionHasConflict && (
                            <div className="absolute top-0 right-0 w-full h-full border-2 border-red-500 rounded pointer-events-none"></div>
                          )}
                        </div>
                      );
                    });
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

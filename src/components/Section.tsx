import { useStore } from "../state";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { cn } from "@/lib/utils";
import { CLASS_COLORS } from "@/const/color";

export default function Sections() {
  const selectedSections = useStore((state) => state.selectedSections);
  const clearSelections = useStore((state) => state.clearSelections);
  const courses = useStore((state) => state.courses);
  const toggleSectionSelection = useStore(
    (state) => state.toggleSectionSelection
  );
  const hasConflict = useStore((state) => state.hasConflict);
  return (
    <div className="w-full md:w-1/3 p-4 bg-gray-50 rounded shadow-sm h-screen overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Available Classes</h2>
        <Button onClick={clearSelections}>Clear All</Button>
      </div>

      <div className="space-y-6">
        {Object.entries(courses).map(([courseId, courseSections]) => (
          <div key={courseId} className="border-b">
            <Accordion type="multiple" className="">
              <AccordionItem value="courseId">
                <AccordionTrigger className="text-xl font-bold">
                  {courseId}
                </AccordionTrigger>
                <AccordionContent>
                  {Object.entries(courseSections).map(
                    ([activityType, sections]) => (
                      <div key={`${courseId}-${activityType}`} className="mb-3">
                        <h4 className="text-lg font-bold text-gray-600 mb-1">
                          {activityType}
                        </h4>
                        <div className="space-y-2">
                          {(sections as any[]).map((section) => {
                            const { code } = section;
                            const isSelected = selectedSections.some(
                              (s) => s.code === code
                            );
                            const hasTimeConflict =
                              isSelected && hasConflict(code);
                            const endTime = section.endTime;
                            const color = CLASS_COLORS[section.index];
                            return (
                              <div
                                key={code}
                                className={cn(
                                  "p-2 rounded bg-white  border cursor-pointer transition-colors",
                                  isSelected && color
                                )}
                                onClick={() => toggleSectionSelection(section)}
                              >
                                <div className="flex justify-between">
                                  <span className="text-sm">
                                    {section.activityCode}
                                  </span>
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
                    )
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}

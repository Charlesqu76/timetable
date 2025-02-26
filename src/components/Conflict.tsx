import { calculateEndTime } from "../util/calculateEndTime";

export default function Conflict({ conflicts }: any) {
  if (conflicts.length <= 0) return null;
  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
      <h2 className="text-lg font-semibold text-red-600 mb-2">
        Class Time Conflicts
      </h2>
      <ul className="list-disc pl-5 space-y-1">
        {conflicts.map((conflict) => {
          const endTime1 = calculateEndTime(
            conflict.sections[0].startTime,
            conflict.sections[0].duration
          );
          const endTime2 = calculateEndTime(
            conflict.sections[1].startTime,
            conflict.sections[1].duration
          );
          return (
            <li key={conflict.id} className="text-red-600">
              <span className="font-medium">{conflict.sections[0].id}</span> (
              {getClassName(conflict.sections[0].id)}) conflicts with
              <span className="font-medium"> {conflict.sections[1].id}</span> (
              {getClassName(conflict.sections[1].id)})
              <br />
              <span className="text-sm">
                Both on {conflict.sections[0].day} at{" "}
                {conflict.sections[0].startTime}-{endTime1} and{" "}
                {conflict.sections[1].startTime}-{endTime2}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// src/app/page.jsx

import { ClockIcon, ArrowPathIcon } from "@/components/heroicons";

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to ReflectYr</h1>
      <div className="flex gap-4 mt-4">
        <div className="flex items-center gap-2">
          {/* Clock Icon */}
          <ClockIcon className="w-8 h-8 text-blue-500" />
          <span>Time to Reflect</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Arrow Path Icon */}
          <ArrowPathIcon className="w-8 h-8 text-green-500" />
          <span>Refresh Your Year</span>
        </div>
      </div>
    </div>
  );
}

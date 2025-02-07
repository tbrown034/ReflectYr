"use client";

import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useYear } from "@/app/context/YearContext";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

const YearPicker = () => {
  const { selectedYear, setSelectedYear } = useYear();
  const currentYear = new Date().getFullYear();
  // Create a range from 2000 to currentYear, reversed so the latest years appear first
  const yearRange = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => 2000 + i
  ).reverse();

  const handleYearChange = (year) => {
    setSelectedYear(year);
    console.log("Year changed to:", year);
  };

  return (
    <div className="w-40">
      <Listbox value={selectedYear} onChange={handleYearChange}>
        <div className="relative">
          <Listbox.Button
            as="button"
            className="relative w-full py-2 pl-3 pr-10 text-sm font-medium text-left bg-gray-100 border border-gray-300 rounded-lg shadow-md cursor-default dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <span className="block truncate">{selectedYear}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronUpDownIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-lg shadow-lg max-h-60 dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {yearRange.map((year) => (
                <Listbox.Option
                  key={`year-${year}`}
                  value={year}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-amber-500 text-white"
                        : "text-gray-900 dark:text-gray-200"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {year}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default YearPicker;

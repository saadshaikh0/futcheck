import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function ComboBox({
  options = [],
  selectedValue,
  onChange,
  placeholder = "Select",
  queryKey = null,
  fetchQuery = null,
}) {
  const [query, setQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    setQuery(selectedValue?.name ?? "");
  }, [selectedValue]);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.name?.toLowerCase()?.includes(query.toLowerCase())
      )
    );
  }, [query, options]);

  return (
    <div className="">
      <Combobox value={selectedValue} onChange={onChange}>
        <div className="relative mt-1">
          <div className="relative w-full rounded-md cursor-default overflow-hidden  text-left shadow-md focus:outline-none sm:text-sm">
            <Combobox.Input
              style={{
                background:
                  "linear-gradient(180deg, rgba(62, 27, 112, 0.9) 0%, rgba(66, 19, 136, 0.9) 100%)",
              }}
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-white focus:ring-0"
              displayValue={(option) => option?.name ?? ""}
              placeholder={placeholder}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center text-white pr-2">
              <ChevronDownIcon className="h-6 w-6 text-white" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 z-20 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option.name}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

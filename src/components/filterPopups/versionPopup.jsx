import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/allPlayerSlice";

const people = [{ id: -1, name: "Select Rarity" }];

export default function VersionPopup() {
  const [query, setQuery] = useState("");
  const { app, allPlayers } = useSelector((state) => state);
  const { rarities } = app;
  const { filters } = allPlayers;
  const dispatch = useDispatch();
  return (
    <div className="">
      <Combobox
        value={filters?.rarity ?? people[0]}
        onChange={(val) => {
          dispatch(setFilters({ ...filters, rarity: val, page: 1 }));
        }}
      >
        <div className="relative mt-1 ">
          <div className="relative w-full rounded-md cursor-default overflow-hidden  bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 bg-slate-700 text-sm leading-5 text-white focus:ring-0"
              displayValue={(person) => {
                console.log(person);
                return person.name;
              }}
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
              {rarities.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                rarities
                  .filter((rarity) =>
                    rarity.name?.toLowerCase()?.includes(query.toLowerCase())
                  )
                  .map((rarity) => (
                    <Combobox.Option
                      key={rarity.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-teal-600 text-white" : "text-gray-900"
                        }`
                      }
                      value={rarity}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {rarity.name}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            ></span>
                          ) : null}
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

import React, { useEffect, useRef, useState } from "react";
import { debounce, useOutsideClick } from "../utils/utils";
import CustomPopover from "./CustomPopover";
import { usePopper } from "react-popper";
import { useQuery } from "@tanstack/react-query";
import { fetchPlayers } from "../../api/apiService";
import { useDebounce } from "@uidotdev/usehooks";
import FutcheckLogo from "../../assets/futcheck_logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  const [open, setOpen] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 1000);
  const ref = useRef();
  const closePanel = () => {
    setOpen(false);
  };
  useOutsideClick(ref, closePanel);
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 15], // Adjust the second value to increase or decrease the space
        },
      },
    ],
  });

  const { data: players = [], isLoading } = useQuery({
    queryKey: ["fetchPlayers", debouncedSearchTerm, searchMode],
    queryFn: () => fetchPlayers(debouncedSearchTerm, searchMode),
    cacheTime: 1000 * 60 * 100,
    staleTime: Infinity,
  });
  useEffect(() => {
    if (players.length) {
      setOpen(true);
    }
  }, [players]);
  return (
    <div>
      <header class="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-black text-sm py-3 sm:py-0">
        <nav
          class="relative max-w-[85rem] w-full mx-auto px-4 pt-2 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div class="flex items-center   grow justify-between gap-4">
            {/* <a
              class="flex-none text-xl font-semibold text-white"
              href="#"
              aria-label="Brand"
            >
              FUTCHECK
            </a> */}
            <Link to="/">
              <img src={FutcheckLogo} width={40} />
            </Link>
            {/* Input Element */}
            <div ref={ref} className="grow">
              <div ref={setReferenceElement} class=" relative  grow">
                <input
                  onChange={(e) => {
                    const { value } = e.target;
                    setSearchValue(value);
                  }}
                  onFocus={() => setOpen(true)}
                  type={searchMode == "rating" ? "number" : "text"}
                  id="hs-inline-leading-pricing-select-label"
                  name="inline-add-on"
                  class="py-3 px-4 ps-4 pe-20 block w-full shadow-sm rounded-lg  text-sm focus:z-10 disabled:opacity-50 focus:border-none disabled:pointer-events-none bg-slate-900 border-gray-700 text-gray-400 focus:ring-gray-600"
                  placeholder="Search..."
                />
                <div class="absolute inset-y-0 end-0 flex items-center text-gray-500 pe-px">
                  <select
                    id="hs-inline-leading-select-currency"
                    name="hs-inline-leading-select-currency"
                    class="block h-full w-full border-transparent rounded-lg focus:ring-blue-600 focus:border-blue-600 bg-gray-800"
                    value={searchMode}
                    onChange={(e) => {
                      setSearchValue("");
                      setSearchMode(e.target.value);
                    }}
                  >
                    <option value={"players"}>Players</option>
                    {/* <option value={"version"}>Version</option> */}
                    <option value={"rating"}>Rating</option>
                  </select>
                </div>
                <CustomPopover
                  styles={styles}
                  attributes={attributes}
                  setPopperElement={setPopperElement}
                  players={players}
                  isOpen={open}
                  closePanel={closePanel}
                  isLoading={isLoading}
                />
              </div>
            </div>
            {/* <div class="sm:hidden">
              <button
                type="button"
                class="hs-collapse-toggle size-9 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-white/20 text-white hover:border-white/40 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  class="hs-collapse-open:hidden flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  class="hs-collapse-open:block hidden flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div> */}
          </div>

          {/* <div
            id="navbar-collapse-with-animation"
            class="hs-collapse hidden overflow-hidden transition-all duration-300 sm:block"
          >
            <div class="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
              <a
                class="flex items-center gap-x-2 font-medium text-white/[.8] hover:text-white sm:border-s sm:border-white/[.3] sm:my-6 sm:ps-6"
                href="#"
              >
                <svg
                  class="flex-shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Log in
              </a>
            </div>
          </div> */}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;

import React, { useEffect, useRef, useState } from "react";
import useFetchUserInfo, {
  debounce,
  decodeJWT,
  useOutsideClick,
} from "../utils/utils";
import CustomPopover from "./CustomPopover";
import { usePopper } from "react-popper";
import { useQuery } from "@tanstack/react-query";
import { fetchPlayers, verifyToken } from "../../api/apiService";
import { useDebounce } from "@uidotdev/usehooks";
import FutcheckLogo from "../../assets/futcheck_logo.png";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  CalculatorIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import MobileMenuPopover from "./MobileMenuPopover";
import { Popover } from "@headlessui/react";
import { useDispatch } from "react-redux";
import Account from "./Account";

const Navbar = () => {
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let [mobileReferenceElement, setMobileReferenceElement] = useState();

  const [open, setOpen] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 1000);
  const ref = useRef();
  const closePanel = () => {
    setOpen(false);
  };
  useFetchUserInfo();

  useOutsideClick(ref, closePanel);
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 15],
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
      <header
        ref={setMobileReferenceElement}
        class="flex flex-wrap  sm:justify-start sm:flex-nowrap relative z-50 w-full bg-black text-sm py-3 sm:py-0"
      >
        <nav
          class="relative max-w-[85rem] w-full mx-auto px-4 pt-2 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div class="flex items-center   grow justify-between gap-4">
            <Link to="/">
              <img src={FutcheckLogo} width={40} />
            </Link>
            <div ref={ref} className="grow">
              <div ref={setReferenceElement} class=" relative  grow">
                <input
                  autoComplete="off"
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
            <div className="hidden md:flex gap-8 md:items-center">
              <Link to="/players/">
                <div className="text-white  font-bold">Players</div>
              </Link>
              <Link to="/fc_combinations/">
                <div className="text-white flex gap-1 items-center  font-bold">
                  Rating <CalculatorIcon className="w-4 h-4 text-white" />
                </div>
              </Link>
            </div>
            <div className="flex items-center md:hidden ">
              <Popover>
                {({ open }) => (
                  <>
                    <Popover.Button>
                      <button>
                        {open ? (
                          <XMarkIcon className="w-8 h-8 text-white" />
                        ) : (
                          <Bars3Icon className="w-8 h-8 text-white" />
                        )}
                      </button>
                    </Popover.Button>
                    <Popover.Panel className="absolute z-10 top-[7vh] left-0 ">
                      <MobileMenuPopover />
                    </Popover.Panel>
                  </>
                )}
              </Popover>
            </div>
            <Account />
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;

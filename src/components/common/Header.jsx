import React, { useEffect, useRef, useState } from "react";
import useFetchUserInfo, {
  debounce,
  decodeJWT,
  useOutsideClick,
} from "../utils/utils";
import CustomPopover from "./CustomPopover";
import { usePopper } from "react-popper";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllLeagues,
  fetchAllNations,
  fetchAllTeams,
  fetchPlayers,
  verifyToken,
} from "../../api/apiService";
import { useDebounce } from "@uidotdev/usehooks";
import FutcheckLogo from "../../assets/futcheck_logo.png";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  CalculatorIcon,
  MagnifyingGlassIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import MobileMenuPopover from "./MobileMenuPopover";
import { Popover } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import Account from "./Account";
import { setLeagues, setNations, setTeams } from "../../redux/appSlice";

const Navbar = () => {
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let [mobileReferenceElement, setMobileReferenceElement] = useState();
  const app = useSelector((state) => state.app);
  const dispatch = useDispatch();

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
  useEffect(() => {
    const getData = async () => {
      if (app.nations?.length == 0) {
        const response = await fetchAllNations();
        dispatch(setNations(response));
      }
      if (app.leagues?.length == 0) {
        const response = await fetchAllLeagues();
        dispatch(setLeagues(response));
      }
      if (app.teams?.length == 0) {
        const response = await fetchAllTeams();
        dispatch(setTeams(response));
      }
    };
    getData();
  }, []);
  return (
    <div>
      <header
        ref={setMobileReferenceElement}
        class="flex flex-wrap h-[4rem]  sm:justify-start sm:flex-nowrap relative z-50 w-full bg-black text-sm py-3 sm:py-0 sm:pb-2"
      >
        <nav
          class="relative w-4/5 mx-auto  pt-2 sm:flex sm:items-center sm:justify-between  "
          aria-label="Global"
        >
          <div class="flex items-center   grow justify-between gap-4">
            <Link to="/">
              <div className="flex gap-2 items-center md:mr-6">
                <div>
                  <img src={FutcheckLogo} width={35} className="rounded-md" />
                </div>
                <div className="text-white hidden md:block font-bold text-xl">
                  FUTCHECK
                </div>
              </div>
            </Link>
            <div ref={ref} className="grow">
              <div ref={setReferenceElement} class=" relative  grow">
                <MagnifyingGlassIcon className="absolute w-5 h-5 top-2 left-3 text-gray-400" />
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
                  class="py-2 px-4 ps-10 pe-20 block w-full shadow-sm rounded-lg  text-sm focus:z-10 disabled:opacity-50 focus:border-none disabled:pointer-events-none bg-[#1F1F1F] border-gray-700 text-gray-400 focus:ring-gray-600"
                  placeholder="Search Players..."
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
            <div className="hidden md:flex gap-6 md:items-center">
              <Link to="/players/">
                <div className="text-white flex gap-1 font-bold">
                  <UserIcon className="text-white w-5" /> Players
                </div>
              </Link>
              <Link to="/sbc/">
                <div className="text-white flex gap-2  font-bold">
                  {" "}
                  <img
                    className="w-5"
                    src="https://cdn.futcheck.com/assets/img/fc25/misc/sbc.webp"
                  />{" "}
                  <div className="text-white  font-bold">SBCs</div>
                </div>
              </Link>
              {/* <Link to="/squad-builder/">
                <div className="text-white  font-bold">Squad Builder</div>
              </Link> */}
              {/* <Link to="/my-club/">
                <div className="text-white  font-bold">Club</div>
              </Link>
              <Link to="/fc_combinations/">
                <div className="text-white flex gap-1 items-center  font-bold">
                  Rating <CalculatorIcon className="w-4 h-4 text-white" />
                </div>
              </Link> */}
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
            {/* <div className="ml-2">
              <Account />
            </div> */}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;

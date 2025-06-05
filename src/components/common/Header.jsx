import React, { useEffect, useRef, useState } from "react";
import { useUserInfo, useOutsideClick } from "../utils/utils";
import CustomPopover from "./CustomPopover";
import { usePopper } from "react-popper";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllLeagues,
  fetchAllNations,
  fetchAllTeams,
  fetchPlayers,
  fetchAllRarities,
} from "../../api/apiService";
import { useDebounce } from "@uidotdev/usehooks";
import FutcheckLogo from "../../assets/football logo 5.png";
import { Link } from "react-router-dom";
import {
  AcademicCapIcon,
  Bars3Icon,
  FunnelIcon,
  MagnifyingGlassIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import MobileMenuPopover from "./MobileMenuPopover";
import { useDispatch, useSelector } from "react-redux";
import Account from "./Account";
import LoginModal from "./LoginModal";
import {
  setLeagues,
  setNations,
  setRarities,
  setTeams,
} from "../../redux/appSlice";
import { Popover } from "@headlessui/react";
import PremiumModal from "./PremiumModal";

const Navbar = () => {
  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();
  const [mobileReferenceElement, setMobileReferenceElement] = useState();
  const [menuPopperElement, setMenuPopperElement] = useState();

  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);

  const [open, setOpen] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 400);
  const [showPremium, setShowPremium] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const inputRef = useRef(null);
  const [inputWidth, setInputWidth] = useState(0);

  const closePanel = () => {
    setOpen(false);
  };
  const { fetchUser } = useUserInfo();

  useOutsideClick(inputRef, closePanel);
  const { styles: menuStyles, attributes: menuAttributes } = usePopper(
    mobileReferenceElement,
    menuPopperElement,
    {
      placement: "bottom-start", // Places it just below the header
      modifiers: [
        {
          name: "offset",
          options: { offset: [0, 0] }, // Ensures it's flush with the header
        },
      ],
    }
  );

  // Initialize Popper
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  // Fetch players
  const { data: players = [], isLoading } = useQuery({
    queryKey: ["fetchPlayers", debouncedSearchTerm, searchMode],
    queryFn: () => fetchPlayers(debouncedSearchTerm, searchMode),
    cacheTime: 1000 * 60 * 100,
    staleTime: Infinity,
  });

  // Measure the input width whenever searchValue changes (or on mount)
  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.offsetWidth);
    }
  }, [searchValue]);

  // Open the popover if there are players
  useEffect(() => {
    if (players.length) {
      setOpen(true);
    }
  }, [players]);

  // Fetch initial data
  useEffect(() => {
    const getData = async () => {
      if (!app.nations?.length) {
        const response = await fetchAllNations();
        dispatch(setNations(response));
      }
      if (!app.leagues?.length) {
        const response = await fetchAllLeagues();
        dispatch(setLeagues(response));
      }
      if (!app.teams?.length) {
        const response = await fetchAllTeams();
        dispatch(setTeams(response));
      }
      if (!app.rarities?.length) {
        const response = await fetchAllRarities();
        dispatch(setRarities(response));
      }
    };
    getData();
  }, []);

  useEffect(() => {
    fetchUser();
    const handleFocus = () => {
      fetchUser();
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        fetchUser();
      }
    });

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);
  const userInfo = useSelector((state) => state.app.userInfo);
  return (
    <div>
      <header
        ref={setMobileReferenceElement}
        style={{
          background:
            "linear-gradient(90deg, #0A0314 1%, #200A38 25%, #310A52 60%)",
        }}
        className="flex flex-wrap  md:h-[4rem] sm:justify-start sm:flex-nowrap relative z-50 w-full text-sm py-3 sm:py-0"
      >
        {/* Mobile Logo - Centered at Top */}
        <Link to="/" className="flex w-full h-16 justify-center md:hidden">
          <img
            src={FutcheckLogo}
            className="rounded-md w-28 absolute"
            alt="Futcheck Logo"
          />
        </Link>

        <nav
          className="relative md:w-4/5 w-full mx-4 items-center md:mx-auto sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <div className="flex items-center grow justify-between gap-1 md:gap-4">
            {/* Desktop Logo */}
            <Link to="/" className="hidden md:block">
              <div className="flex gap-2 items-center">
                <div className="mt-2 md:mt-7">
                  <img
                    src={FutcheckLogo}
                    height={10}
                    className="rounded-md w-28 md:w-32"
                    alt="Futcheck Logo"
                  />
                </div>
              </div>
            </Link>

            {/* Search Bar */}
            <div ref={inputRef} className="grow relative">
              <div
                ref={setReferenceElement}
                className="relative grow mr-3 md:mr-0"
              >
                <MagnifyingGlassIcon className="absolute w-5 h-5 top-2.5 left-3 text-gray-400" />
                <input
                  autoComplete="off"
                  onChange={(e) => setSearchValue(e.target.value)}
                  style={{
                    background: "rgba(114, 112, 112, 0.55)",
                    borderRadius: "33px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    border: "none",
                    outline: "none",
                  }}
                  onFocus={() => setOpen(true)}
                  type={searchMode === "rating" ? "number" : "text"}
                  id="hs-inline-leading-pricing-select-label"
                  name="inline-add-on"
                  className="py-2 px-4 ps-10 pe-20 h-[40px] font-medium block w-full shadow-sm rounded-lg text-sm focus:z-10 disabled:opacity-50 focus:border-none disabled:pointer-events-none text-gray-400 focus:ring-gray-600"
                  placeholder="Search Players..."
                />
                <button
                  className="absolute flex items-center gap-2 right-0 bg-[#2E1843] w-[20vw]  md:w-[5vw] top-0 h-[40px] text-white text-opacity-70 px-3 py-1 rounded-lg"
                  style={{
                    borderRadius: "33px",
                  }}
                >
                  <FunnelIcon className="w-5 h-5" />
                  Filter
                </button>
                <CustomPopover
                  styles={styles}
                  attributes={attributes}
                  setPopperElement={setPopperElement}
                  players={players}
                  isOpen={open}
                  closePanel={closePanel}
                  isLoading={isLoading}
                  popoverWidth={inputWidth}
                />
              </div>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 md:items-center">
              <Link to="/players/">
                <div className="text-white flex gap-1 font-bold">
                  <UserIcon className="text-white w-5" /> Players
                </div>
              </Link>
              <Link to="/sbc/">
                <div className="text-white flex gap-2 font-bold">
                  <img
                    alt=""
                    className="w-5"
                    src="https://cdn.futcheck.com/assets/img/fc25/misc/sbc.webp"
                  />
                  <div className="text-white font-bold">SBCs</div>
                </div>
              </Link>
              <Link to="/squad_wizard/">
                <div className="text-white flex gap-2 font-bold">
                  <AcademicCapIcon className="text-white w-5" /> Squad Wizard
                </div>
              </Link>
              {/* <Link to="/games/">
                <div className="text-white flex gap-2 font-bold">
                  <AcademicCapIcon className="text-white w-5" /> Games
                </div>
              </Link> */}
              {userInfo ? (
                <Account />
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-white font-bold"
                >
                  Login
                </button>
              )}
              <button
                onClick={() => setShowPremium(true)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-1.5 px-4 rounded-lg"
              >
                Go Premium
              </button>
              {/* <Link to="/evolutions/">
                <div className="text-white flex gap-2 font-bold">
                  Evolutions
                </div>
              </Link> */}
            </div>

            {/* Mobile Menu */}
            <div className="flex relative items-center md:hidden">
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

                    {/* Mobile Menu Panel - Full Width and Positioned Below Header */}
                    <Popover.Panel
                      ref={setMenuPopperElement} // Attach the popper element
                      style={{
                        ...menuStyles.popper,
                        width: "100vw",
                        zIndex: 500,
                      }} // Full width, positioned dynamically
                      {...menuAttributes.popper}
                      className="absolute bg-[#28004d] shadow-lg"
                    >
                      <MobileMenuPopover />
                    </Popover.Panel>
                  </>
                )}
              </Popover>
            </div>
          </div>
        </nav>
      </header>
      {showPremium && <PremiumModal onClose={() => setShowPremium(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
};

export default Navbar;

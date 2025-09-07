import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUserInfo } from "../../redux/appSlice";
import { deleteCookie } from "../utils/cookies";
import { UserIcon } from "@heroicons/react/20/solid";
import { getTimeUntilExpiration } from "../utils/utils";

const MobileMenuPopover = ({ userInfo, onOpenLogin, onOpenPremium }) => {
  const dispatch = useDispatch();
  const isGold =
    !!userInfo &&
    (userInfo.is_premium ||
      (userInfo.membership_level || "").toLowerCase() === "gold");
  const remaining = userInfo?.membership_expires_at
    ? getTimeUntilExpiration(userInfo.membership_expires_at)
    : null;

  const handleSignOut = () => {
    deleteCookie("google_token");
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    dispatch(removeUserInfo());
  };

  return (
    <div className="bg-gradient-to-b from-[#2a0151] to-[#120025] flex flex-col gap-4 p-5 px-6 w-[100vw] text-white">
      {/* Account summary / Login */}
      <div className="rounded-xl bg-white/5 border border-white/10 p-4">
        {userInfo ? (
          <div className="flex items-center gap-3">
            <div
              className={`p-0.5 rounded-full border-2 ${
                isGold ? "border-yellow-400" : "border-fuchsia-400"
              }`}
            >
              {userInfo.picture_url ? (
                <img
                  src={userInfo.picture_url}
                  className="w-10 h-10 rounded-full"
                  alt="Profile"
                />
              ) : (
                <UserIcon className="w-8 h-8 text-white" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-bold leading-tight">
                {userInfo.name || userInfo.email}
              </div>
              {isGold ? (
                <div className="flex items-center gap-2 text-xs text-black w-max px-2 py-0.5 rounded-full bg-yellow-400 font-extrabold mt-1">
                  GOLD
                </div>
              ) : userInfo?.membership_level ? (
                <div className="text-xs opacity-80">
                  Membership: {userInfo.membership_level}
                </div>
              ) : null}
              {remaining && (
                <div className="text-[11px] opacity-80 mt-0.5">
                  Expires in: {remaining}
                </div>
              )}
            </div>
            <button
              className="text-xs underline opacity-90 hover:opacity-100"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-0.5 rounded-full border-2 border-fuchsia-400">
                <UserIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="font-bold">Welcome to Futcheck</div>
                <div className="text-xs opacity-80">Log in to unlock more</div>
              </div>
            </div>
            <button
              onClick={onOpenLogin}
              className="px-4 py-1.5 rounded-lg bg-white text-[#28004d] font-bold"
            >
              Login
            </button>
          </div>
        )}
      </div>

      {/* Premium CTA */}
      {!isGold ? (
        <button
          onClick={onOpenPremium}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-extrabold shadow-[0_8px_20px_rgba(250,204,21,0.35)]"
        >
          Go Premium
        </button>
      ) : (
        <div className="w-full py-3 rounded-xl bg-yellow-400 text-black font-extrabold text-center">
          GOLD Member
        </div>
      )}

      {/* Links */}
      <div className="rounded-xl bg-white/5 border border-white/10 divide-y divide-white/10 overflow-hidden">
        <Link to="/players" className="block px-5 py-3 font-bold">
          Players
        </Link>
        <Link to="/sbc/" className="block px-5 py-3 font-bold">
          SBCs
        </Link>
        <Link to="/squad_wizard/" className="block px-5 py-3 font-bold">
          Squad Wizard
        </Link>
      </div>
    </div>
  );
};
export default MobileMenuPopover;

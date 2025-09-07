import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUserInfo, setUserInfo } from "../../redux/appSlice";
import { verifyToken } from "../../api/apiService";
import { setCookie, deleteCookie } from "../utils/cookies";
import { Popover } from "@headlessui/react";
import { capitalizeFirstLetter, getTimeUntilExpiration } from "../utils/utils";
import { UserIcon } from "@heroicons/react/20/solid";

const Account = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.app.userInfo);

  const isGold =
    !!userInfo &&
    (userInfo.is_premium ||
      (userInfo.membership_level || "").toLowerCase() === "gold");
  const remaining = userInfo?.membership_expires_at
    ? getTimeUntilExpiration(userInfo.membership_expires_at)
    : null;

  return (
    <div>
      {userInfo !== null ? (
        <div className="flex gap-1 items-center relative">
          <Popover>
            <Popover.Button>
              <div
                className={`rounded-full flex justify-center items-center cursor-pointer p-1 border-2 ${
                  isGold
                    ? "border-yellow-400 ring-2 ring-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.8)]"
                    : "border-fuchsia-400"
                }`}
                title={isGold ? "GOLD Member" : "Account"}
              >
                {userInfo.picture_url ? (
                  <img
                    src={userInfo.picture_url}
                    className="w-10 md:w-6 rounded-full"
                    alt="Profile"
                  />
                ) : (
                  <UserIcon className="w-6 h-6 text-white" />
                )}
              </div>
            </Popover.Button>
            <Popover.Panel className="absolute z-10 top-[7vh] right-0 ">
              <div className="min-h-[12rem] w-[18rem] md:w-[15vw] bg-slate-700 shadow-md rounded-md">
                <div className="flex items-center flex-col pt-4 gap-2 p-4 ">
                  {userInfo.picture_url ? (
                    <div
                      className={`p-1 rounded-full ${
                        isGold ? "ring-2 ring-yellow-400" : ""
                      }`}
                    >
                      <img
                        src={userInfo.picture_url}
                        className="w-12 h-12 rounded-full"
                        alt="Profile"
                      />
                    </div>
                  ) : (
                    <UserIcon className="w-8 h-8 text-white" />
                  )}

                  <p className="text-white font-bold capitalize">
                    {capitalizeFirstLetter(userInfo.name || "")}
                  </p>

                  {/* Membership summary */}
                  {isGold ? (
                    <div className="flex flex-col items-center text-center gap-1">
                      <span className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-yellow-400 text-black text-xs font-extrabold tracking-wide">
                        GOLD
                      </span>
                      {remaining && (
                        <span className="text-xs text-gray-200">
                          Expires in: {remaining}
                        </span>
                      )}
                    </div>
                  ) : userInfo?.membership_level ? (
                    <div className="text-xs text-gray-300">
                      Membership:{" "}
                      {capitalizeFirstLetter(userInfo.membership_level)}
                    </div>
                  ) : null}

                  {userInfo?.email && (
                    <div className="text-xs text-gray-300">
                      {userInfo.email}
                    </div>
                  )}

                  <hr className="text-white bg-white w-full my-2" />

                  <button
                    className="text-white self-start hover:underline"
                    onClick={() => {
                      deleteCookie("google_token");
                      deleteCookie("access_token");
                      deleteCookie("refresh_token");
                      dispatch(removeUserInfo());
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Popover>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            console.log(credentialResponse);
            const userInfo = await verifyToken({
              token: credentialResponse.credential,
            });
            const { access, refresh } = userInfo.tokens;
            setCookie("access_token", access);
            setCookie("refresh_token", refresh);
            setCookie("google_token", credentialResponse.credential);
            dispatch(setUserInfo(userInfo));
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          theme="outline"
          size="medium"
          type="icon"
          shape="pill"
          useOneTap
        />
      )}
    </div>
  );
};

export default Account;

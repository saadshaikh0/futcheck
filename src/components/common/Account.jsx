import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUserInfo, setUserInfo } from "../../redux/appSlice";
import { verifyToken } from "../../api/apiService";
import { setCookie, deleteCookie } from "../utils/cookies";
import { Popover } from "@headlessui/react";
import { capitalizeFirstLetter } from "../utils/utils";
import { UserIcon } from "@heroicons/react/20/solid";

const Account = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.app.userInfo);
  return (
    <div>
      {userInfo !== null ? (
        <div className="flex gap-1 items-center relative">
          <Popover>
            <Popover.Button>
              <div className="rounded-full flex justify-center  border-fuchsia-400 p-1 border-2 items-center cursor-pointer">
                {userInfo.picture_url ? (
                  <img
                    src={userInfo.picture_url}
                    className="w-10 md:w-6 rounded-full"
                  />
                ) : (
                  <UserIcon className="w-6 h-6 text-white" />
                )}
              </div>
            </Popover.Button>
            <Popover.Panel className="absolute z-10 top-[7vh] right-0 ">
              <div className="h-[20vh] w-[15vw] bg-slate-700 shadow-md rounded-md">
                <div className="flex items-center flex-col pt-3 gap-2 p-4 ">
                  {userInfo.picture_url ? (
                    <img
                      src={userInfo.picture_url}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <UserIcon className="w-8 h-8 text-white" />
                  )}
                  <p className="text-white font-bold capitalize">
                    {capitalizeFirstLetter(userInfo.name || '')}
                  </p>
                  <hr className="text-white  bg-white w-full" />
                  <button
                    className="text-white self-start "
                    onClick={() => {
                      deleteCookie("google_token");
                      deleteCookie("access_token");
                      deleteCookie("refresh_token");
                      dispatch(removeUserInfo());
                    }}
                  >
                    Sign Out{" "}
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

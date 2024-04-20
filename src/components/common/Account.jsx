import { GoogleLogin, googleLogout } from "@react-oauth/google";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../redux/appSlice";
import { verifyToken } from "../../api/apiService";
import { Popover } from "@headlessui/react";
import { capitalizeFirstLetter } from "../utils/utils";

const Account = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.app.userInfo);
  return (
    <div>
      {userInfo !== null && userInfo.picture_url ? (
        <div className="flex gap-1 items-center relative">
          <Popover>
            <Popover.Button>
              <div className="rounded-full flex justify-center  border-fuchsia-400 p-1 border-2 items-center cursor-pointer">
                <img
                  src={userInfo.picture_url}
                  className="w-10 md:w-6 rounded-full"
                />
              </div>
            </Popover.Button>
            <Popover.Panel className="absolute z-10 top-[7vh] right-0 ">
              <div className="h-[20vh] w-[15vw] bg-slate-700 shadow-md rounded-md">
                <div className="flex items-center flex-col pt-3 gap-2 p-4 ">
                  <img
                    src={userInfo.picture_url}
                    className="w-12 h-12 rounded-full"
                  />
                  <p className="text-white font-bold capitalize">
                    {capitalizeFirstLetter(
                      `${userInfo.given_name} ${userInfo.family_name}`
                    )}
                  </p>
                  <hr className="text-white  bg-white w-full" />
                  <button
                    className="text-white self-start "
                    onClick={() => {
                      localStorage.setItem("google_token", null);
                      dispatch(setUserInfo(null));
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
            localStorage.setItem("google_token", credentialResponse.credential);
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

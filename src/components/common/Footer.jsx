import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-10 relative bottom-0 z-0 p-4 bg-black sm:px-6 lg:px-8 mx-auto">

      <div className="text-center">
        <div className="mt-3 text-white">
          <p>
            &copy; 2024 FUTCHECK. All rights reserved. All FIFA assets are
            property of EA Sports.
          </p>
          <div className="flex gap-2 justify-center items-center mt-2">
            <span>
              <Link to={"/tos"}> Terms of Service</Link>
            </span>
            <span className="w-[0.1em] h-[1em] bg-white"></span>
            <span>
              <Link to={"/policy"}>Privacy Policy</Link>
            </span>
            <span className="w-[0.1em] h-[1em] bg-white"></span>
            <a href="mailto:admin@futcheck.com">Contact</a>
          </div>
        </div>

        <div className="mt-3 space-x-2">
          <a
            className="inline-flex justify-center items-center size-10 text-center text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800"
            href="mailto:support@futcheck.com"
          >
            <svg
              className="flex-shrink-0 size-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
            </svg>
          </a>
          <a
            className="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            href="https://twitter.com/realfutcheck"
          >
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

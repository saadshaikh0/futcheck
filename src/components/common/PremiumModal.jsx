// PremiumModal.jsx
import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { createPremiumOrder, captureOrder } from "../../api/apiService";
import { toHaveStyle } from "@testing-library/jest-dom/matchers";
import { toast } from "react-toastify";
import { useUserInfo } from "../utils/utils";

const PRICE_USD = "4.99"; // single-payment price

export default function PremiumModal({ onClose }) {
  const { fetchUser } = useUserInfo();
  // close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  /** PayPal JS SDK will call this to create the order */
  const createOrder = useCallback(async () => {
    const { id } = await createPremiumOrder({ amount: PRICE_USD });
    return id; // return orderID to PayPal
  }, []);

  /** After buyer approves the payment */
  const onApprove = useCallback(
    async (data, actions) => {
      try {
        const order = await captureOrder(data.orderID);

        if (order.status === "COMPLETED") {
          toast.success("Premium unlocked! Enjoy for 1 month.");
          // refresh user info so UI updates immediately
          try {
            await fetchUser();
          } catch {}
          setTimeout(() => {
            onClose();
          }, 300);
        } else {
          alert("Payment captured but not completed: " + order.status);
        }
      } catch (err) {
        console.error("Capture failed", err);
        alert("Something went wrong during capture.");
      }

      // ✅ Explicitly return a resolved promise
      return Promise.resolve();
    },
    [onClose, fetchUser]
  );

  /** Basic error handler */
  const onError = (err) => {
    console.error(err);
    alert("Sorry, payment failed. Please try again.");
  };

  /*–––– UI ––––*/
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onClose} /* click backdrop to close */
    >
      {/* stop click-through */}
      <div
        className="bg-[#1b1230] text-white w-11/12 md:w-[30rem] rounded-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* close button */}
        <button
          className="absolute right-4 top-4 text-2xl leading-none"
          onClick={onClose}
          aria-label="Close premium modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Unlock Futcheck&nbsp;Premium
        </h2>

        <p className="text-gray-300 mb-6 text-center">
          One-time payment • access all premium insights and squad tools
        </p>

        {/* price badge */}
        <div className="mx-auto mb-6 w-max px-6 py-2 bg-yellow-400 text-black font-bold rounded-full">
          ${PRICE_USD}
        </div>

        {/* PayPal Smart Button (shows card + wallet) */}
        <div className="flex justify-center">
          <PayPalButtons
            style={{ layout: "vertical", color: "gold", shape: "rect" }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            // fundingSource={undefined}
          />
        </div>
      </div>
    </div>,
    document.body // portal target
  );
}

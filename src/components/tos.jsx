import React from "react";

const Tos = () => {
  return (
    <div className="text-white w-3/4 mx-auto mt-6 flex-col gap-10">
      <h1 className="text-3xl py-4">
        Terms of Service (TOS) for Futcheck.com{" "}
      </h1>
      <p>
        Please read these Terms of Service ("Terms", "Terms of Service")
        carefully before using Futcheck.com (the "Service") operated by Futcheck
        ("us", "we", or "our").
      </p>{" "}
      <p>
        By accessing or using the Service you agree to be bound by these Terms.
        If you disagree with any part of the terms then you may not access the
        Service.
      </p>{" "}
      <p className="text-2xl py-4">Account Registration </p>
      <p>
        To access certain features of the Service, you may be required to
        register for an account. When registering for an account, you agree to
        provide accurate and complete information and to keep your login
        credentials secure. You are solely responsible for any activity that
        occurs under your account.
      </p>
      <p className="text-2xl py-4">Use of the Service</p>
      <p>
        {" "}
        You agree to use the Service only for lawful purposes and in accordance
        with these Terms. You may not use the Service in any manner that could
        damage, disable, overburden, or impair the Service or interfere with any
        other party's use of the Service.
      </p>
      <p className="text-2xl py-4"> Intellectual Property</p>
      <p>
        {" "}
        The Service and its original content, features, and functionality are
        and will remain the exclusive property of Futcheck and its licensors.
        The Service is protected by copyright, trademark, and other laws of both
        the United States and foreign countries. Our trademarks and trade dress
        may not be used in connection with any product or service without the
        prior written consent of Futcheck.
      </p>{" "}
      <p className="text-2xl py-4">User Content</p>
      <p>
        {" "}
        By submitting any content to the Service, including but not limited to
        comments, feedback, or suggestions, you grant Futcheck a perpetual,
        irrevocable, worldwide, royalty-free, and non-exclusive license to use,
        reproduce, modify, adapt, publish, translate, distribute, and display
        such content in any form, media, or technology now known or later
        developed.{" "}
      </p>
      <p className="text-2xl py-4">Termination</p>
      <p>
        {" "}
        We may terminate or suspend access to our Service immediately, without
        prior notice or liability, for any reason whatsoever, including without
        limitation if you breach the Terms. All provisions of the Terms which by
        their nature should survive termination shall survive termination,
        including, without limitation, ownership provisions, warranty
        disclaimers, indemnity, and limitations of liability.
      </p>{" "}
      <p className="text-2xl py-4">Limitation of Liability</p>
      <p>
        {" "}
        In no event shall Futcheck, nor its directors, employees, partners,
        agents, suppliers, or affiliates, be liable for any indirect,
        incidental, special, consequential or punitive damages, including
        without limitation, loss of profits, data, use, goodwill, or other
        intangible losses, resulting from (i) your access to or use of or
        inability to access or use the Service; (ii) any conduct or content of
        any third party on the Service; (iii) any content obtained from the
        Service; and (iv) unauthorized access, use or alteration of your
        transmissions or content, whether based on warranty, contract, tort
        (including negligence) or any other legal theory, whether or not we have
        been informed of the possibility of such damage, and even if a remedy
        set forth herein is found to have failed of its essential purpose.
      </p>{" "}
      <p className="text-2xl py-4">Changes to Terms</p>
      <p>
        {" "}
        We reserve the right, at our sole discretion, to modify or replace these
        Terms at any time. If a revision is material, we will provide at least
        30 days' notice prior to any new terms taking effect. What constitutes a
        material change will be determined at our sole discretion.
      </p>
      <p className="text-2xl py-4 pb-2">Contact Us</p>
      <p>
        If you have any questions about these Terms, please contact us at
        <a className="ml-2" href="mailto:admin@futcheck.com">
          admin@futcheck.com.
        </a>
      </p>
      <p className="pt-3">
        This Terms of Service was last updated on 23/3/2024.
      </p>
    </div>
  );
};

export default Tos;

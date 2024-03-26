import React from "react";

const Policy = () => {
  return (
    <div className="text-white w-3/4 mx-auto mt-6 flex-col gap-10">
      <h1 className="text-3xl py-4">Privacy Policy for Futcheck.com</h1>
      <p>
        At Futcheck.com, the privacy of our visitors is of utmost importance to
        us. This Privacy Policy document outlines the types of personal
        information received and collected by Futcheck.com and how it is used.
      </p>{" "}
      <p className="text-2xl py-4">Information We Collect</p>
      <p>
        When you visit Futcheck.com, we may collect certain information about
        your visit, such as your IP address, browser type, language preference,
        referring site, and the date and time of your visit. We may also collect
        information about your interactions with the site, such as the pages you
        visit and the links you click on.
      </p>
      <p>
        If you choose to register an account on Futcheck.com, we may collect
        additional information such as your name, email address, and any other
        information you choose to provide.
      </p>
      <p className="text-2xl py-4">Use of Information</p>
      <p>
        {" "}
        The information we collect may be used for the following purposes:
        <ul>
          {" "}
          <li>To personalize your experience on Futcheck.com.</li>
          <li> To improve our website and services.</li>
          <li>
            To send periodic emails regarding updates, promotions, or other
            information related to Futcheck.com.
          </li>{" "}
          <li>
            {" "}
            To respond to your inquiries or provide customer support. Cookies
            and Tracking
          </li>
        </ul>
      </p>
      <p>
        Futcheck.com may use cookies and similar technologies to enhance your
        experience on our website. Cookies are small files stored on your
        computer's hard drive that help us improve our site by tracking your
        usage and preferences. You can choose to disable cookies in your browser
        settings, but please note that some features of Futcheck.com may not
        function properly if cookies are disabled.
      </p>
      <p>
        We may also use third-party services such as Google Analytics to
        collect, monitor, and analyze data about the usage of Futcheck.com.
        These third-party services may use cookies and other tracking
        technologies to track your interactions with our website.
      </p>
      <p className="text-2xl py-4"> Data Security</p>
      <p>
        {" "}
        Futcheck.com employs industry-standard security measures to protect the
        personal information we collect. However, please be aware that no method
        of transmission over the internet or method of electronic storage is
        100% secure. While we strive to use commercially acceptable means to
        protect your personal information, we cannot guarantee its absolute
        security.
      </p>{" "}
      <p className="text-2xl py-4">Disclosure of Information</p>
      <p>
        We may disclose your personal information to third parties when we
        believe it is necessary to comply with applicable laws and regulations,
        to enforce our site policies, or to protect our rights, property, or
        safety, or the rights, property, or safety of others. We may also share
        non-personally identifiable information with third parties for
        marketing, advertising, or other purposes.
      </p>
      <p className="text-2xl py-4">Changes to this Privacy Policy</p>
      <p>
        {" "}
        Futcheck.com reserves the right to update or change this Privacy Policy
        at any time. Any changes will be posted on this page, and the updated
        Privacy Policy will indicate the date of the latest revision. Your
        continued use of Futcheck.com after any changes to this Privacy Policy
        will constitute your acceptance of such changes.
      </p>{" "}
      <p className="text-2xl py-4 pb-2">Contact Us</p>
      <p>
        If you have any questions or concerns about this Privacy Policy or the
        practices of Futcheck.com, please contact us at
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

export default Policy;

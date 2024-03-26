import React, { useEffect } from "react";

const Ads = ({ adClient, adSlot }) => {
  useEffect(() => {
    // Load Google Ads script
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="w-full flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width: "728px", height: "90px" }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
      ></ins>
    </div>
  );
};

export default Ads;

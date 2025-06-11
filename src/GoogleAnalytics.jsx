import { useEffect } from "react";

const GoogleAnalytics = () => {
  useEffect(() => {
    // Add Google AdSense script
    const adsenseScript = document.createElement("script");
    adsenseScript.src = `${process.env.REACT_APP_GOOGLE_ADSENSE_URL}?client=${process.env.REACT_APP_GOOGLE_ADSENSE_ACCOUNT}`;
    adsenseScript.async = true;
    adsenseScript.crossOrigin = "anonymous";
    document.head.appendChild(adsenseScript);

    // Add Google Tag Manager script
    const gtmScript = document.createElement("script");
    gtmScript.src = `${process.env.REACT_APP_GOOGLE_TAG_MANAGER_URL}?id=${process.env.REACT_APP_GOOGLE_ANALYTICS_ID}`;
    gtmScript.async = true;
    document.head.appendChild(gtmScript);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", process.env.REACT_APP_GOOGLE_ANALYTICS_ID);

    // Cleanup function
    return () => {
      // Remove scripts if component unmounts
      document.head.removeChild(adsenseScript);
      document.head.removeChild(gtmScript);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;

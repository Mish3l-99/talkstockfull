import React, { useEffect } from "react";

const client = `${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`;
// const slot = `${process.env.NEXT_PUBLIC_ADSENSE_SLOT}`;

const AdComponent = ({ slot }) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div className="w-full h-[100px] md:h-[100px] border border-gray-400 flex items-center justify-center">
      <label>Advertisment</label>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdComponent;

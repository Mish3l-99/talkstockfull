import React from "react";
import AdComponent from "../helpers/AdComponent";

const AdsArea = () => {
  return (
    <div className="w-full py-4">
      <div className="container">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6">
            <AdComponent slot="" />
          </div>
          <div className="col-span-12 md:col-span-6">
            <AdComponent slot="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsArea;

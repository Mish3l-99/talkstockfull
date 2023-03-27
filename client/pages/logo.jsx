import React from "react";
import { BsFillChatLeftDotsFill } from "react-icons/bs";

const logo = () => {
  return (
    <div>
      <div className="flex items-center justify-center mt-12">
        <div className="flex gap-x-4 items-center">
          <BsFillChatLeftDotsFill size={50} className="mt-2 text-main" />
          {/* <img src="/images/logo/logo.png" height={60} alt="" /> */}
          <h6 className="text-5xl text-main tracking-wider font-bold">
            Talk Stock Live
          </h6>
        </div>
      </div>
    </div>
  );
};

export default logo;

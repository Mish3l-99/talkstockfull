import Image from "next/image";
import React from "react";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <div className="w-full py-2 bg-gray-200">
      <div className="container">
        <div className="flex flex-col md:flex-row md:gap-x-4 gap-y-4 justify-center items-center">
          <p className="flex items-center gap-x-2 font-bold">
            All Rights Reserved {year}
            <span>&#169;.</span>
          </p>
          <div className=" mt-[-3px]">
            <Image
              src="/images/logo/logo-f.png"
              alt="/"
              height={30}
              width={140}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

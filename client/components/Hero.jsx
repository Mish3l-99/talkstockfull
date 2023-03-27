import Image from "next/image";
import React from "react";

import { RiChatPollFill } from "react-icons/ri";

const Hero = () => {
  return (
    <div className="w-full pt-2 mt-4">
      <div className="container">
        <div className="mt-2 grid grid-cols-12 gap-y-8 gap-x-2">
          <div className="col-span-12 md:col-span-6 flex flex-col justify-center py-6 items-center p-2">
            <p className="text-2xl md:text-5xl">Welcome to Talk Stock Live !</p>
            <hr className="my-4" />
            <div className="text-lg md:text-2xl flex gap-x-2">
              <span>
                <RiChatPollFill size={28} className="mt-1 text-main" />
              </span>
              <p className="text-3xl">
                Vote & Chat with other Traders and Investors in the US Stock
                Markets...
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 flex items-center justify-center min-h-[260px] md:min-h-[440px] relative ">
            <Image
              src="/images/stock.jpg"
              // src="/t.png"
              className="object-cover hover:shadow duration-500 ease-in shadow-sm rounded-lg"
              alt=""
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

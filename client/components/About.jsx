import Image from "next/image";
import React from "react";
import { MdOutlineMarkEmailUnread, MdQuestionMark } from "react-icons/md";
import { RxTwitterLogo } from "react-icons/rx";

const About = () => {
  return (
    <div className="w-full py-8 bg-gray-100">
      <div className="container">
        <div className="flex flex-col justify-center items-center gap-y-6">
          <h1 className="font-semibold text-tasi text-xl md:text-2xl flex items-center gap-x-2">
            About Us
          </h1>
          <p className="max-w-[900px] p-3 bg-white relative text-lg">
            Talk Stock Live is the go-to destination for investors and traders
            in the US stock markets. Our platform provides chat rooms where
            investors and traders can engage in discussions about stocks, market
            trends, and trading strategies. Our community members benefit from
            the insights and guidance provided by experienced traders. In
            addition, we offer a voting system that allows users to predict the
            performance of stocks.
            <span className="absolute top-[-12px] left-0 p-1 bg-white rounded-full">
              <MdQuestionMark />
            </span>
          </p>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="max-w-fit text-left py-1 px-3 text-lg bg-white rounded-md flex items-center gap-x-2">
              <span className="p-1 bg-white rounded-full">
                <RxTwitterLogo />
              </span>
              <a
                className="hover:text-main"
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/"
              >
                @talkstocklive
              </a>
            </div>
            <div className="max-w-fit text-left py-1 px-3 text-lg bg-white rounded-md flex items-center gap-x-2">
              <span className="p-1 bg-white rounded-full">
                <MdOutlineMarkEmailUnread />
              </span>
              <a
                className="hover:text-main"
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:tasitalk@gmail.com"
              >
                talkstocklive@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

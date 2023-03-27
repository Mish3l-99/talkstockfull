import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IoEnterOutline } from "react-icons/io5";
import { useG } from "../context/OurContext";

import companies from "../public/db/companies.json";

const ComapyRooms = () => {
  const [company, setCompany] = useState();
  const { user } = useG();

  const goToRoom = (e) => {
    e.preventDefault();
    if (user) {
      window.location.href = "/chat/" + company;
    } else {
      toast.error("You have to login to access company-specific Chat rooms!");
    }
  };

  return (
    <div className="w-full py-2">
      <div className="container">
        <div className="box bg-main/60 text-black rounded p-2">
          <div className="flex justify-center items-center gap-x-2 mb-2">
            <div className="h-8 w-8 md:h-12 md:w-12 shadow  rounded-full relative">
              <Image
                alt="/"
                src="/images/flag.png"
                className="object-cover"
                fill
              />
            </div>
            <div>
              <h1 className="text-black text-2xl md:text-4xl mt-2">
                Single Company Chat Room
              </h1>
            </div>
          </div>
          <div className="p-4">
            <h1 className="text-xl">
              Select the Company Symbol to enter the Chatroom:
            </h1>
            <form action="" className="mt-6 min-w-[150px] flex gap-x-4">
              <select
                name=""
                onChange={(e) => setCompany(e.target.value)}
                className="py-[1px] px-2 outline-none border-0 rounded bg-gray-100 min-w-[150px] max-w-[200px]"
              >
                <option value="">Choose...</option>
                {companies.map((com, i) => (
                  <option key={i} value={com.code}>
                    {com.code}
                  </option>
                ))}
              </select>

              <button
                disabled={!company}
                onClick={(e) => goToRoom(e)}
                className="bg-blue-800 px-2 py-[2px] text-white rounded flex items-center gap-x-2 hover:bg-blue-900 duration-500"
              >
                Enter Chat room
                <IoEnterOutline />
              </button>
            </form>
          </div>
          <div className="mt-4 grid grid-cols-12 gap-y-4"></div>
        </div>
      </div>
    </div>
  );
};

export default ComapyRooms;

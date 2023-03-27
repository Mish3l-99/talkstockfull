import Image from "next/image";
import React from "react";
import StockChat from "./StockChat";
import StockPrice from "./StockPrice";
import Voting from "./Voting";

const OneStock = ({ stock }) => {
  const {
    name,
    name_t,
    divId,
    code,
    voting_collection,
    lv_field,
    local_voted,
    room,
    local_lvDate,
  } = stock;
  return (
    <div id={divId} className="w-full py-2">
      <div className="container">
        <div className="box bg-main/60 text-black rounded p-2">
          {/* voting */}
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
              <h1 className="text-black text-2xl md:text-4xl">{name}</h1>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-12 gap-y-4">
            <div className="col-span-12 md:col-span-3">
              <StockPrice code={code} />
            </div>
            <div className="col-span-12 md:col-span-9">
              <Voting
                name={name}
                name_t={name_t}
                voting_collection={voting_collection}
                lv_field={lv_field}
                local_lvDate={local_lvDate}
                local_voted={local_voted}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <StockChat room={room} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneStock;

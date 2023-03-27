import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="relative h-3 w-8 mt-40 mb-8">
        <Image
          alt="loading..."
          src="/images/icons/loading.gif"
          className="object-cover"
          fill
        />
      </div>
    </div>
  );
};

export default Loading;

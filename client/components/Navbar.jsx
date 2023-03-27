import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiLogIn, BiLogOutCircle, BiUserPlus } from "react-icons/bi";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUser,
} from "react-icons/ai";
import { HiX } from "react-icons/hi";
import { CgMenu } from "react-icons/cg";

import { toast } from "react-hot-toast";
import { useG } from "../context/OurContext";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { FiSettings } from "react-icons/fi";

const setLocalParams = (from, user, image) => {
  let img = image;
  if (!image || image === null) {
    img = "";
  }
  localStorage.setItem("our_user_from", from);
  localStorage.setItem("our_user_user", user);
  localStorage.setItem("our_user_image", img);
};

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const router = useRouter();

  const { user } = useG();

  function headToUserPage(ID) {
    router.push("/" + ID);
  }

  function headToLoginPage() {
    router.push("/auth?mode=login");
  }

  // to be triggered when loging in
  //   useEffect(() => {
  //     // setLocalParams(user?.username, user?.uid, user?.image);
  //     console.log(user);
  //   }, [user]);

  return (
    <div className="w-full py-2 shadow-sm shadow-gray-200 bg-slate-100 relative">
      <div className="container">
        <nav className="flex justify-between items-center z-[1001] relative">
          <div className="flex gap-x-1 items-center">
            <Link href="/">
              <Image
                src="/images/logo/log.png"
                // src="/logo/logo.png"
                alt="/"
                height={60}
                width={screen.width > 500 ? 220 : 180}
                className="object-cover z-[999]"
              />
            </Link>
            <Image
              alt="/"
              src="/images/icons/live.gif"
              height={25}
              width={25}
            />
          </div>
          <div className="hidden md:flex gap-x-6 font-smibold text-lg md:text-[18px] items-center">
            <Link href="/#djia">
              <span className="hover:text-main">DJIA</span>
            </Link>
            <Link href="/#sandp">
              <span className="hover:text-main">S&P 500</span>
            </Link>
            <Link href="/#nasdaq">
              <span className="hover:text-main">NASDAQ</span>
            </Link>
            <Link href="/#nasdaqhun">
              <span className="hover:text-main">NASDAQ 100</span>
            </Link>
            <Link href="/#nyse">
              <span className="hover:text-main">NYSE</span>
            </Link>
          </div>
          <div className="flex items-center gap-x-4 w-fit together">
            {/* <div
                onClick={() => headToUserPage(user.uid)}
                className="bg-blue-100 cursor-pointer border py-[2px] px-3 rounded flex items-center gap-x-2"
              >
                <AiOutlineUser />
                {user?.username}
              </div> */}
            {user !== null ? (
              <DropUser username={user.username} />
            ) : (
              <button
                onClick={() => headToLoginPage()}
                className="border px-3 py-[2px] bg-white text-black hover:text-main duration-500 ease-out flex items-center gap-x-1"
              >
                Sign In
                <BiLogIn className="" />
              </button>
            )}
            <div className="md:hidden">
              {nav ? (
                <button
                  onClick={() => setNav(false)}
                  className="bg-white p-[3px] border rounded"
                >
                  <HiX />
                </button>
              ) : (
                <button
                  onClick={() => setNav(true)}
                  className="bg-white p-[3px] border rounded"
                >
                  <CgMenu />
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* mobile nav */}
      <div className={nav ? "mobnav duration-1000" : "mobnav mt-[-100%]"}>
        <div className="flex flex-col gap-y-3 font-smibold text-lg md:text-[18px] items-center">
          <Link href="/#djia">
            <span className="hover:text-main">DJIA</span>
          </Link>
          <Link href="/#sandp">
            <span className="hover:text-main">S&P 500</span>
          </Link>
          <Link href="/#nasdaq">
            <span className="hover:text-main">NASDAQ</span>
          </Link>
          <Link href="/#nasdaqhun">
            <span className="hover:text-main">NASDAQ 100</span>
          </Link>
          <Link href="/#nyse">
            <span className="hover:text-main">NYSE</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

function DropUser({ username }) {
  const router = useRouter();

  const { user, logout } = useG();

  function headToUserPage(ID) {
    router.push("/" + ID);
  }

  return (
    <div className="">
      <Menu as="div" className="">
        <div>
          <Menu.Button className="bg-white shadow cursor-pointer border py-[2px] px-3 rounded flex items-center gap-x-2">
            {username}
            <AiOutlineUser className="mt-[-3px]" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-2 mt-1 min-w-[160px] max-w-[200px] origin-top-left divide-y divide-gray-100 rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1 z-[999]">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <button
                  onClick={() => headToUserPage(user._id)}
                  className="w-full flex justify-between items-center gap-x-2 px-2 py-[2px] rounded hover:text-white duration-100 ease-out hover:bg-main"
                >
                  Settings
                  <FiSettings />
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={() => logout()}
                  className="w-full flex justify-between items-center gap-x-2 px-2 py-[2px] rounded hover:text-white duration-100 ease-out hover:bg-main"
                >
                  Log out
                  <BiLogOutCircle className="scale-x-[-1]" />
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

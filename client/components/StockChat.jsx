import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoEnterOutline } from "react-icons/io5";
import { BiLogIn } from "react-icons/bi";
import { BsExclamationCircleFill, BsPatchCheckFill } from "react-icons/bs";
import { TiMessages } from "react-icons/ti";
import { useRouter } from "next/router";
import { useG } from "../context/OurContext";

import Image from "next/image";
import axios from "axios";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST;

function getTime(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp);

  var hour = a.getHours();
  var min = a.getMinutes();
  var time = hour + ":" + min;
  return time;
}

const StockChat = ({ room }) => {
  let [modal, setModal] = useState(false);
  let [userField, setUserField] = useState("");
  const [messages, setMessages] = useState([]);

  const router = useRouter();
  const { user, fillLocalUser } = useG();

  const localUser = {
    user: localStorage.getItem("our_user_user"),
    from: localStorage.getItem("our_user_from"),
    image: localStorage.getItem("our_user_image"),
  };

  const enterRoom = () => {
    if (user !== null) {
      // router.push("/room/"+ room);
      window.location.href = "/room/" + room;
    } else {
      openModal();
    }
  };

  const getToRoom = () => {
    fillLocalUser(userField);
    // router.push("/room/"+ room);
    window.location.href = "/room/" + room;
  };

  function closeModal() {
    setModal(false);
  }

  function openModal() {
    setModal(true);
  }

  const our_user =
    user !== null
      ? { user: user._id, from: user.username, image: user.image }
      : localUser;

  const getMessages = () => {
    axios
      .get(`${backendHost}/messages/${room}`)
      .then((res) => {
        if (res.data.success) {
          setMessages(res.data.data);
          scrollToBottom();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // get data
  useEffect(() => {
    getMessages();
  }, []);

  // console.log(our_user);

  const scrollToBottom = () => {
    const objDiv = document.getElementById(room);
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // console.log(our_user);

  return (
    <>
      <div className="flex-1 w-full p-3 shadow-lg rounded-md flex flex-col gap-y-2 bg-blue-200 ">
        {/* first */}
        <div className="pb-2 border-b border-gray-400 flex items-center justify-between">
          <div>
            <p className="font-semibold text-[18px] flex items-center gap-x-2">
              <TiMessages />
              Live Chat
            </p>
          </div>
          <div className="w-8 h-8 p-2 rounded-full bg-slate-700 text-white flex items-center justify-center relative">
            {our_user.from === null ? (
              ""
            ) : our_user.image === "" ||
              our_user.image === null ||
              our_user.image === undefined ? (
              our_user?.from[0]?.toUpperCase()
            ) : (
              <Image
                className="rounded-full"
                alt="/"
                // src={our_user?.image}
                src={`${backendHost}/${our_user?.image}`}
                fill
              />
            )}
          </div>
        </div>
        {/* messages box */}
        <div
          className="h-[400px] overflow-y-auto p-2 scrollbar-hide bg-gray-50"
          id={room}
        >
          {messages?.map((msg, i) => {
            let me = false;
            if (our_user !== null) {
              me = msg.user === our_user.user;
            }
            let member = false;
            if (!msg.user?.includes("/")) {
              member = true;
            }

            let clas = me ? "bg-blue-100" : "bg-gray-50";
            let BGclas = me ? "bg-main" : "bg-slate-700";

            return (
              <div
                key={i}
                // dir={me ? "rtl" : "ltr"}
                className="flex items-start gap-x-1 mb-1"
              >
                <p
                  className={`w-8 h-8 shrink-0 p-2 rounded-full text-white flex items-center justify-center ${BGclas} relative`}
                >
                  {!msg.image ? (
                    msg?.from[0]?.toUpperCase()
                  ) : (
                    <Image
                      className="rounded-full"
                      alt="/"
                      src={msg.image}
                      fill
                    />
                  )}
                </p>
                <div>
                  <div
                    className={`px-2 py-[3px] border w-fit rounded flex flex-col ${clas} `}
                  >
                    <div className="text-[11px] font-bold text-main flex items-center gap-x-1">
                      {msg.from}
                      {member && (
                        <span>
                          <BsPatchCheckFill />
                        </span>
                      )}
                    </div>

                    <div>{msg.text}</div>
                  </div>
                  <span className="text-[12px]">{getTime(msg.createdAt)}</span>
                </div>
              </div>
            );
          })}
          {messages.length > 0 && (
            <>
              <hr />
              <div className="text-xs text-main text-center mt-1 ">
                enter chat room to see more
              </div>
            </>
          )}
        </div>
        {/* <div className="pt-2 border-t">
                <form action="" className="flex gap-x-3 items-center">
                  <input
                    type="text"
                    className="flex-1 border px-2 py-[2px] outline-none"
                    placeholder="الرسالة..."
                  />
                  <button className="flex items-center gap-x-2 border-2 px-3 py-[2px] text-white bg-main">
                    أرسل
                    <AiOutlineSend className="scale-x-[-1]" />
                  </button>
                </form>
              </div> */}
        <div className="pt-2 border-t border-gray-400 flex justify-center items-center">
          <button
            onClick={() => enterRoom()}
            className="bg-main px-2 py-[2px] text-white rounded flex items-center gap-x-2 hover:bg-blue-900 duration-500"
          >
            Enter Chat room
            <IoEnterOutline />
          </button>
        </div>
      </div>
      {/* modal */}
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-[9999]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-start justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-4 text-left shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold pb-2 border-b leading-6 text-gray-900"
                  >
                    Enter Chat Room
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="my-3 p-2 flex items-start gap-x-2">
                      <BsExclamationCircleFill
                        size={30}
                        className="text-red-600"
                      />
                      Please provide a username to enter the room (as a guest)
                      or Login to our website.
                    </div>
                    <form action="" className="flex flex-col gap-y-3">
                      <input
                        onChange={(e) => setUserField(e.target.value)}
                        type="text"
                        className="outline-none py-[2px] px-2 border"
                        placeholder="Username..."
                      />
                    </form>
                  </div>

                  <div className="mt-4 pt-2 border-t flex justify-center">
                    <button
                      type="button"
                      className="justify-center rounded-md border border-transparent bg-main text-white px-4 py-[2px] text-sm hover:bg-blue-800  duration-500 flex items-center gap-x-1"
                      onClick={() => getToRoom()}
                    >
                      Enter Room
                      <BiLogIn />
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default StockChat;

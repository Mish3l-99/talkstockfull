import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

import { AiOutlineSend } from "react-icons/ai";
import { BsPatchCheckFill } from "react-icons/bs";
import { IoEnterOutline } from "react-icons/io5";
import { useG } from "../context/OurContext";
import Loading from "./helpers/Loading";

function getTime(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp);

  var hour = a.getHours();
  var min = a.getMinutes();
  var time = hour + ":" + min;
  return time;
}

const Room = ({ socket, our_user, room, name, company }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [firstTime, setFirstTime] = useState(false);

  const router = useRouter();

  const joinRoom = async () => {
    if (room !== "") {
      if (!company) {
        socket.emit("join_room", room);
      } else {
        socket.emit("join_chat", room);
      }
      // socket.on("receive_message", () => {
      //   // console.log("connect");
      // });
    }
  };

  const filterMessage = (mssg) => {
    // filter for bad words here
    if (mssg.includes("bad_words")) {
      toast.error("use Appropriate Language !");
      return "";
    } else {
      return mssg;
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const createdAt = new Date().getTime();
    const readyMessage = filterMessage(message);

    socket.emit("send_message", {
      ...our_user,
      text: readyMessage,
      createdAt,
      room,
    });
    setMessage("");
  };

  // join room and get stored data
  useEffect(() => {
    joinRoom();
    if (!company) {
      socket.on("send_stored", (data) => {
        setMessages(data);
        setFirstTime(true);
      });
    }
  }, []);

  // remain updated with messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((messages) => [...messages, data]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const messagesEndRef = useRef(null);
  const messageBoxRef = useRef(null);

  const scrollToBottom = () => {
    // const objDiv = document.getElementById("messages-container");
    // objDiv.scrollTop = objDiv.scrollHeight;
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const scrollBottomSmooth = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!firstTime) {
      scrollBottomSmooth();
    } else {
      // first time
      scrollToBottom();
    }
  }, [messages]);

  if (our_user.from === null) {
    router.replace("/");
    return;
  }

  // console.log(our_user);

  return (
    <div className="h-screen w-full flex flex-col overflow-auto relative md:bg-blue-200">
      {/* first */}
      <div className="fixed h-[50px] md:h-fit md:sticky w-full top-0 z-[99] pb-1 flex items-center justify-between py-0 md:py-2 bg-blue-200">
        <div className="px-3 my-auto h-fit">
          <p className="font-semibold text-[16px] md:text-[20px]">
            Live Chat - {company ? room : name}
          </p>
        </div>
        <div className="flex items-center gap-x-2 px-3 my-auto h-fit">
          <div className="w-8 h-8 p-2 rounded-full bg-slate-700 text-white flex items-center justify-center relative">
            {our_user.from === null ? (
              ""
            ) : our_user.image === "" ||
              our_user.image === null ||
              !our_user.image ? (
              our_user?.from[0]?.toUpperCase()
            ) : (
              <Image
                className="rounded-full"
                alt="/"
                src={our_user?.image}
                fill
              />
            )}
          </div>
          <div>
            <Link href="/">
              <div className="flex items-center gap-x-1 py-[1px] px-1 md:px-2 bg-gray-50 rounded">
                <span className="hidden md:block">Exit</span>
                <IoEnterOutline />
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* messages box */}
      <div
        id="messages-container"
        className="absolute md:sticky md:my-0 top-[55px] bottom-[55px] right-0 left-0 w-full flex-1 overflow-y-auto pt-[3px] scrollbar-hide md:px-2 "
      >
        <div className="px-2 pt-1 rounded bg-white min-h-full h-auto">
          {!messages ? (
            <div>
              <Loading />
            </div>
          ) : messages?.length > 0 ? (
            messages?.map((msg, i) => {
              let me = msg.user === our_user.user;
              let clas = me ? "bg-blue-100" : "bg-gray-50";
              let BGclas = me ? "bg-main" : "bg-slate-700";

              let member = false;
              if (!msg.user?.includes("/")) {
                member = true;
              }

              return (
                <div
                  key={i}
                  dir=""
                  className="w-full flex items-start gap-x-1 mb-1"
                >
                  <div
                    className={`w-8 h-8 shrink-0 p-2 rounded-full ${BGclas} text-white flex items-center justify-center  relative`}
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
                  </div>
                  <div className="">
                    <div
                      className={`px-2 py-[3px] border rounded flex flex-col ${clas} `}
                    >
                      <div className="text-[11px] font-bold text-main flex items-center gap-x-1">
                        {msg.from}
                        {member && (
                          <span>
                            <BsPatchCheckFill />
                          </span>
                        )}
                      </div>

                      <div className="">{msg.text}</div>
                    </div>
                    <span className="text-[12px]">
                      {getTime(msg.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center items-center h-full">
              No Messages Yet !
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="fixed h-[50px] md:h-fit md:sticky w-full bottom-0 left-0 right-0 p-2 border-t bg-blue-200 z-[99]">
        <form
          action=""
          autoComplete="off"
          className="flex gap-x-3 items-center"
        >
          <input
            id="input_area"
            ref={messageBoxRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            // type="search"
            className="flex-1 w-full border px-2 py-1 outline-none "
            placeholder="Type here..."
            // aria-autoComplete="both"
            aria-haspopup="false"
            autoComplete="off"
          />
          <button
            onClick={(e) => sendMessage(e)}
            className="flex items-center gap-x-2 border-2 px-3 py-[3px] text-white bg-main"
          >
            <span className="hidden md:block">Send</span>
            <AiOutlineSend size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Room;

import axios from "axios";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { CiDiscount1 } from "react-icons/ci";
import { MdHowToVote } from "react-icons/md";
import { useG } from "../context/OurContext";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST;

function getDate(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp);
  var year = a.getFullYear();
  var month = a.getMonth() + 1;
  var date = a.getDate();
  if (month <= 9) {
    month = "0" + month;
  }
  if (date <= 9) {
    date = "0" + date;
  }
  // var hour = a.getHours();
  // var min = a.getMinutes();
  var time = date + "-" + month + "-" + year;
  return time;
}

const Voting = ({
  name,
  name_t,
  voting_collection,
  lv_field,
  local_voted,
  local_lvDate,
}) => {
  const [voting, setVoting] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [voted, setVoted] = useState("none");

  const { user, updateUserLastV } = useG();

  const userVoteGetting = () => {
    // get actual user vote
    const todayDate = getDate(new Date().getTime());

    if (user !== null) {
      const lastVDate = getDate(new Date(user[lv_field]).getTime());
      if (lastVDate === todayDate) {
        setVoted(localStorage.getItem(local_voted));
        setShow(true);
      }
    } else {
      const lastVDate = localStorage.getItem(local_lvDate);
      if (lastVDate === todayDate) {
        setVoted(localStorage.getItem(local_voted));
        setShow(true);
      }
    }
  };

  const setVotingValues = (response) => {
    const total = response.voters_up + response.voters_down;
    const up = Math.round((response.voters_up * 100) / total);
    const down = Math.round((response.voters_down * 100) / total);

    setVoting({ up, down, total });
  };

  const getVoting = async () => {
    const todayDate = getDate(new Date().getTime());

    axios
      .post(`${backendHost}/votings/one`, {
        day: todayDate,
        stock: voting_collection,
      })
      .then((res) => {
        if (res.data.success) {
          setVotingValues(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // actual user vote showing if voted today
    userVoteGetting();
  };

  useEffect(() => {
    setVoting();
    setShow(false);
    // localStorage.clear();
  }, [user]);

  useEffect(() => {
    getVoting();
  }, [show, user]);

  const validDayTime = () => {
    const newDate = new Date();
    const dayName = newDate.toLocaleString("en-us", {
      weekday: "long",
    });
    var hour = newDate.getUTCHours();

    // from 9 to 4, added 5 cuz hour is in gmt
    console.log(hour);
    if (
      dayName !== "Sunday" &&
      dayName !== "Saturday" &&
      hour >= 14 &&
      hour <= 21
    ) {
      return true;
    } else {
      return false;
    }
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleTweet = () => {
    if (voted !== "none" && voting) {
      const url = `https://twitter.com/intent/tweet?url=https%3A%2F%2Ftalkstocklive.com&text=My%20Vote%20Today%20is%20${
        voted === "up" ? "Green" : "Red"
      }%20For%20${name_t}%20stock%20market%20(%20${
        voting.up
      }%25%20Green%20-%20${voting.down}%25%20Red%20)`;

      openInNewTab(url);
    } else {
      toast.error("You must vote first !");
    }
  };

  const allowedV = () => {
    const timeNow = new Date().getTime();
    const todayDate = getDate(timeNow);
    if (user !== null) {
      // const res = localStorage.getItem(local_lvDate);
      // if (res === null || res !== todayDate) {

      // } else {
      //   return false;
      // }

      const lastVDate = getDate(user[lv_field]);
      return !(lastVDate === todayDate);
      // localStorage.setItem(local_lvDate, todayDate);
    } else {
      const res = localStorage.getItem(local_lvDate);
      if (res === null || res !== todayDate) {
        localStorage.setItem(local_lvDate, todayDate);
        return true;
      } else {
        return false;
      }
    }
  };

  const updateVotes = (which) => {
    const todayDate = getDate(new Date().getTime());
    axios
      .post(`${backendHost}/votings/update`, {
        day: todayDate,
        stock: voting_collection,
        which,
      })
      .then((res) => {
        if (res.data.success) {
          setVotingValues(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const voteUp = async () => {
    if (validDayTime()) {
      setLoading(true);
      if (localStorage.getItem(local_voted) !== null) {
        setVoted(localStorage.getItem(local_voted));
      }
      const todayDate = getDate(new Date().getTime());

      if (allowedV()) {
        updateVotes("up");
        // updateUser_lv();
        updateUserLastV(lv_field);
        setVoted("up");
        localStorage.setItem(local_voted, "up");
      } else {
        toast.error("Voting is allowed once a day !");
      }

      setShow(true);
      setLoading(false);
    } else {
      toast.error("Voting is not allowed Today !");
    }
  };

  const voteDown = async () => {
    if (validDayTime()) {
      setLoading(true);
      if (localStorage.getItem(local_voted) !== null) {
        setVoted(localStorage.getItem(local_voted));
      }
      const todayDate = getDate(new Date().getTime());

      if (allowedV()) {
        updateVotes("down");
        // updateUser_lv();
        updateUserLastV(lv_field);
        setVoted("down");
        localStorage.setItem(local_voted, "down");
      } else {
        toast.error("Voting is allowed once a day !");
      }

      setShow(true);
      setLoading(false);
    } else {
      toast.error("Voting is not allowed Today !");
    }
  };

  return (
    <div className="w-full flex-1 p-4 bg-blue-200 mb-2 rounded-lg">
      <div className="flex items-center justify-between text-xl mb-4">
        <div>
          <div className="flex items-center gap-x-2">
            <span>
              <MdHowToVote />
            </span>
            <h1 className="text-2xl">Voting :</h1>
          </div>
          <div className="flex items-center gap-x-1 text-sm">
            <CiDiscount1 />
            <span className="flex items-center gap-x-2">
              Number of Voters :
              {loading ? (
                <div>
                  <Image
                    alt="/"
                    src="/images/icons/loader.gif"
                    height={15}
                    width={15}
                    className="mx-auto"
                  />
                </div>
              ) : (
                voting && <span>{voting.total}</span>
              )}
            </span>
          </div>
        </div>
        <div>
          <button
            onClick={() => handleTweet()}
            className="py-[2px] text-sm px-3 text-white rounded-full bg-[#1DA1F2] flex items-center gap-x-2 hover:shadow-md"
          >
            <BsTwitter />
            Tweet
          </button>
        </div>
      </div>
      <div className="">
        <div className="mb-2">
          <p>Do you think {name} stock is Green or Red for Today ?</p>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <div
            onClick={() => voteUp()}
            className={
              voted === "up" ? "group up_voted bg-green-500" : "group up_voted"
            }
          >
            <AiOutlineUpCircle
              className={
                voted === "up"
                  ? "text-black group-hover:text-black"
                  : "text-green-500 group-hover:text-black"
              }
            />
            Vote
          </div>

          <div
            onClick={() => voteDown()}
            className={
              voted === "down"
                ? "group down_voted bg-red-500"
                : "group down_voted"
            }
          >
            <AiOutlineDownCircle
              className={
                voted === "down"
                  ? "text-black group-hover:text-black"
                  : "text-red-500 group-hover:text-black"
              }
            />
            Vote
          </div>
        </div>
        <div className="mt-2 flex-1 w-full h-8 bg-gray-400 rounded-full overflow-hidden">
          {show && voting && !isNaN(voting.up) && (
            <div className="w-full flex h-8 text-white text-sm bg-gray-500 rounded-full">
              <div
                className="bg-green-600 h-full w-full flex items-center justify-center rounded-l-full"
                style={{
                  width: `${voting.up}%`,
                }}
              >
                {voting.up !== 0 ? `%${voting.up}` : ""}
              </div>
              <div
                className="bg-red-600 h-full w-full flex items-center justify-center rounded-r-full"
                style={{
                  width: `${voting.down}%`,
                }}
              >
                {voting.down !== 0 ? `%${voting.down}` : ""}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Voting;

import Head from "next/head";
import React, { useEffect } from "react";
import Room from "../../components/Room";
import RoomLayout from "../../components/helpers/RoomLayout";
import { useG } from "../../context/OurContext";

import { isIOS, isSafari, isChrome } from "react-device-detect";
// import RoomIPhone from "../components/helpers/RoomIPhone";
import MobileRoom from "../../components/helpers/MobileRoom";
import { useRouter } from "next/router";

import io from "socket.io-client";

const socketHost = process.env.NEXT_PUBLIC_BACKEND_SOCKET_SERVER_HOST;
const backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST;

const socket = io.connect(backendHost);
// const socket = io.connect(socketHost);

// console.log();

const RoomPage = ({ room_code, name }) => {
  const { user } = useG();
  //   const router = useRouter();

  const localUser = {
    user: localStorage.getItem("our_user_user"),
    from: localStorage.getItem("our_user_from"),
    image: localStorage.getItem("our_user_image"),
  };

  let our_user;

  if (user === null) {
    our_user = localUser;
  } else {
    our_user = { user: user._id, from: user.username, image: user.image };
  }

  // console.log(our_user);

  // useEffect(() => {
  //   // window.addEventListener("resize", () => {
  //   //   console.log(window.innerHeight, window.innerWidth);
  //   // });
  //   console.log(window.innerHeight);
  // }, []);

  //   const stock = router.query.which;

  //   if (!stock) {
  //     router.push("/");
  //     return;
  //   }

  return (
    <>
      <Head>
        <title>{name} Chat Room</title>
        <meta
          name="viewport"
          content={`width=device-width,height=${window.innerHeight}, initial-scale=1.0,user-scalable=no`}
        ></meta>
        <link rel="icon" href="/images/logo/favi-room.png" />
      </Head>
      <main className=" ">
        {window.innerWidth > 500 ? (
          <RoomLayout>
            <Room
              our_user={our_user}
              room={room_code}
              name={name}
              socket={socket}
              company={false}
            />
          </RoomLayout>
        ) : (
          <MobileRoom
            our_user={our_user}
            room={room_code}
            name={name}
            socket={socket}
            company={false}
          />
        )}
        {/* <BigRoom our_user={our_user} room={room_code} name={name} /> */}
      </main>
    </>
  );
};

export default RoomPage;

export async function getServerSideProps(context) {
  const room_code = context.query.which;
  //   console.log(room_code);
  let name;
  if (room_code === "djia_messages") {
    name = "DJIA";
  } else if (room_code === "sp_messages") {
    name = "S&P 500";
  } else {
    name = "NASDAQ";
  }
  return {
    props: {
      name,
      room_code,
    }, // will be passed to the page component as props
  };
}

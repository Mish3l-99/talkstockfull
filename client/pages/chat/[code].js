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

const socket = io.connect(socketHost);

// console.log();

const CompanyRoomPage = ({ room_code }) => {
  const { user } = useG();
  console.log(user);
  //   const router = useRouter();

  let our_user;

  our_user = { user: user?._id, from: user?.username, image: user?.image };

  // console.log(our_user);

  // useEffect(() => {
  //   // window.addEventListener("resize", () => {
  //   //   console.log(window.innerHeight, window.innerWidth);
  //   // });
  //   console.log(window.innerHeight);
  // }, []);

  //   const stock = router.query.which;

  //   if (!user) {
  //     router.push("/");
  //     return;
  //   }

  return (
    <>
      <Head>
        <title>{room_code} Chat Room</title>
        <meta
          name="viewport"
          content={`width=device-width,height=${window.innerHeight}, initial-scale=1.0,user-scalable=no`}
        ></meta>
        <link rel="icon" href="/images/logo/favi-room.png" />
      </Head>
      {user !== null && (
        <main className=" ">
          {window.innerWidth > 500 ? (
            <RoomLayout>
              <Room
                our_user={our_user}
                room={room_code}
                socket={socket}
                company={true}
              />
            </RoomLayout>
          ) : (
            <MobileRoom
              our_user={our_user}
              room={room_code}
              socket={socket}
              company={true}
            />
          )}
        </main>
      )}
    </>
  );
};

export default CompanyRoomPage;

export async function getServerSideProps(context) {
  const room_code = context.query.code;

  return {
    props: {
      room_code,
    }, // will be passed to the page component as props
  };
}

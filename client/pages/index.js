import Head from "next/head";
import Image from "next/image";
import About from "../components/About";
import ComapyRooms from "../components/ComapyRooms";
import Footer from "../components/Footer";
import AdsArea from "../components/helpers/AdsArea";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import OneStock from "../components/OneStock";

// name_t is to escape special characters for twitter share url
const djiaObj = {
  name: "Dow Jones",
  name_t: "Dow Jones",
  code: "^DJI",
  lv_field: "lv_djia",
  voting_collection: "djia_voting",
  room: "djia_messages",
  local_voted: "djia_voted",
  local_lvDate: "djia_lastVoted",
  divId: "djia",
};

const sandpObj = {
  name: "S&P 500",
  name_t: "S" + "%26" + "P 500",
  code: "^GSPC",
  lv_field: "lv_sp",
  voting_collection: "sp_voting",
  room: "sp_messages",
  local_voted: "sp_voted",
  local_lvDate: "sp_lastVoted",
  divId: "sandp",
};

const nasdaqObj = {
  name: "NASDAQ",
  name_t: "NASDAQ",
  code: "^IXIC",
  lv_field: "lv_nas",
  voting_collection: "nas_voting",
  room: "nas_messages",
  local_voted: "nas_voted",
  local_lvDate: "nas_lastVoted",
  divId: "nasdaq",
};

const nasdaq_hundredObj = {
  name: "NASDAQ 100",
  name_t: "NASDAQ 100",
  code: "NQ=F",
  lv_field: "lv_nashun",
  voting_collection: "nashun_voting",
  room: "nashun_messages",
  local_voted: "nashun_voted",
  local_lvDate: "nashun_lastVoted",
  divId: "nasdaqhun",
};

const nyseObj = {
  name: "NYSE Composite",
  name_t: "NYSE Composite",
  code: "^NYA",
  lv_field: "lv_nyse",
  voting_collection: "nyse_voting",
  room: "nyse_messages",
  local_voted: "nyse_voted",
  local_lvDate: "nyse_lastVoted",
  divId: "nyse",
};

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Talk Stock Live</title>
        <meta
          name="description"
          content="A platform where you can talk and discuss about stock market in USA"
        />
        <link rel="icon" href="/images/icons/live.gif" />
        {/* <link rel="icon" href="/images/logo/favi.png" /> */}
      </Head>

      <main className="">
        <Navbar />
        <Hero />
        <AdsArea />
        <OneStock stock={djiaObj} />
        <AdsArea />
        <OneStock stock={sandpObj} />
        <AdsArea />
        <OneStock stock={nasdaqObj} />
        <AdsArea />
        <OneStock stock={nasdaq_hundredObj} />
        <AdsArea />
        <OneStock stock={nyseObj} />
        <AdsArea />
        <ComapyRooms />
      </main>

      <footer className="">
        <About />
        <Footer />
      </footer>
    </div>
  );
}

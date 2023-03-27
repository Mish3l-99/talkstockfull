import Head from "next/head";
import React from "react";
import About from "../components/About";
import Footer from "../components/Footer";
import Loading from "../components/helpers/Loading";
import Navbar from "../components/Navbar";
import UserDetails from "../components/UserDetails";
import { useG } from "../context/OurContext";

const UserPage = () => {
  const { user } = useG();
  return (
    <div>
      <Head>
        <title>Talk Stock Live</title>

        <link rel="icon" href="/images/logo/favi.png" />
      </Head>
      <main>
        <Navbar />
        {user === null ? <Loading /> : <UserDetails user={user} />}

        <About />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default UserPage;

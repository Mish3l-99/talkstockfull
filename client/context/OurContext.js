import axios from "axios";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST;

const OurContext = createContext({});

export const useG = () => useContext(OurContext);

export const OurContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [ended, setEnded] = useState(true);

  const router = useRouter();

  const getUser = (id) => {
    axios
      .get(`${backendHost}/users/one/${id}`)
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error !");
      });
  };

  useEffect(() => {
    if (user !== null) {
      localStorage.setItem("tsl_uid", user._id);
    } else {
      const id_from_local = localStorage.getItem("tsl_uid");
      if (id_from_local) {
        getUser(id_from_local);
      }
    }
    setLoading(false);
    // localStorage.clear();
  }, [user]);

  const setLocalParams = (from, user, image) => {
    let img = image;
    if (!image || image === null) {
      img = "";
    }
    localStorage.setItem("our_user_from", from);
    localStorage.setItem("our_user_user", user);
    localStorage.setItem("our_user_image", img);
  };

  const updateUserLastV = async (field) => {
    if (user) {
      const timeNow = new Date().getTime();
      axios
        .post(`${backendHost}/users/vote/${user._id}`, {
          field,
          timeNow,
        })
        .then((res) => {
          if (res.data.success) {
            console.log("success");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setUser((user) => ({ ...user, [field]: timeNow }));
    }
  };

  const fillLocalUser = (uName) => {
    if (uName !== localStorage.getItem("our_user_from")) {
      var uniq = uName + "/" + new Date().getTime();
      setLocalParams(uName, uniq, null);
    }
    // const localUser = {
    //   user: localStorage.getItem("our_user_user"),
    //   from: localStorage.getItem("our_user_from"),
    //   image: localStorage.getItem("our_user_image"),
    // };
    // console.log(uName, localUser);
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("tsl_uid");
    toast.success("Successfully Logged out !");
    router.replace("/");
    return;
  };

  // console.log(user);

  return (
    <OurContext.Provider
      value={{
        user,
        setUser,
        fillLocalUser,
        updateUserLastV,
        logout,
      }}
    >
      {loading ? null : children}
    </OurContext.Provider>
  );
};

import Loading from "./helpers/Loading";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { IoEnterOutline } from "react-icons/io5";
import { useG } from "../context/OurContext";
import { MdSystemUpdateAlt } from "react-icons/md";
import { AiOutlineFileImage } from "react-icons/ai";
import axios from "axios";

var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST;

const UserDetails = ({ user }) => {
  const { ended, setUser } = useG();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    pass: "",
    pass_2: "",
    username: user?.username,
    email: user?.email,
  });

  useEffect(() => {
    setLoading(false);
  }, [ended]);

  const [progress, setProgress] = useState();
  const [preview, setPreview] = useState();

  const handleUpdateData = async (e) => {
    e.preventDefault();
    setLoading(true);

    let username = user.username;
    let email = user.email;
    let password = user.password;

    if (form.username != "") {
      username = form.username;
    }

    if (
      form.email != "" &&
      form.email.includes("@") &&
      form.email.includes(".")
    ) {
      email = form.email;
    }

    if (form.pass !== "") {
      if (form.pass.length < 8) {
        toast.error("Too short Password !");
        setLoading(false);
      } else if (form.pass !== form.pass_2) {
        toast.error("Passwords not matching !");
        setLoading(false);
      } else {
        password = bcrypt.hashSync(form.pass, salt);
      }
    }

    const file = e.target[0].files[0];
    console.log(file);

    axios
      .patch(
        `${backendHost}/users/update/${user._id}`,
        {
          username,
          email,
          password,
          img: file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          toast.success("successfully updated profile!");
          setUser(res.data.data);
        }
      })
      .catch((err) => {
        // toast.error("Error !");
        console.log(err);
        setLoading(false);
      });
  };

  const onTyping = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  return (
    <div className="py-8 mb-24">
      <div className="container">
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col md:flex-row gap-x-4 md:gap-x-8 items-center justify-center md:items-start">
            <div className="mb-2 w-24 h-24 md:w-36 md:h-36 p-2 rounded-full bg-slate-700 text-white flex items-center justify-center relative">
              {user.image ? (
                <Image
                  className="rounded-full z-[998]"
                  alt="/"
                  src={`${backendHost}/${user.image}`}
                  fill
                />
              ) : (
                <div className="p-6 text-lg">
                  {user?.username[0]?.toUpperCase()}
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-col items-center md:items-start">
              <p className="text-xl md:text-2xl font-bold">{user.username}</p>
              <p className="text-lg md:text-xl">{user.email}</p>
            </div>
          </div>
          <div className="pt-4 border-t flex flex-col justify-center items-center">
            <p className="font-semibold text-lg">Update Data</p>
            <form
              action=""
              onSubmit={handleUpdateData}
              className="mt-4 gap-x-2 w-full flex flex-col items-center gap-y-2 md:max-w-[600px] mx-auto"
            >
              <div className="grid grid-cols-6 w-full">
                <div className="col-span-2">Profile Picture :</div>
                <div className="col-span-4 w-fit flex relative">
                  <input
                    type="file"
                    className="w-full opacity-0 "
                    id="img_file"
                    onChange={(e) =>
                      setPreview(URL.createObjectURL(e.target.files[0]))
                    }
                  />
                  <div className="w-fit absolute top-0 h-full">
                    <label
                      htmlFor="img_file"
                      className="w-full shadow py-[1px] px-3 rounded bg-gray-100 flex gap-x-2 items-center hover:cursor-pointer"
                    >
                      Choose File
                      <AiOutlineFileImage />
                    </label>
                  </div>
                  <div className="h-6 w-6">
                    {preview && (
                      <img className="h-full w-full" src={preview} alt="/" />
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-6 items-center w-full">
                <div className="col-span-2 ">Username :</div>
                <div className="col-span-4">
                  <input
                    onChange={(e) => onTyping(e)}
                    name="username"
                    value={form.username}
                    type="text"
                    className="w-full border outline-none px-2 py-[2px]"
                    placeholder="Username..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 items-center w-full">
                <div className="col-span-2 ">Email :</div>
                <div className="col-span-4">
                  <input
                    onChange={(e) => onTyping(e)}
                    name="email"
                    value={form.email}
                    type="email"
                    className="w-full border outline-none px-2 py-[2px]"
                    placeholder="Email..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 items-center w-full">
                <div className="col-span-2 ">Password :</div>
                <div className="col-span-4">
                  <input
                    onChange={(e) => onTyping(e)}
                    name="pass"
                    type="password"
                    placeholder="****"
                    className="w-full border outline-none px-2 py-[2px]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-6 items-center w-full">
                <div className="col-span-2 ">Rewrite Password :</div>
                <div className="col-span-4">
                  <input
                    onChange={(e) => onTyping(e)}
                    name="pass_2"
                    type="password"
                    placeholder="****"
                    className="w-full border outline-none px-2 py-[2px]"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="py-[1px] px-3 bg-blue-600 rounded text-white flex items-center gap-x-2 relative"
              >
                Update
                <MdSystemUpdateAlt className="rotate-[180deg]" />
                {/* {loading ? (
                  <Image
                    alt="/"
                    src="/images/icons/loading.gif"
                    height={7}
                    width={16}
                  />
                ) : (
                  <MdSystemUpdateAlt className="rotate-[180deg]" />
                )} */}
              </button>
            </form>
          </div>
          <div className="mt-4 flex gap-x-8 items-center justify-center">
            <button
              onClick={() => enterRoom()}
              className="hidden bg-main px-2 py-[2px] text-white rounded flex items-center gap-x-2 hover:bg-green-900 duration-500"
            >
              Enter Chat room
              <IoEnterOutline />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";

import { HiLogin } from "react-icons/hi";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useG } from "../context/OurContext";
import { BsCheck2Circle } from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import axios from "axios";

var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST;

const Signin = () => {
  const [mode, setMode] = useState("login");
  const router = useRouter();
  useEffect(() => {
    setMode(router.query.mode);
  }, [router.query]);

  return (
    <div className="w-full">
      <div className="container">
        {mode === "login" ? (
          <Login />
        ) : mode === "register" ? (
          <Register />
        ) : mode === "success" ? (
          <Success />
        ) : (
          <Forgot />
        )}
      </div>
    </div>
  );
};

export default Signin;

const Login = () => {
  let [passVisible, setPassVisible] = useState(false);
  let [loading, setLoading] = useState(false);
  let [form, setForm] = useState({ email: "", pass: "" });

  const router = useRouter();

  const { login, ended, setUser } = useG();
  // const { user, signup, login, logout, ended, resetPass } = useG();

  const updateLog = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const handleLogin = () => {
    setLoading(true);
    if (form.email === "" || form.pass === "") {
      toast.error("Empty Fields !");
      setLoading(false);
    } else {
      // login(form);
      axios
        .post(`${backendHost}/users/login`, form)
        .then((res) => {
          if (res.data.success) {
            setLoading(false);
            toast.success("successfully logged in!");
            setUser(res.data.data);
            router.push("/auth?mode=success");
          }
        })
        .catch((err) => {
          if (err.response.data.message === "wrong data") {
            toast.error("wrong credentials !");
            setLoading(false);
          } else {
            toast.error("Error !");
            setLoading(false);
          }
        });
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [ended]);

  return (
    <div className="py-4 w-full">
      <div className="md:max-w-[450px] md:mx-auto border shadow-md p-3">
        <div className="flex items-center gap-x-2 text-lg md:text-xl font-bold mb-6">
          <HiLogin className="scale-x-[-1]" />
          <h1 className="">Log In</h1>:
        </div>
        <hr className="my-2" />
        <form action="" className="flex flex-col gap-y-3">
          <input
            onChange={(e) => updateLog(e)}
            name="email"
            type="email"
            className="outline-none py-[2px] px-2 border"
            placeholder="Email..."
          />
          <div className="relative">
            <input
              onChange={(e) => updateLog(e)}
              name="pass"
              type={passVisible ? "text" : "password"}
              className="outline-none py-[2px] px-2 border w-full"
              placeholder="Password..."
            />
            <div className="absolute right-3 top-0 h-full">
              {/* <AiOutlineEye /> */}
              <div
                onClick={() => setPassVisible(!passVisible)}
                className="flex items-center justify-center h-full"
              >
                {passVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
          </div>
        </form>
        <div>
          <button
            onClick={() => handleLogin()}
            className="mx-auto my-4 justify-center rounded-md bg-main text-gray-100 px-4 py-[2px] text-sm hover:bg-transparent hover:text-black duration-500 border flex items-center gap-x-1"
          >
            Log In
            {!loading ? (
              <BiLogIn />
            ) : (
              <Image
                alt="/"
                src="/images/icons/loading.gif"
                height={8}
                width={20}
              />
            )}
          </button>
        </div>
        {/* <div>
          <Link href="/auth?mode=forgot">
            <button className="flex items-center gap-x-2 underline hover:text-main">
              <RiLockPasswordLine />
              Forgot Password ?
            </button>
          </Link>
        </div> */}
        <div className="flex items-cenetr gap-x-2">
          <FiUserPlus />
          Not a member ?
          <Link href="/auth?mode=register">
            <button className="flex items-center gap-x-2 underline hover:text-main">
              Create An Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Register = () => {
  let [passVisible, setPassVisible] = useState(false);
  let [loading, setLoading] = useState(false);

  const router = useRouter();

  const { setUser } = useG();

  let [form, setForm] = useState({
    username: "",
    email: "",
    pass: "",
    pass_2: "",
  });

  const updateReg = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const registerUser = () => {
    // e.preventDefault();

    setLoading(true);
    if (
      form.username === "" ||
      form.email === "" ||
      form.pass === "" ||
      form.pass_2 === ""
    ) {
      toast.error("Empty Fields !");
      setLoading(false);
    } else if (form.pass !== form.pass_2) {
      toast.error("Passwords not matching !");
      setLoading(false);
    } else if (form.pass.length < 8) {
      toast.error("Too short Password !");
      setLoading(false);
    } else {
      axios
        .post(`${backendHost}/users/new`, {
          username: form.username,
          email: form.email,
          pass: bcrypt.hashSync(form.pass, salt),
        })
        .then((res) => {
          if (res.data.success) {
            setLoading(false);
            toast.success("successfully signed up!");
            setUser(res.data.user);
            router.push("/auth?mode=success");
          }
        })
        .catch((err) => {
          // console.log(err);
          if (err.response.data.message === "email exists") {
            toast.error("Email Exists !");
            setLoading(false);
          } else {
            toast.error("Error !");
            setLoading(false);
          }
        });
    }
  };

  // console.log(router.asPath);

  return (
    <div className="py-4 w-full">
      <div className="md:max-w-[450px] md:mx-auto border shadow-md p-3">
        <div className="flex items-center gap-x-2 text-lg md:text-xl font-bold mb-6">
          <FiUserPlus />
          <h1 className="">Create Account</h1>:
        </div>
        <hr className="my-2" />
        <form action="" className="flex flex-col gap-y-3">
          <input
            onChange={(e) => updateReg(e)}
            name="username"
            type="text"
            className="outline-none py-[2px] px-2 border"
            placeholder="Username..."
          />
          <input
            onChange={(e) => updateReg(e)}
            name="email"
            type="email"
            className="outline-none py-[2px] px-2 border"
            placeholder="Email..."
          />
          <div className="relative">
            <input
              onChange={(e) => updateReg(e)}
              name="pass"
              type={passVisible ? "text" : "password"}
              className="outline-none py-[2px] px-2 border w-full"
              placeholder="Password..."
            />
            <div className="absolute right-3 top-0 h-full">
              {/* <AiOutlineEye /> */}
              <div
                onClick={() => setPassVisible(!passVisible)}
                className="flex items-center justify-center h-full"
              >
                {passVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
          </div>
          <input
            onChange={(e) => updateReg(e)}
            name="pass_2"
            type="password"
            className="outline-none py-[2px] px-2 border"
            placeholder="Rewrite Password..."
          />
        </form>
        <div>
          <button
            onClick={() => registerUser()}
            className="mx-auto my-4 justify-center rounded-md bg-main text-gray-100 px-4 py-[2px] text-sm hover:bg-transparent hover:text-black duration-500 border flex items-center gap-x-1"
          >
            Sign Up
            {!loading ? (
              <BiLogIn />
            ) : (
              <Image
                alt="/"
                src="/images/icons/loading.gif"
                height={8}
                width={20}
              />
            )}
          </button>
        </div>
        {/* <div>
          <Link href="/auth?mode=forgot">
            <button className="flex items-center gap-x-2 underline hover:text-main">
              <RiLockPasswordLine />
              Forgot Password ?
            </button>
          </Link>
        </div> */}
        <div className="flex items-center gap-x-2">
          <FiLogIn />
          Already a member ?
          <Link href="/auth?mode=login">
            <button className="flex items-center gap-x-2 underline hover:text-main">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Forgot = () => {
  let [email, setEmail] = useState("");

  const { ended, resetPass } = useG();

  return (
    <div className="py-4 w-full">
      <div className="md:max-w-[450px] md:mx-auto border shadow-md p-3">
        <div className="flex items-center gap-x-2 text-lg md:text-xl font-bold mb-6">
          <RiLockPasswordLine />
          <h1 className="">Forgot Password</h1>:
        </div>
        <hr className="my-2" />
        <form action="" className="flex flex-col gap-y-3">
          <input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            className="outline-none py-[2px] px-2 border"
            placeholder="Email..."
          />
        </form>
        <div>
          <button
            onClick={() => resetPass(email)}
            className="mx-auto my-4 justify-center rounded-md bg-main text-gray-100 px-4 py-[2px] text-sm hover:bg-transparent hover:text-black duration-500 border flex items-center gap-x-1"
          >
            Reset Password
            <MdPassword />
          </button>
        </div>
        <div>
          <Link href="/auth?mode=login">
            <button className="flex items-center gap-x-2 underline hover:text-main">
              <FiLogIn />
              Login
            </button>
          </Link>
        </div>
        <div className="flex items-center gap-x-2">
          <FiUserPlus />
          Not a member ?
          <Link href="/auth?mode=register">
            <button className="flex items-center gap-x-2 underline hover:text-main">
              Create An Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Success = () => {
  const { user } = useG();
  // console.log(user);
  return (
    <div className="py-4 w-full">
      <div className="md:max-w-[450px] md:mx-auto border shadow-md p-3 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="text-4xl md:text-6xl text-main">
            <BsCheck2Circle />
          </div>
          <p className="text-xl md:text-2xl mt-4">Successfully Done !</p>
        </div>
      </div>
    </div>
  );
};

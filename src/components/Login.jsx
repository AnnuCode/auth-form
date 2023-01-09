// hit the login endpoint of the backend api via axios.post
//

import { useState, useEffect, useRef } from "react";
import axios from "../api/axios";

const Login_URL = "/auth";

const Login = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    //async function always returns a promise
    e.preventDefault();
    console.log(user, pwd);
    try {
      const response = await axios.post(
        //await uses yield statements
        Login_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setSuccess(true);
      console.log(response?.data);
      console.log(JSON.stringify(response));
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (error.response?.status === 401) {
        setErrMsg("Missing username or password");
      } else {
        setErrMsg("Login failed");
      }
    }
  };

  return (
    <>
      {success ? (
        <div className="max-w-2xl mx-auto min-h-screen flex flex-col justify-center items-center bg-black rounded-lg select-none">
          <h1 className="text-white"> Logged in successfully! </h1>
        </div>
      ) : (
        <form
          className="max-w-2xl mx-auto min-h-screen flex flex-col justify-center items-center bg-black rounded-lg"
          onSubmit={handleSubmit}
        >
          {errMsg && (
            <div>
              <p className="text-white">{errMsg}</p>
            </div>
          )}
          <div className="flex flex-col justify-center items-center">
            <label
              htmlFor="username"
              className="text-white font-semibold text-lg px-8"
            >
              Username
            </label>
            <input
              htmlFor="username"
              ref={userRef}
              type="text"
              className="border-[1.5px] border-white bg-black rounded-lg px-14 text-white"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center items-center py-4">
            <label
              htmlFor="password"
              className="text-white font-semibold text-lg px-8"
            >
              Password
            </label>
            <input
              htmlFor="password"
              type="password"
              className="border-[1.5px] border-white bg-black rounded-lg px-14 text-white"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
          <div className="py-4">
            <button className="border-[1px] rounded-lg border-white px-4 py-1.5 text-white">
              Submit
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Login;

import { useState, useRef, useEffect } from "react";
import axios from "./api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = "/register";

function App() {
  const [count, setCount] = useState(0);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [validFocus, setValidFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // console.log(errMsg);

  useEffect(() => {
    //setting the focus to the username field as the app loads
    userRef.current.focus();
  }, []);
  useEffect(() => {
    //validating the username everytime someone types in username
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    //validating the password and matchPassword and keeping in sync by defining them in the same useEffect block
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    //resetting the error message which is essential as per the conditional in the return block
    setErrMsg("");
  }, [user, pwd, matchPwd]); //effects run after the initial render, so this effect will run too.

  const isDisabled = !validName || !validPwd || !validMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user, pwd);

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      //clear input fields

      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));

      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else if (error.response?.status === 409) {
        setErrMsg("Username already taken");
      } else {
        setErrMsg("Registration failed");
      }
      // errRef.current.focus()
    }
  };

  return (

    <>
   {

   success? (
    <section  className="max-w-2xl mx-auto min-h-screen flex flex-col justify-evenly items-center bg-black rounded-lg" >
      <h1 className="text-white">User successfully registered!</h1>
    </section>

   ):
    

  (  <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto min-h-screen flex flex-col justify-evenly items-center bg-black rounded-lg"
    >
      <div>
        <p
          className={
            errMsg
              ? "bg-pink-400 text-white font-bold p-4 mb-4"
              : "relative left-[9999px]"
          }
        >
          {errMsg}
        </p>
      </div>

      <div className="flex flex-col items-center justify-between">
        <label
          htmlFor="username"
          className="text-white font-semibold text-lg px-8"
        >
          Username
        </label>
        <input
          ref={userRef}
          id="username"
          type="text"
          autoComplete="off"
          required
          value={user}
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          className="border-[1.5px] border-white bg-black rounded-lg px-14 text-white"
          onChange={(e) => setUser(e.target.value)}
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p
          id="uidnote"
          className={
            userFocus && user && !validName
              ? "text-[10px] rounded-lg bg-white text-black relative p-1 bottom-[-10px]"
              : "absolute left-[-9999px]"
          }
        >
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
      </div>
      <div className="flex flex-col items-center justify-between">
        <label
          htmlFor="password"
          className="text-white font-semibold text-lg px-8 "
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={pwd}
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onChange={(e) => setPwd(e.target.value)}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          className="border-[1.5px] border-white bg-black rounded-lg px-14 text-white"
        />
        <p
          id="pwdnote"
          className={
            pwdFocus && !validPwd
              ? "text-[10px] rounded-lg bg-white text-black relative p-1 bottom-[-10px]"
              : "absolute left-[-9999px]"
          }
        >
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>
      </div>
      <div className="flex flex-col items-center justify-between">
        <label
          htmlFor="matchpassword"
          className="text-white font-semibold text-lg"
        >
          Match Password
        </label>

        <input
          id="matchpassword"
          type="password"
          required
          value={matchPwd}
          onChange={(e) => setMatchPwd(e.target.value)}
          onFocus={() => setValidFocus(true)}
          onBlur={() => setValidFocus(false)}
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          className="border-[1.5px] border-white bg-black rounded-lg px-14 text-white"
        />
        <p
          id="confirmnote"
          className={
            validFocus && !validMatch
              ? "text-[10px] rounded-lg bg-white text-black relative p-1 bottom-[-10px]"
              : "absolute left-[-9999px]"
          }
        >
          Must match the first password input field.
        </p>
      </div>
      <button
        disabled={isDisabled}
        type="submit"
        className={
          isDisabled
            ? "text-purple-500 border-[1px] border-white rounded-md px-4 py-[1.5]"
            : "text-red-400 border-[1px] border-white rounded-md px-4 py-[1.5]"
        }
      >
        Sign Up
      </button>
    </form>
  )
}
    </>
  );
}

export default App;

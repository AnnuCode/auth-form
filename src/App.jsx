import { useState, useRef, useEffect } from "react";


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function App() {
  const [count, setCount] = useState(0);
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [validFocus, setValidFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(()=>{                      //setting the focus to the username field as the app loads
    userRef.current.focus()
  }, [])
  useEffect(()=>{                        //validating the username everytime someone types in username
    setValidName(USER_REGEX.test(user))
  }, [user])

  useEffect(()=>{             //validating the password and matchPassword and keeping in sync by defining them in the same useEffect block
    setValidPwd(PWD_REGEX.test(pwd))
    setValidMatch(pwd === matchPwd)
  }, [pwd, matchPwd])

  useEffect(()=>{              //resetting the error message which is essential as per the conditional in the return block
    setErrMsg('')
  }, [user, pwd, matchPwd])



  return (
    <div className="max-w-2xl mx-auto min-h-screen flex flex-col justify-evenly items-center bg-black rounded-lg">
      
      <div>
        <p className={errMsg? 'bg-pink-400 text-red-600 font-bold p-4 mb-4': 'relative left-[9999px]'} >{errMsg}</p>
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
          className="border-[1.5px] border-white bg-black rounded-lg px-14 text-white"
          onChange={(e)=> setUser(e.target.value)}
        />
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
          className="border-[1.5px] border-white bg-black rounded-lg px-14 text-white"
        />
      </div>
      <div className="flex flex-col items-center justify-between">
        <label
          htmlFor="nationality"
          className="text-white font-semibold text-lg"
        >
          Match Password
        </label>

        <input
          id="matchpassword"
          type="password"
          className="border-[1.5px] border-white bg-black rounded-lg px-14 text-white"
        />
      </div>
    </div>
  );
}

export default App;

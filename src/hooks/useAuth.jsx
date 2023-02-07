//export a hook which returns the global state values without setting the context in every component wherever useAuth will
// be used

import AuthContext from "../context/AuthProvider"
import { useContext } from "react"

const useAuth = ()=>{
    return useContext(AuthContext)   
}
export default useAuth
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./components/Layout";
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    // <>
    //   {/* <Register />               */}
    //   <Login />
    //   <Home/>
    // </>
    <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Home/>} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"


const App = () => {
  return (
   <BrowserRouter>
      <Routes>
        <Route index element = {<Auth />}></Route>
        {/* <Route path='/auth' element = {<Auth/>}></Route> */} {/* NOT REQUIRED BECAUSE DEFAULT PAGE IS AUTH  */}
        <Route path='/dashboard' element = {<Dashboard/>}></Route>
      </Routes>
   </BrowserRouter>
  )
}

export default App
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./screens/Home"
import ErrorScreen from "./screens/ErrorScreen"
import Register from "./screens/Register"
import Login from "./screens/Login"
import Profile from "./screens/Profile"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <ErrorScreen/>
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
])

function App() {
  

  return (
    <RouterProvider router={router}/>
  )
}

export default App

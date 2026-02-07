import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './Admin/Login.jsx'
import Home from './Home.jsx'
import AdminHome from './Admin/AdminHome.jsx'
import ChangePassword from './Admin/ChangePassword.jsx'
import AdminForgotPassword from './Admin/ForgotPassword.jsx'
import AdminResetPassword from './Admin/AdminResetPassword.jsx'
import AddCategory from './Admin/AddCategory.jsx'
import AddProduct from './Admin/AddProduct.jsx'
import UserHome from './User/UserHome.jsx'
import UserLogin from './User/UserLogin.jsx'
import UserRegistration from './User/UserRegistration.jsx'
import Shop from './Pages/Shop.jsx'
import Categories from './Pages/Categories.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "admin",
        children: [
          { path: "login", element: <Login /> },
          { path: "home", element: <AdminHome /> },
          { path: "change-password", element: <ChangePassword /> },
          { path: "forgot-password", element: <AdminForgotPassword /> },
          { path: "reset-password-link/:resetToken", element: <AdminResetPassword /> },
          { path: "add-category", element: <AddCategory /> },
          { path: "add-product", element: <AddProduct /> },
        ]
      },
      {
        path: "user",
        children: [
          { path: "login", element: <UserLogin /> },
          { path: "register", element: <UserRegistration /> },
          { path: "home", element: <UserHome /> }
        ]
      },
      { path: "shop", element: <Shop /> },
      { path: "categories", element: <Categories /> }

    ],

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

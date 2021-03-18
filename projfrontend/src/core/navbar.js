import React, {Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated,signout } from '../auth/helper'



const activeTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Navbar = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link style={activeTab(history, "/")} className="nav-link " to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={activeTab(history, "/cart")}
          className="nav-link "
          to="/cart"
        >
          Cart
        </Link>
      </li>

{isAuthenticated() && isAuthenticated().user.role === 0 &&(
   
  <li className="nav-item">
  <Link
    style={activeTab(history, "/user/dashboard")}
    className="nav-link "
    to="/user/dashboard"
  >
    U.Dashboard
  </Link>
</li>
)
}
     
{isAuthenticated() && isAuthenticated().user.role === 1 && (

  <li className="nav-item">
  <Link
    style={activeTab(history, "/admin/dashboard")}
    className="nav-link "
    to="/admin/dashboard"
  >
    A. Dashboard
  </Link>
</li>
)}
    
     {!isAuthenticated() && (
        <Fragment>

        <li className="nav-item">
          <Link
            style={activeTab(history, "/signup")}
            className="nav-link"
            to="/signup"
          >
            Sign Up
          </Link>
        </li>
  
  
        <li className="nav-item">
          <Link
            style={activeTab(history, "/signin")}
            className="nav-link "
            to="/signin"
          >
            Sign In
          </Link>
        </li>
        
        </Fragment>
     )}



      {/* Instead of if and else */}
      {isAuthenticated() &&  (
      <li className="nav-item">
       <span  className="nav-link text-warning " onClick={()=>{ signout(()=>{
            history.push('/')
        })
        }}> 
          Sing Out
          </span>
      </li>
      )}




    </ul>
  </div>
);

export default withRouter(Navbar);

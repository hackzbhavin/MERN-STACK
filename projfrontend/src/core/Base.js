import React from "react";
import Navbar from './navbar';


const Base = ({
  title = "My title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children
}) => (

  <div>
  {/* This is navbar imported above from file navbar js */}
  <Navbar />
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead"> {description}</p>
      </div>
      <div className={className}> {children}</div>
    </div>
   
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>Any questions contact please</h4>
        <button className="btn btn-warning btn-lg " type=""> Contact me</button>
      </div>
    </footer>
  
  </div>
);

export default Base;

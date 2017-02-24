import React from "react";
import "./style.css";

const About = () => (
  <div className="container-fluid">
    <h2>About</h2>
    <div className="row">
      <div className="col-md-5 about-section">
        <h3>What</h3>
        <p>
        This is a single page web application that analyzes the URLs found in a web page for validity.
        </p>
        <p>
        URLs are extracted from page content using regex based on Appendices A & B of RFC 3986
        </p>
        <p>
        A URL is considered valid if it is well-formed and if a request made to it results in a valid response.
        </p>
        <p>
        URLs found are listed and their status is updated as soon as the server is able to determine their status.
        </p>
      </div>

      <div className="col-md-5 about-section">
        <h3>How</h3>
        <p>
        Most of the React and express implementation is straight-forward. 
        The "fun" part was using highland on the server and oboe on the client 
        so that the results of checking each URL found in a page would be streamed 
        to the client as JSON and displayed to the user immediately.
        </p>
        <b>Notable tech used in this demo:</b>
        <h4>Client</h4>
        <p>
          React, create-react-app, react-router, redux, redux-thunk, oboe, Webpack, Bootstrap, Font Awesome.
        </p>        
        <h4>Server</h4>
        <p>
          Node.js, express, highland, when, lodash, mocha, chai, nock
        </p>
      </div>
    </div>
  </div>
);

export default About;
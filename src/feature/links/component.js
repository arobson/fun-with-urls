import "./style.css";
import React from "react";
import _ from "lodash";
import Address from "../address/component";
import Status from "../status/component";

const LinkList = ( { status, urls } ) => {
  const list = _.map( urls, (u) =>
    <Address
      key={u.url}
      url={u.url}
      status={u.status}
    />
  );
  return (
  <div className="links">
    
    <Status />

    <div className="links-container">
      {list}
    </div>
  </div>);
};

export default LinkList;
import React from "react";
import "./style.css";

const Address = ( { url, status } ) => {
  let urlStatusClass = `url-status url-status-${status}`;
  let statusIndicator;
  if( status === "success" ) {
    statusIndicator="fa fa-thumbs-up";
  } else if( status === "failed" ) {
    statusIndicator="fa fa-thumbs-down";
  } else if( status === "invalid" ) {
    statusIndicator="fa fa-exclamation-triangle";
  } else {
    statusIndicator="fa fa-question-circle";
  }
  return (<div className={urlStatusClass}>
    <i className={statusIndicator}>&nbsp;</i>
    <a href={url} target="_blank">{url}</a>
  </div>);
};

export default Address;
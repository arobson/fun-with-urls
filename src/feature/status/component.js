import React from "react";
import "./style.css";
import _ from "lodash";
import { connect } from "react-redux";

const StatusView = ( { status, urls, good, bad, invalid, remaining } ) => {
  let urlsCount = _.keys( urls ).length;
  let message = "waiting for page to analyze";

  if( status !== "" ) {
    if( remaining > 0 ) {
      message = `${urlsCount} links found`;  
    } else {
      message = `${urlsCount} links analyzed: ${good} valid links, ${bad} bad links, ${invalid} invalid links.`;
    }
  }
  return (
    <div className="status">
      <label className="status-label" htmlFor="status">
        Analysis Status:
      </label>
      <label id="status" className="status-info">
        {message}
      </label>
    </div>
  );
}

const mapStateToProps = ( state, ownProps ) => {
  return {
    status: state.page.status,
    urls: state.page.urls,
    good: state.page.good,
    bad: state.page.bad,
    invalid: state.page.invalid,
    remaining: state.page.remaining
  };
}

const Status = connect(
  mapStateToProps
)( StatusView );

export default Status;
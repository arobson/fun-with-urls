import React from "react";
import "./style.css";
import _ from "lodash";

import { changeAddress, processAddress } from "./actions";
import { connect } from "react-redux";

import Links from "../links/component";

let pageAddress;
const PageLookupView = ( { displayAddress, status, urls, onTyping, submit } ) => {
  return (
    <div>
      <section className="page-field">
        <label className="page-label" htmlFor="pageUrl">
          Page Url:
        </label>
        <div className="input-group">
          <input
            id="pageUrl"
            type="textbox"
            className="page-input form-control"
            placeholder="url to the page containing links"
            ref={ ( e ) => {
              if( e != null ) {
                pageAddress = e;
              }
            } }
            onChange={ ( e ) => {
              onTyping( e.target.value );
            } }
            value={displayAddress}
          />
          <span className="input-group-btn">
            <button 
              id="page-analyze"
              className="btn btn-default"
              type="button"
              onClick={ ( e ) => {
                e.preventDefault();
                var address = pageAddress.value;
                submit( address );
              } }
            >
              <i className="fa fa-play">
                &nbsp;
              </i>
            </button>
          </span>
        </div>
      </section>
      <Links status={status} urls={urls} />
    </div>
  );
}

const mapStateToProps = ( state, ownProps ) => {
  return {
    displayAddress: state.page.displayAddress,
    status: state.page.status,
    urls: state.page.urls
  };
}

const mapDispatchToProps = ( dispatch ) => {
  return {
    onTyping: ( x ) => dispatch( changeAddress( x ) ),
    submit: ( x ) => dispatch( processAddress( dispatch, x ) )
  };
}

const PageLookup = connect(
  mapStateToProps,
  mapDispatchToProps
)( PageLookupView );

export default PageLookup;
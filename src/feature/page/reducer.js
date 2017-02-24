const assign = Object.assign;
import _ from "lodash";

const initialState = {
  displayAddress: "",
  pageAddress: "",
  status: "",
  remaining: 0,
  good: 0,
  bad: 0,
  invalid: 0,
  urls: {
    "www.inprogress.com": { url: "in progress", status: "processing" },
    "www.success.com": { url: "verified successfully", status: "success" },
    "www.failed.com": { url: "failed to verify", status: "failed" },
    "www.invalid.com": { url: "invalid URL", status: "invalid" }
  }
};

const actions = {
  addressChanged: ( state, { address } ) => {
    return assign( {}, state, {
      displayAddress: address,
      status: "",
      good: 0,
      bad: 0,
      invalid: 0
    } )
  },
  addressListReceived: ( state, { list } ) => {
    let urls = _.reduce( list, ( hash, url ) => {
      hash[ url ] = { url: url, status: "checking" };
      return hash;
    }, {} );
    return assign( {}, state, {
      urls: urls,
      remaining: _.keys( urls ).length
    } );
  },
  addressStatusUpdated: ( state, { update } ) => {;
    let urls = assign( {}, state.urls );
    if( urls[ update.url ].status === "checking" ) {
      urls[ update.url ] = update;
      let goodIncrement = update.status === "success" ? 1 : 0;
      let badIncrement = update.status === "failed" ? 1 : 0;
      let invalidIncrement = update.status === "invalid" ? 1 : 0;
      return assign( {}, state, { 
        urls: urls,
        remaining: state.remaining - 1,
        good: state.good + goodIncrement,
        bad: state.bad + badIncrement,
        invalid: state.invalid + invalidIncrement,
      } );
    } else {
      return state;
    }
  },
  pageProcessStarted: ( state, { page } ) => {
    return assign( {}, state, {
      status: "started"
    } );
  },
  pageProcessCompleted: ( state, { page } ) => {
    return assign( {}, state, {
      status: "finished"
    } );
  }
};

export default function reducer( state = initialState, action ) {
  let fn = actions[ action.type ];
  if( fn ) {
    return fn( state, action );
  } else {
    return state;
  }
};
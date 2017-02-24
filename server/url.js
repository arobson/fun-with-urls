const _ = require( "lodash" );
const request = require( "request" );
const when = require( "when" );
const highland = require( "highland" );

// RFC 3986 https://tools.ietf.org/html/rfc3986
// Appendix A & B
const UNRESERVED = "a-z\\d._~\!$&amp;'()*+,;=\\-";
const PCHAR = `${UNRESERVED}:@%`;

const SCHEME = "([a-z][a-z\\d+.\\-]*)";
const USERINFO = `(([${UNRESERVED}%]*)(:([${UNRESERVED}:%]*))?)`;
const IPV4 = "(\\d{1,3}[.]\\d{1,3}[.]\\d{1,3}[.]\\d{1,3})";
const IPV6 = "(\\[([a-f\\d.:]+)\\])";
const HOST_NAME = "([a-z\\d.%\\-]+)";
const HOST = `(${HOST_NAME}|${IPV4}|${IPV6})`;
const PORT = "(\\d*)";
const AUTHORITY = `((${USERINFO}@)?${HOST}?(:${PORT})?)`;
const SLASH_SEG = `(/[${PCHAR}]*)`;
const PATH_AUTHABS = `((//${AUTHORITY})((/[${PCHAR}]*)*))`;
const PATH_REL = `([${PCHAR}]+${SLASH_SEG}*)`;
const PATH_ABS = `(//(${PATH_REL})?)`;
const APATH = `(${PATH_AUTHABS}|${PATH_ABS}|${PATH_REL})`;
const QUERY_FRAG = `([${PCHAR}/?]*)`;
const URL = `((${SCHEME}:)${APATH}(\\?${QUERY_FRAG})?(#${QUERY_FRAG})?)`;
const HTTP = `((http(s)?:)${APATH}(\\?${QUERY_FRAG})?(#${QUERY_FRAG})?)`;

const VALID_URL = new RegExp( HTTP, 'i' );

// finds all urls in source by pattern provided
// returns an array with all matching URLs found
function findByPattern( pattern, source ) {
  let regex = new RegExp(pattern, 'gi');
  let matches = [];
  let match = regex.exec( source );
  while( match != null ) {
    matches.push( match[ 0 ] );
    match = regex.exec( source );
  }
  return matches;
}

// provides a general function that accepts
// a url and returns a promise that resolves
// to a description of whether or not
// the URL was valid in terms of format and
// provided a 200 response

// ** OPPORTUNITIES TO INTRODUCE CACHE **
// the regex provides capturing groups that would
// allow for exclusion of query parameters and hash segments
// remaining URL can be hashed and used as a cache key.
// Some business logic would be necessary to determine
// how long to store address checks for. (24 hours, 1 week, etc)
function validate( url ) {
  if( validateFormat( url ) ) {
    return validateAddress( url );
  } else {
    return Promise.resolve( {
      address: {
        url: url,
        status: "invalid",
        error: "bad format"
      }
    } );
  }
}

// validates a list of urls asynchronously
// and returns a highland stream
function validateList( list ) {
  return highland( ( push ) => {
    push( null, {
      addresses: list
    } );
    let promises = _.map( list, ( url ) => {
      return validate( url )
        .then( ( x ) => {
          push( null, x );
        } );
    } );
    when
      .all( promises )
      .then( () => push( null, highland.nil ) );
  } );
}

// validates the provided URL by attempting
// to perform a GET request to the address
// returns a promise which resolves or
// rejects based on success
function validateAddress( url ) {
  return new Promise( ( resolve, reject ) => {
    request( url, ( err, response, body ) => {
      if( err ) {
        resolve( {
          address: {
            url: url,
            status: "failed",
            error: err.message,
            reason: "network failure"
          }
        } );
      } else if ( response.statusCode != 200 ) {
        resolve( {
          address: 
          { 
            url:url,
            status: "failed",
            error: `status code: ${response.statusCode}`,
            reason: "invalid response from remote address"
          }
        } );
      } else {
        resolve( {
          address: 
          { 
            url: url,
            status: "success"
          }
        } );
      }
    } );
  } );
}

// verifies whether or not the URL meets
// RFC 3986 - returns true or false
function validateFormat( url ) {
  return VALID_URL.test( url );
}

module.exports = {
  findAny: findByPattern.bind( null, URL ),
  findHttp: findByPattern.bind( null, HTTP ),
  validateAddress: validateAddress,
  validateFormat: validateFormat,
  validate: validate,
  validateList: validateList
};

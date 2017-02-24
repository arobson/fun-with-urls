const request = require( "request" );
const when = require( "when" );
const highland = require( "highland" );
const _ = require( "lodash" );
const urls = require( "./url" );

function onUrlRequest( req, res ) {
  let address = req.body ? req.body.url : "";
  if( urls.validateAddress( address ) ) {
    loadPage( address )
      .then(
        processContent.bind( null, res ),
        handleError.bind( null, res )
      );
  } else {
    res.status( 500 ).send( "invalid page address" );
  }
};

// handles errors in processing
function handleError( res, error ) {
  res.status( 500 ).send( "invalid server response" );
}

// sends content from the requested page to
// the url module to find the list of URLs
// and stream the results to the response
function processContent( res, content ) {
  let list = urls.findHttp( content );
  res.status( 200 );
  let results = urls.validateList( list );
  results.map( stringifier ).pipe( res );
}

// turns objects in the stream into JSON
// so they can be streamed to the response
function stringifier( json ) {
  return JSON.stringify( json );
}

// makes the request for the page sent from the user
function loadPage( url ) {
  return when.promise( ( resolve, reject ) => {
    request( url, ( err, response, body ) => {
      if( err ) {
        reject( err );
      } else if ( response.statusCode != 200 ) {
        reject( new Error( `status code: ${response.statusCode}` ) );
      } else {
        resolve( body );
      }
    } );
  } );
}

module.exports = onUrlRequest;
import oboe from "oboe";

function processPageURLs( address, onAddresses, onResult, onDone ) {
  oboe( {
    url: "/page",
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify( 
      { url: address }
    )
  } )
  .node( "addresses", onAddresses )
  .on( "node", "address", onResult )
  .on( onDone );
}

export default processPageURLs
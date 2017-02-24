const express = require( "express" );
const bodyParser = require( "body-parser" );

const app = express();

app.use(bodyParser.json());

// accepts incoming posts to the page
// route and on valid addresses, requests
// the page for processing
app.post( "/page", require( "./url-resource" ) );

// starts the server at port 3001
app.listen( 3001, () => {
  console.log( "API listening at port 3001" );
} );
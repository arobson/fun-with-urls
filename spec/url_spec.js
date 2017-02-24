require( "./setup" );

const fs = require( "fs" );
const urls = require( "../server/url" );

describe( "url", () => {
  describe( "when searching well-formed html for urls", () => {
    var html, error, matches;

    before( ( done ) => {
      fs.readFile(
        "./spec/the_lord_of_the_rings.html",
        ( err, content ) => {
          if( err ) {
            error = err;
            html = "";
          } else {
            html = content;
          }
          done();
        } );
    } );

    it( "should have read file successfully", () => {
      expect( error ).to.be.undefined;
    } );

    it( "should find all matching urls", () => {
      matches = urls.findHttp( html );
      expect( matches.length ).to.equal( 179 );
    } );
  } );

  describe( "validating URL formats", () => {
    it( "should reject invalid format", () => {
      expect( urls.validateFormat( "htt:/oops" ) ).to.be.false;
    } );

    it( "should accept valid format", () => {
      expect( urls.validateFormat( "http://www.yup.com" ) ).to.be.true;
    } );
  } );

  describe( "validating URL address", () => {
    let remote;
    
    before( () => {
      remote = nock( "http://remote.io" );

      remote.get( "/valid" )
        .reply( 200, "ok" );

      remote.get( "/nope" )
        .reply( 500, "error" );
    } );
    describe( "when address is valid", () => {
      it( "should resolve to a success", function() {
        let promise = urls.validateAddress( "http://remote.io/valid" );
        return expect( promise ).to.eventually.eql( {
          address:  {
            url: "http://remote.io/valid",
            status: "success"
          }
        } );
      } );
    } );

    describe( "when address is invalid", () => {  
      it( "should reject", function() {
        let promise = urls.validateAddress( "http://remote.io/nope" );
        return expect( promise ).to.eventually.eql( {
          address:  {
            url: "http://remote.io/nope",
            status: "failed",
            error: "status code: 500",
            reason: "invalid response from remote address"
          }
        } );
      } );
    } );

    describe( "when the network blows up", () => {
      it( "should reject", function() {
        let promise = urls.validateAddress( "http://127.0.0.1:9999" );
        return expect( promise ).to.eventually.eql( {
          address:  {
            url: "http://127.0.0.1:9999",
            status: "failed",
            error: "connect ECONNREFUSED 127.0.0.1:9999",
            reason: "network failure"
          }
        } );
      } );
    } );
  } );

  describe( "validating a list of URLs", () => {
    var remote;
    const list = [
      "htt:/nonononono",
      "http://demo.io/ok",
      "http://demo.io/nope"
    ];
    before( () => {
      remote = nock( "http://demo.io" );

      remote.get( "/ok" )
        .reply( 200, "ok" );

      remote.get( "/nope" )
        .reply( 500, "error" );
    } );

    it( "should return a highland stream", ( done ) => {
      urls.validateList( list )
        .toArray( ( result ) => {
          expect( result ).to.eql( [
            {
              addresses: list
            },
            {
              address: {
                url: "htt:/nonononono",
                status: "invalid",
                error: "bad format"
              }
            },
            {
              address: {
                url:  "http://demo.io/ok",
                status: "success"
              }
            },
            {
              address: {
                url:  "http://demo.io/nope",
                status: "failed",
                error: "status code: 500",
                reason: "invalid response from remote address"
              }
            }
          ] );
          done();
        } );
    } );
  } );
} );
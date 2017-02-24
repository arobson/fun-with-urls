## Fun With URLs

### Installing & Running
I used Facebook's create-react-app to get going quickly and then just threw together a quick express back-end together for a server-side portion. The react app runs at port 3000 and proxies requests to the node app at port 3001.

To install you'll need to run:
```shell
npm install
```
and then
```shell
npm run demo
```

This starts both the client and server processes under a single process manager and should open your browser to `http://localhost:3000`.

### Tests
There's very minimal test coverage due to the limited time I had to spend on this.

__client tests__
```shell
npm test
```

__server tests__
```shell
npm run server-tests
```

### What & How
This is a single page web application that analyzes the URLs found in a web page for validity. URLs are extracted from page content using regex based on Appendices A & B of RFC 3986.

A URL is considered valid if it is well-formed and if a request made to it results in a valid response. URLs found are listed and their status is updated as soon as the server is able to determine their status.
   
Most of the React and express implementation is straight-forward. The "fun" part was using highland on the server and oboe on the client so that the results of checking each URL found in a page would be streamed to the client as JSON and displayed to the user immediately.
        

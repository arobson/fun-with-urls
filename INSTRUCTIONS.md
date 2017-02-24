Please … 
Spend no more than three hours total working on your solution
Push the code for your challenge to a public repository on GitHub
Include a README.md with instructions for running your code and running tests
Submit your challenge by sending a link to your GitHub repository to your contact at Emma

A) Write a function (JavaScript, Python, or Scala)
The function must accept a list of URLs and return a subset of those links that are either written incorrectly or do not return a success status code, along with a way to identify what was wrong with each link. 

If you end up with extra time, feel free to comment on the following in your code:
Could the function be improved if the same list of links is being passed in many times, and what are the tradeoffs?
How might the function be written to process arbitrarily long lists of links?
How might this function be exposed as an HTTP API to be used by a front-end application?

B) Write a front-end single page app (JavaScript + React*)
The application must include a form with a single input for a valid URL. Submitting the form will request the URL, and the application must parse the HTML response, generate a list of links contained on the page, and display the list beautifully in the UI.

* We like React, but if you haven’t worked with React before, it’s fine to choose another front-end framework.

If you end up with extra time, feel free to comment on the following in your code:
How might the application handle poorly formatted HTML?
If you solved challenge A as well, how might it hook into challenge B, and what would the UI look like to display successful and failed validation?
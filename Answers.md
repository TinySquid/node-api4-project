- [x] Explain what a token is used for.

  A token is used to authenticate a user by the server. It keeps the UI in sync with the server.

- [x] What steps can you take in your web apps to keep your data secure?

  - All outgoing links that have a target of blank must have `rel="noopener noreferrer"`
  - Protected Routes and AxiosWithAuth
  - All protected views of your app should require a user to be logged in and 'authenticated' in order to access.
  - MUST have a SSL certificate (IE Let's Encrypt, etc) so you have HTTPS and that way it guarantees secure commmunication between client and server, and that there is no middleman attack possible (data cannot be forged between the client request and server response since it uses SSL).

- [x] Describe how web servers work.

  A web server is a dedicated machine meant to serve websites and apps to internet users. Web servers can serve hundreds of sites on a single machine. 
  URLs are string representations of an IP address that gets resolved when it reaches a DNS server, so you don't have to remember a string of digits to connect to a website.

- [x] Which HTTP methods can be mapped to the CRUD acronym that we use when interfacing with APIs/Servers.
  CREATE - POST
  READ - GET
  UPDATE - PUT/PATCH
  DELETE - DELETE
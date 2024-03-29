<p align="center">
<img src="./mermaid-melt/branding/header.png"/>
</p>

[![license: mit](https://img.shields.io/badge/license-mit-blue)](https://opensource.org/licenses/MIT)
[![node.js badge](https://img.shields.io/badge/node-teal?logo=nodedotjs&logoColor=white&style=flat)](https://nodejs.org/en)
[![express.js badge](https://img.shields.io/badge/express-plum.svg?&logo=Express&logoColor=white)](https://expressjs.com/)
[![react badge](https://img.shields.io/badge/react-lightgrey.svg?&logo=React&logoColor=white)](https://react.dev/)
[![mongodb badge](https://img.shields.io/badge/mongodb-salmon.svg?&logo=MongoDB&logoColor=white)](https://www.mongodb.com/)
[![apollo badge](https://img.shields.io/badge/-apollographQL-lightblue?&logo=apollo-graphql)](https://www.apollographql.com/)
[![heroku badge](https://img.shields.io/badge/heroku-purple.svg?&logo=Insomnia&logoColor=white)](https://heroku.com)
[![canva badge](https://img.shields.io/badge/canva-lightyellow.svg?&logo=Canva&logoColor=white)](https://canva.com/)
[![vite badge](https://img.shields.io/badge/vite-midnightblue.svg?&logo=Vite&logoColor=white)](https://vitejs.dev/)

<p align="left">
  <img alt="mode" src="https://img.shields.io/badge/view-darkmode-black.svg?&logo=Github&logoColor=white" >
</p>

### ![table-of-contents](./mermaid-melt/branding/toc.png)

- [OVERVIEW](#overview)
  - [*user story*](#user-story)
  - [*acceptance criteria*](#accpetance-criteria)
  - [*fantasy list*](#fantasy-list)
- [INSTALLATION](#installation)
- [USAGE](#usage)
  - [*screenshot*](#screenshot)
  - [*demo*](#demo)
- [TESTING](#testing)
- [SOURCES](#sources)
- [LICENSE](#license)
- [LINKS](#links)
- [CONNECT](#connect)

### ![overview](./mermaid-melt/branding/1.png)

`ENCHANTED FORAGE` is an interactive book search engine built with a [GraphQL](https://www.apollographql.com/) API and Apollo Server. The app is built using [MERN Stack](https://www.mongodb.com/mern-stack) - with a [React](https://react.dev/) **front end**, [MongoDB](https://www.mongodb.com/) **database**, and [Node.js](https://nodejs.org/en)/[Express.js](https://www.npmjs.com/package/express) **server and API**.

>The [.npmrc](https://docs.npmjs.com/cli/v10/configuring-npm/npmrc) file will set config values specific to this project, and ensures the app will deploy properly to [Heroku](https://www.heroku.com).


### ![user-story](./mermaid-melt/branding/9.png)
<p align="center">
  <img src="./mermaid-melt/branding/user-story.png"/>
</p>

### ![acceptance-criteria](./mermaid-melt/branding/10.png)
<p align="center">
  <img src="./mermaid-melt/branding/ac.png"/>
</p>

### ![fantasy-list](./mermaid-melt/branding/11.png)
<p align="center">
  <img src="./mermaid-melt/branding/fantasy-list.png"/>
</p>

#

### ![installation](./mermaid-melt/branding/2.png)

The application is invoked using the following commands:

##### *Clone the repository in your local development enviornment*

```javascript
git clone https://github.com/christiecamp/enchanted-forage.git
```

##### *Navigate to the CLI and input:*

```javascript
npm i
```
```javascript
npm run dev
```
#

### ![usage](./mermaid-melt/branding/3.png)

**INSTRUCTIONS:**

1. Open the Integrated Terminal and follow the [installation](#installation) guidelines.

2. Interact with `ENCHANTED FORAGE` through your local enviorment, or open the [application](https://enchanted-forage-4414b204d74a.herokuapp.com/) deployed on [Heroku](https://heroku.com/home).

3. Signup by providing an email address & creating a username/password.

4. **Search for books** by keyword, author, title, etc.

5. *View*, *save*, & *delete* your selected books in **VIEW FANTASIES**.

6. *Logout* to leave application.


##### view [demo videos](#demo) for further help


### ![screenshot](./mermaid-melt/branding/12.png)
             
##### *screenshot demonstrates `ENCHANTED FORAGE's` back end, local browser, & deployed application on **Heroku***

<p align="center">
<img src="./mermaid-melt/demo/ss.png"/>
</p> 


### ![demo](./mermaid-melt/branding/13.png)

<p align="center">
<img src="./mermaid-melt/demo/enchanted.gif"/>
</p> 


#

### ![sources](./mermaid-melt/branding/4.png)

Here's a list of technologies used:

1. [Node.js](https://nodejs.org/en) - an open-source, cross-platform JavaScript runtime environment.

2. [Express.js](<(https://expressjs.com)>) - a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

3. [Apollo Server](https://webpack.js.org/) - an open-source, spec-compliant **GraphQL server** that's compatible with any **GraphQL client**, including [Apollo Client](). Works in conjunction with [apollo-server-express](https://www.npmjs.com/package/apollo-server-express), an *Express integration* of Apollo Server.

4. [Apollo Client](https://www.npmjs.com/package/@apollo/client) - a fully-featured caching GraphQL client with integrations for `React`, `Angular` - easily build UI components that fetch data via **GraphQL**.

4. [GraphQL](https://graphql.org/) - an open source *query language* that describes how a client should request information through an API.

5. [MongoDB](https://www.mongodb.com/) - a *NoSQL* database product that utilizes **JSON**-like documents with optional schemas.

6. [Mongoose](https://mongoosejs.com/) - a Node.j based **Object Data Modeling** *(ODM) library* for MongoDB.

7. [React](https://react.dev/) - open-source **JavaScript UI development library** for building user interfaces based on *components*. It is used with:
      * [react-bootstrap](https://www.npmjs.com/package/react-bootstrap)
      * [react-dom](https://legacy.reactjs.org/docs/react-dom.html)
      * [react-router-dom](https://www.npmjs.com/package/react-router-dom)
      * [@types/react](https://www.npmjs.com/package/@types/react)
      * [@types/react-dom](https://www.npmjs.com/package/@types/react-dom)

8. [eslint](https://eslint.org/) - a *static code analysis tool* for identifying problematic patterns found in JavaScript code. It is used with:
    * [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react)
    * [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
    * [eslint-plugin-react-refresh](https://www.npmjs.com/package/eslint-plugin-react-refresh)

9. [Vite](https://vitejs.dev/guide/) -  a build tool that aims to provide a faster and leaner development experience for modern web projects.

10. [brypt](https://www.npmjs.com/package/bcrypt) -  a password hashing algorithm.

11. [jsonwebtoken]() - an implementation of [JSON Web Tokens](https://datatracker.ietf.org/doc/html/rfc7519).

12. [jwt-decode](https://www.npmjs.com/package/jwt-decode) - decode, sign/resign or verify **JSON Web Tokens**.

13. [Dotenv](https://www.npmjs.com/package/dotenv) - a zero-dependency module that loads environment variables from a .env file into `process.env`.

14. [Concurrently](https://www.npmjs.com/package/concurrently) - a Node.js tool that runs multiple commands concurrently.

15. [Nodemon](https://www.npmjs.com/package/nodemon) - a Node.js tool that helps develop applications by automatically restarting the node application when file changes in the directory are detected.

16. [Heroku](https://heroku.com) - used to deploy, manage, and scale the application.


### ![license](./mermaid-melt/branding/5.png)

##### [mit license](./LICENSE)

### ![links](./mermaid-melt/branding/6.png)

##### [*github repo*](https://github.com/christiecamp/enchanted-forage)

##### [*deployed app*](https://enchanted-forage-4414b204d74a.herokuapp.com/)

### ![connect](./mermaid-melt/branding/7.png)

[![Github Badge](https://img.shields.io/badge/christiecamp-violet.svg?&logo=Github&logoColor=white)](https://github.com/christiecamp/enchanted-forage)

<a href="mailto:christiecamphoto@gmail.com">
<img src="https://img.shields.io/badge/gmail-lightpink.svg?&logo=Gmail&logoColor=white" />
</a>
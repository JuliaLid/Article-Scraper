
![logo](https://user-images.githubusercontent.com/31745567/38434048-aa115354-3992-11e8-8be7-065ec869d218.jpg)

## Project Overview
* Create a full-stack web app that lets users view and save articles.
* Users have to be able to add, view, delete comments on every article..
* Use Cheerio library to scrape news from anoter site.
* Use Mongoose for object-modeling.
* Follow the MVC design pattern.

## Link to Deployed App
* [American Princess Bride](https://my-articles-vault.herokuapp.com/)
## Cloning instructions
1. Clone the repo.
2. Run `npm install` to install dependencies in the root app folder on the local machine.
3. Use bash terminal to run command `npm run watch` or `node server.js` to initialize the server.
4. Use `mongod` and `mongo` commands to start the MongoDB server.
    * Collection and documents will be automatically created when you you scrape the news. 
5. Open a browser window and type `localhost:3000` as the URL.
6. Start interacting with the application. 


## Technology Stack
* HTML5
* CSS3
* Bootstrap 4
* JavaScript 
* jQuery
* node.js
* npm packages
    * [`express`](https://www.npmjs.com/package/mysql) to handle routing.
    * [`body-parser`](https://www.npmjs.com/package/body-parser): body parsing middleware.
    * [`Express-Handlebars`](https://www.npmjs.com/package/express-handlebars) template to generate HTML page.
    * [`mongoose`l](https://www.npmjs.com/package/mongoose) for object modeling  in an asynchronous environment.
    * [`cheerio`](https://www.npmjs.com/package/cheerio) for flexible implementation of core jQuery for the server to scrape news.
    * [`axios`](https://www.npmjs.com/package/axios) for making `http` requests from node.js
* [Heroku](https://www.heroku.com/) to deploy the app.
    * mLab MongoDB add-on to the Heroku app.
 

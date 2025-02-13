# CSE264 Project 2: Building a REST API with MongoDB
## Due: Wednesday, October 23, 2019 at 11:59 PM

In this assignment, you will use Node.js, Express.js and MongoDB to create your own REST API for blog posts and the comments inside those blog posts. You will also write some frontend javascript code to test your REST API.

All the code and packages you need is in this GitHub Classroom repo. Do not install any other packages.

### REST API
Your API will have a collection "Blog Posts", and a sub-collection "Comments".

You will need to implement the following URI routes:

* POST - /posts
  * This should accept a JSON body and create a new blog post element in the post collection
* GET - /posts
  * Return a JSON listing of all posts in Database.
* GET - /posts/[post_id]
  * This should return in JSON the contents on this blog post. If no such blog post exists, it should return a 404. If any comments are in this post, it should return all of them as well.
* PUT - /posts/[post_id]
  * This should accept a JSON body and update the post identified by [post_id]. If this post does not exist, it should create it.
* DELETE - /posts/[post_id]
  * This should delete the post. Return 404 if no such post exists.
* POST - /posts/[post_id]/comments
  * This should accept a JSON body and create a new blog post comment element in the comments collection in the blog post identified by [post_id].
* GET - /posts/[post_id]/comments
  * Return a JSON listing of all comments from the post identified by [post_id].
* GET - /posts/[post_id]/comments/[comment_id]
  * This should return in JSON the contents on this comment. If no such comment exists, it should return a 404
* PUT - /posts/[post_id]/comments/[comment_id]
  * This should accept a JSON body and update the comment identified by [comment_id]. If this comment does not exist, it should create it.
* DELETE - /posts/[post_id]/comments/[comment_id]
  * This should delete the comment. Return 404 if no such comment exists.

Also create search functionality for your API.
* GET - /posts?search=[search_Query]
  * Return a JSON listing of all posts that have [search_Query] in the Title or Body.
* GET - /posts/[post_id]/comments?search=[search_Query]
  * Return a JSON listing of all comments from the post identified by [post_id] that have [search_Query] in the Title or Body.

Schema for Blog Posts
* Post ID
  * ID for Blog post
* Title
  * Title of Blog post
* Body
  * Body of Blog post
* Author
  * Name of Author of Blog post
* Date
  * Date when Blog post was created

Schema for Comments
* Comment ID
  * ID for Comment
* Title
  * Title of Comment
* Body
  * Body of Comment
* Author
  * Name of Author of Comment
* Date
  * Date when Comment was created

### Frontend Testing
You will also need to test all the routes listed above, using similar AJAX requests you used in Project 1. You must test all routes for both success and failure (return the correct error code). A basic index.pug page with some buttons have been created for you in this project. The code in /public/javascripts/main.js will fire when pressing these buttons. Feel free to add new buttons to create more events, or test other behaviour. Write comments in main.js to describe your tests and what expected output is. 

### Install and Run
You must have node.js running on your machine. Once you have cloned this project you can run `npm install` to install all the packages for this project. Then running `npm run dev` will run the dev version of this code, which will run this project with nodemon. Nodemon auto-restarts the node server every time you make a change to a file. Very helpful when you are writing and testing code.

### .env and MongoDB
You need to have a MongoDB server running before launching your API. You can
download MongoDB [here](https://www.mongodb.com/download-center/community), or install it via a package manager.
Windows users, read [Install MongoDB on Windows](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/).

You can also use
[MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or [Compose](https://www.compose.io/) instead of downloading and installing MongoDB locally. 

Which ever you do, you will need to cretae a .env from the .env.example 
You can do this by `cp .env.example .env`

The store your MongoDB URI connection in your  `.env` file.

**Note:** Never ever store real credentials in `.env.example` or anywhere that is not `.env` as you may push these changes to your git repo.

### Get Hosted MongoDB Atlas

From [https://github.com/sahat/hackathon-starter#deployment](https://github.com/sahat/hackathon-starter#deployment)

- Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Click the green **Get started free** button
- Fill in your information then hit **Get started free**
- You will be redirected to Create New Cluster page.
- Select a **Cloud Provider and Region** (such as AWS and a free tier region)
- Select cluster Tier to **Free Shared Clusters**
- Give Cluster a name (default: Cluster0)
- Click on green **:zap:Create Cluster button**
- Now, to access your database you need to create a DB user. To create a new MongoDB user, from the **Clusters view**, select the **Security tab**
- Under the **MongoDB Users** tab, click on **+Add New User**
- Fill in a username and password and give it either **Atlas Admin** User Privilege
- Next, you will need to create an IP address whitelist and obtain the connection URI.  In the Clusters view, under the cluster details (i.e. SANDBOX - Cluster0), click on the **CONNECT** button.
- Under section **(1) Check the IP Whitelist**, click on **ALLOW ACCESS FROM ANYWHERE**. The form will add a field with `0.0.0.0/0`.  Click **SAVE** to save the `0.0.0.0/0` whitelist.
- Under section **(2) Choose a connection method**, click on **Connect Your Application**
- In the new screen, select **Node.js** as Driver and version **2.2.12 or later**. _*WARNING*_: Do not pick 3.0 or later since connect-mongo can't handle mongodb+srv:// connection strings.
- Finally, copy the URI connection string and replace the URI in MONGODB_URI of `.env.example` with this URI string.  Make sure to replace the <PASSWORD> with the db User password that you created under the Security tab.
- Note that after some of the steps in the Atlas UI, you may see a banner stating `We are deploying your changes`.  You will need to wait for the deployment to finish before using the DB in your application.


**Note:** As an alternative to MongoDB Atlas, there is also [Compose](https://www.compose.io/).

### Grading
* **80 Points** - REST API works as descibed in this README. All routes and search works as expected. All inputs are validated and correct errors are returned to client
* **15 Points** - Frontend Test covers all routes and search functionality.
* **5 Points** - Backend and Frontend code is well commented and easy to read/follow.

* If code doesn't run/compile you can get no more than a 65. But please write comments and a README to explain what you were trying to do. 



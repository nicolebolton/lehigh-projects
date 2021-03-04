/*
 * This files holds all the code to test you REST API
 */

//Run once broswer has loaded everything
window.onload = function () {



//button event for create post
document.getElementById("create")
.addEventListener("click",function(e){
    /**
     * Test POST /posts
     * Expect 200 status return and to see a new post added when 'read post' button clicked
     * New post should have title, body, and author as specified in request body
     */
    console.log("Executing POST /posts");
    const post = {
        title: 'New Post!',
        body: 'I love CSE264',
        author: 'Nicole'
    };

    fetch('/posts', {
        method: 'POST',
        body: JSON.stringify(post), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('POST /posts status & response:');
        console.log(response.status);
        return response.json();
    }).then(jsonResponse => {
        console.dir(jsonResponse);
    });

},false);

//button event for read post
document.getElementById("read")
.addEventListener("click",function(e){
    /**
     * Test GET /posts
     * Expect 200 status and json object containing all post to return
     */
    console.log("Executing GET /posts");
    fetch('/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('GET /posts status & response:');
        console.log(response.status);
        return response.json();
    }).then(jsonResponse => {
        console.dir(jsonResponse);
    });

    /**
     * Test GET /posts/:post_id
     * Expect 200 status and json object containing the specified post
     * Should return object with id 5da8a22b94b43d723f7521f3
     */
    console.log("Executing GET /posts/:post_id");
    fetch('/posts/5da8a22b94b43d723f7521f3', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('GET /posts/5da8a22b94b43d723f7521f3 status & response:');
        console.log(response.status);
        return response.json();
    }).then(jsonResponse => {
        console.dir(jsonResponse);
    });

},false);

//button event for update post
document.getElementById("update")
.addEventListener("click",function(e){

    /**
     * Test PUT /posts/:post_id where post exists
     * The combination of clicking 'update post' followed by 'read post' should show the
     * changes to our post with id 5da8a22b94b43d723f7521f3
     * Expect 200 status to return
     */
    console.log("Executing PUT /posts/:post_id where post exists");
    const things = ['Edit Post', 'Coolz', 'WOWzers'];
    const thing = things[Math.floor(Math.random()*things.length)];

    const editedPost = {
        title: 'Edited post!',
        body: thing,
        author: 'Nicole'
    };

    fetch('/posts/5da8a22b94b43d723f7521f3', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedPost)
    }).then(response => {
        console.log('PUT /posts/5da8a22b94b43d723f7521f3 status & response:');
        console.log(response.status);
        return response.json();
    }).then(jsonResponse => {
        console.dir(jsonResponse);
    });

    /**
     * Test PUT /posts/:post_id where post doesn't exist
     * Expect 200 status to return
     * The combination of clicking 'update post' followed by 'read post' should show the
     * addition of our post with id 5da8a22b94b43d723f7521f2
     */
    console.log("Executing PUT /posts/:post_id where post DNE");
    const newPost = {
        title: 'Created a new post thru put!',
        body: thing,
        author: 'Nicole'
    };

    fetch(`/posts/5da8a22b94b43d723f7521f2`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    }).then(response => {
        console.log(`PUT /posts/5da8a22b94b43d723f7521f2 status & response:`);
        console.log(response.status);
        return response.json();
    }).then(jsonResponse => {
        console.dir(jsonResponse);
    });

},false);

//button event for destroy post
document.getElementById("destroy")
.addEventListener("click",function(e){
    /**
     * Test DELETE post
     * Expect 200 status return
     * The combination of clicking 'delete post' followed by 'read post' should show the
     * deletion of our post with id 5da8a22b94b43d723f7521f2
     *
     * NOTE: will return 404 error if 'update post' isn't clicked prior to 'delete post'
     * 'update post' creates the post with id 5da8a22b94b43d723f7521f2 to be deleted here
     */
    console.log("Executing DELETE /posts/:post_id");

    fetch(`/posts/5da8a22b94b43d723f7521f2`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log(`DELETE /posts/5da8a22b94b43d723f7521f2 status & response:`);
        console.log(response.status);
        return response.json();
    }).then(jsonResponse => {
        console.dir(jsonResponse);
    });

},false);

//button event for create comment
document.getElementById("create-comment")
  .addEventListener("click",function(e){
      /**
       * Test POST /post/:post_id/comment
       * Expect 200 status return and to see a new post added when 'read comment' button clicked
       * New comment should have title, body, and author as specified in request body
       * and be associated with the post_id 5da8a255883edf725135367b
       */
      console.log('Executing POST /post/:post_id/comment');
      const comment = {
          title: 'New Comment',
          body: 'Spooky',
          author: 'NikkiB'
      }

      fetch('/posts/5da8a255883edf725135367b/comments', {
          method: 'POST',
          body: JSON.stringify(comment),
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log('POST /posts/5da8a255883edf725135367b/comments status & response:')
          console.log(response.status);
          return response.json();
      }).then(jsonResponse => {
          console.log(jsonResponse);
      });
  },false);

//button event for read comment
document.getElementById("read-comment")
  .addEventListener("click",function(e){
      /**
       * Test GET /posts/:post_id/comments
       * Expect 200 status and json object containing all comments associated with
       * post_id 5da8a255883edf725135367b to be returned
       */
      console.log("Executing GET /posts/:post_id/comments");
      fetch('/posts/5da8a255883edf725135367b/comments', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log('GET /posts/5da8a255883edf725135367b/comments status & response:');
          console.log(response.status);
          return response.json();
      }).then(jsonResponse => {
          console.dir(jsonResponse);
      });

      /**
       * Test GET /posts/:post_id/comments/:comment_id
       * Expect 200 status and json object of the comment with id 5da912cc22821f83457b84c7
       * to be returned
       */
      console.log("Executing GET /posts/:post_id/comments");
      fetch('/posts/5da8a255883edf725135367b/comments/5da912cc22821f83457b84c7', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log('GET /posts/5da8a255883edf725135367b/comments/5da912cc22821f83457b84c7 status & response:');
          console.log(response.status);
          return response.json();
      }).then(jsonResponse => {
          console.dir(jsonResponse);
      });
  },false);

//button event for update comment
document.getElementById("update-comment")
  .addEventListener("click",function(e){
      /**
       * Test PUT /posts/:post_id/comments/:comment_id where comment exists
       * The combination of clicking 'update comment' followed by 'read comment' should show the
       * changes to our comment with id 5da912cc22821f83457b84c7
       * Expect 200 status to return
       */
      console.log("Executing PUT /posts/:post_id where comment exists");

      const things = ['Edit Post', 'Coolz', 'WOWzers'];
      const thing = things[Math.floor(Math.random()*things.length)];

      const editedComment = {
          title: 'Edited comment!',
          body: thing,
          author: 'NikkiB'
      };

      fetch('/posts/5da8a255883edf725135367b/comments/5da912cc22821f83457b84c7', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedComment)
      }).then(response => {
          console.log('PUT existing /posts/5da8a255883edf725135367b/comments/5da912cc22821f83457b84c7 status & response:');
          console.log(response.status);
          return response.json();
      }).then(jsonResponse => {
          console.dir(jsonResponse);
      });

      /**
       * Test PUT /posts/:post_id/comments/:comment_id where comment does not exists
       * Expect 200 status to return
       * The combination of clicking 'update comment' followed by 'read comment' should show the
       * addition of a comment with id 5da912cc22821f83457b84c8 under the post with id 5da8a255883edf725135367b
       */
      console.log("Executing PUT /posts/:post_id where comment does not exists");

      const newComment = {
          title: 'Created a new post thru put!',
          body: thing,
          author: 'NikkiB'
      };

      fetch('/posts/5da8a255883edf725135367b/comments/5da912cc22821f83457b84c8', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newComment)
      }).then(response => {
          console.log('PUT new /posts/5da8a255883edf725135367b/comments/5da912cc22821f83457b84c8 status & response:');
          console.log(response.status);
          return response.json();
      }).then(jsonResponse => {
          console.dir(jsonResponse);
      });
  },false);

//button event for destroy comment
document.getElementById("destroy-comment")
  .addEventListener("click",function(e){
      /**
       * Test DELETE comment
       * Expect 200 status return
       * The combination of clicking 'delete comment' followed by 'read comment' should show the
       * deletion of our comment with id 5da912cc22821f83457b84c8 under post id 5da8a255883edf725135367b
       *
       * NOTE: will return 404 error if 'update comment' isn't clicked prior to 'delete comment'
       * 'update comment' creates the comment with id 5da912cc22821f83457b84c8 to be deleted here
       */
      console.log("Executing DELETE /posts/:post_id/comments/:comment_id");

      fetch('/posts/5da8a255883edf725135367b/comments/5da912cc22821f83457b84c8', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log(`DELETE '/posts/5da8a255883edf725135367b/comments/5da912cc22821f83457b84c8 status & response:`);
          console.log(response.status);
          return response.json();
      }).then(jsonResponse => {
          console.dir(jsonResponse);
      });
  },false);

//button event for searches
document.getElementById("search")
  .addEventListener("click",function(e){
      /**
       * Test SEARCH post on title
       * Expect 200 status and a json object containing all post that have the term "New" return
       */
      console.log("Executing Search /posts?search=New");
      fetch('/posts?search=New', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log('Search /posts?search=New status & response:');
          console.log(response.status);
          return response.json();
      }).then(jsonResponse => {
          console.dir(jsonResponse);
      });

      /**
       * Test SEARCH post on body
       * Expect 200 status and a json object containing all post that have the term "CSE264" return
       */
      console.log("Executing Search /posts?search=CSE264");
      fetch('/posts?search=CSE264', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log('Search /posts?search=CSE264 status & response:');
          console.log(response.status);
          return response.json();
      }).then(jsonResponse => {
          console.dir(jsonResponse);
      });

      /**
       * Test SEARCH post no results
       * Expect 200 response but no content in json object
       */
      console.log("Executing Search /posts?search=b");
      fetch('/posts?search=b', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log('Search /posts?search=b status & response:');
          console.log(response.status);
          return response.json();
      }).then(jsonResponse => {
          console.dir(jsonResponse);
      });

      /**
       * Test SEARCH comment on title
       * Expect 200 status and a json object containing all comments with term "Edited"
       * under the post with id 5da8a255883edf725135367b return
       */
      console.log("Executing Search /posts/:post_id/comments?search=Edited");
      fetch('/posts/5da8a255883edf725135367b/comments?search=Edited', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log('Search /posts/5da8a255883edf725135367b/comments?search=Edited status & response:');
          console.log(response.status);
          return response.json();
      }).then(jsonResponse => {
          console.dir(jsonResponse);
      });

      /**
       * Test SEARCH comment on body
       * Expect 200 status and a json object containing all comments with term "Spooky"
       * under the post with id 5da8a255883edf725135367b return
       */
      console.log("Executing Search /posts/:post_id/comments?search=Spooky");
      fetch('/posts/5da8a255883edf725135367b/comments?search=Spooky', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log('Search /posts/5da8a255883edf725135367b/comments?search=Spooky status & response:');
          console.log(response.status);
          return response.json();
      }).then(jsonResponse => {
          console.dir(jsonResponse);
      });

      /**
       * Test SEARCH comment no results
       * Expect 200 response but no content in json object
       */
      console.log("Executing Search /posts/5da8a255883edf725135367b/comments?search=b");
      fetch('/posts/5da8a255883edf725135367b/comments?search=b', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log('Search /posts/5da8a255883edf725135367b/comments?search=b status & response:');
          console.log(response.status);
          return response.json();
      }).then(jsonResponse => {
          console.dir(jsonResponse);
      });
  },false);

document.getElementById("error")
  .addEventListener("click",function(e){
      /**
       * Test GET /posts/:post_id
       * Expect 404 status
       */
      console.log("Executing GET /posts/:post_id");
      fetch('/posts/5da8a22b94b43d723f7521f5', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log('GET /posts/5da8a22b94b43d723f7521f5 status & response:');
          console.log(response.status);
      });

      /**
       * Test DELETE post
       * Expect 404 status
       */
      console.log("Executing DELETE /posts/:post_id");

      fetch(`/posts/5da8a22b94b43d723f7521f7`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log(`DELETE /posts/5da8a22b94b43d723f7521f7 status & response:`);
          console.log(response.status);
      });

      /**
       * Test POST /post/:post_id/comment
       * Expect 404 status
       */
      console.log('Executing POST /post/:post_id/comment');
      const comment = {
          title: 'New Comment',
          body: 'Spooky',
          author: 'NikkiB'
      }

      fetch('/posts/5da8a255883edf7251353676/comments', {
          method: 'POST',
          body: JSON.stringify(comment),
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log('POST /posts/5da8a255883edf7251353676/comments status & response:')
          console.log(response.status);
      });

      /**
       * Test GET /posts/:post_id/comments
       * Expect 404 status
       */
      console.log("Executing GET /posts/:post_id/comments");
      fetch('/posts/5da8a255883edf7251353674/comments', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log('GET /posts/5da8a255883edf7251353674/comments status & response:');
          console.log(response.status);
      });

      /**
       * Test GET /posts/:post_id/comments/:comment_id where comment DNE
       * Expect 404 status
       */
      console.log("Executing GET /posts/:post_id/comments");
      fetch('/posts/5da8a255883edf725135367b/comments/5da912cc22821f83457b84c0', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log('GET /posts/5da8a255883edf725135367b/comments/5da912cc22821f83457b84c0 status & response:');
          console.log(response.status);
      });

      /**
       * Test GET /posts/:post_id/comments/:comment_id where post DNE
       * Expect 404 status
       */
      console.log("Executing GET /posts/:post_id/comments");
      fetch('/posts/5da8a255883edf7251353675/comments/5da912cc22821f83457b84c7', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log('GET /posts/5da8a255883edf7251353675/comments/5da912cc22821f83457b84c7 status & response:');
          console.log(response.status);
      });

      /**
       * Test PUT /posts/:post_id/comments/:comment_id where post DNE
       * Expect 404 status
       */
      console.log("Executing PUT /posts/:post_id where comment exists");

      fetch('/posts/5da8a255883edf7251353675/comments/5da912cc22821f83457b84c7', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(comment)
      }).then(response => {
          console.log('PUT /posts/5da8a255883edf7251353675/comments/5da912cc22821f83457b84c7 status & response:');
          console.log(response.status);
      });

      /**
       * Test DELETE comment where post DNE
       * Expect 404 status
       */
      console.log("Executing DELETE /posts/:post_id/comments/:comment_id");

      fetch('/posts/5da8a255883edf7251353675/comments/5da912cc22821f83457b84c8', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log(`DELETE '/posts/5da8a255883edf7251353675/comments/5da912cc22821f83457b84c8 status & response:`);
          console.log(response.status);
      });

      /**
       * Test DELETE comment where comment DNE
       * Expect 404 status
       */
      console.log("Executing DELETE /posts/:post_id/comments/:comment_id");

      fetch('/posts/5da8a255883edf725135367b/comments/5da912cc22821f83457b84c0', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      }).then(response => {
          console.log(`DELETE '/posts/5da8a255883edf725135367b/comments/5da912cc22821f83457b84c0 status & response:`);
          console.log(response.status);
      });
  },false);
};
# CSE264 Project 1: Playing with JavaScript and REST
## Due: Wednesday, October 2, 2019 at 11:59 PM

In this assignment, you will be developing some code to create a small book search interface.

All the code you need is in this GitHub Classroom repo. 

### Instructions 
You will be implementing a function called "SearchAuthors". SearchAuthors will take one parameter (which should be of type String). 
It will use this string parameter to search for books using the openlibrary API. For example, you can use the URI http://openlibrary.org/search.json?title=the+lord+of+the+rings&limit=25 to search for "Lord of The Rings" (**Notice:**  the spaces have become +’s in this case, and other special characters will need to be URI encoded) You can read more about the search API here: https://openlibrary.org/dev/docs/api/search. 
Once you have this json file, go through each entry (which should be a book), and look up the number of books each author has listed in openlibrary. Using the Author search can help with this (see https://openlibrary.org/search.json?author=OL52922A as an example of an Author look up given an Author ID). The numFound element will be what you are looking for. 
Construct a new array that includes: the book that was searched from,  the author's name, and the number of books found by that author. 

This array should:
* Get rid of any duplicate authors (never look up the same author twice)
* Be ordered from highest number of books found to least
* Each element in the array should be {searchedBook, author, numBooks}

SearchAuthors should return a new function called "printArray"  (that has in it this array of authors). This returned function should accept one parameter that is a function (writeString). writeString will be a function that will print the contents of the array. It takes one parameter which is a String. 

For example for 
```json
{
   "searchedBook":"The Book", 
   "author":"John James", 
   "numBooks":21
} 
```
should convert to the string: 
> John James wrote The Book and 20 other books 

This string should be passed to the writeString function. (*Notice:*  numBooks was -1 in the string).

In the code example given, addHTML is the function that is passed. But it could be other functions, like console.log, etc. 

Other things to consider:
* Use no outside javascript libraries. No jQuery, etc. 
* You can use Fetch for grabbing json from the REST API (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* You can use any part of ES6 Javascript.
* Use a modern web browser with support for ES6 (i.e. Chrome/Firefox)
* Check your inputs ( The parameter for SearchAuthors must be a String, check it or try to convert it, the parameter of printArray must be a function, return -1 if the parameter is not a function)
* Use the developer tools in your browser to help with debugging
* You will need to have a local server to run javascript from a local source on your browser. If you have python installed on your computer, you can run "python -m SimpleHTTPServer” in your cloned repo directory from the command line. Then in your browser go to http://localhost:8000/ You should see the html file and be able to run the javascript code. 
    *  You can also use tools like jsbin.com to run code in the browser as well
* Do not rely on Global Variables! Multiple versions/copies of SearchAuthors should work the same and not interfere with each other. Use closure and local scopes to not cause side effects!

### Grading
* **80 Points** - Current code works as expected (You enter a search term in the HTML document, and the correct results are displayed in the formatted stated in the README
* **10 Points** - Functions only accept parameters as expected (checks types) and works with other code/functions not included in this assignment. Do not rely on Global Variables. You code should not have side effects.
* **10 Points** - well commented and easy to read/follow

* If code doesn't run/compile you can get no more than a 65. But please write comments and a README to explain the process, what you were trying to do. 

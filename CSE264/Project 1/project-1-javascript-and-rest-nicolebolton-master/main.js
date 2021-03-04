/*
 * This files holds all the code for Project 1.
 */

//Run once broswer has loaded everything
window.onload = function () {

 //Function that adds new Divs to the HTML page
 function addHTML(text)
{
  //Grab the container div
  var start_div = document.getElementById('start');
  //make a new Div element
  var newElement = document.createElement('div');
  //add text to that div
  newElement.innerHTML = text;
  //append it to the main 
  start_div.appendChild(newElement);
}

/*
Given a title to search, find the authors that relate to that title
take those authors and find the number of books they have written
 */
  async function SearchAuthors (title_search)
{
  //process title search; trim extra spaces off, replace inner spaces with +
  title_search = title_search.trim();
  var search = title_search.split(" ").join("+");
  var authors = []; //authors array to keep track of repeated authors
  var searches = [];

  // fetch for title search
  await fetch(`http://openlibrary.org/search.json?title=${search}&limit=25`)
    .then(response => {
      //take response from fetch and turn to json
      return response.json();

    })
    .then(jsonResponse => {
      if (jsonResponse.docs) { //check that docs attr of json response exists
        // want to access data for each book result in json response
        jsonResponse.docs.forEach(async book => {

          // check that book author does not have repeat author results
          // only want to search each author once
          if (book.author_name && authors.includes(book.author_name[0]) === false) {
            // using author array, add name to array if name is not in array
            authors.push(
              book.author_name[0]
            );

            //process author search; replace inner spaces with +
            var author_search = book.author_name[0];
            author_search = author_search.split(" ").join("+");

            //fetch for author search
            await fetch(`http://openlibrary.org/search.json?author=${author_search}`)
              .then(response2 => {
                return response2.json();
              })
              .then(jsonResponse2 => {

                //check if json response of author search contains attr numFound
                if (jsonResponse2.numFound) {
                  return jsonResponse2.numFound; //return promise of the # of books for author
                }
              })
              .then(numBooks => {

                //map each author search into a search object to be returned
                return search =
                  {
                    "searchedBook": title_search,
                    "author": book.author_name[0],
                    "numBooks": numBooks
                  }
              })
              .then(search => {
                //add searches to search array
                searches.push(search);
                //order them based on numBooks
                searches.sort(function(a, b){
                  return b.numBooks - a.numBooks;
                });
                //take the search promise and pass it into PrintArray
                printArray(writeString);
              })
          }
        })
        return searches;
      }
    })
    .catch(error => {
      //if receive error addHTML signifying no matches
      addHTML(`No matches found`);
    });
  /*
  function creates string with search information
  passes into it a callback function
   */
  function printArray(callback) {
    // searches.forEach(search => {
    //   var string = `${search.author} wrote the book ${search.searchedBook} and ${search.numBooks} other books`;
    //   callback(string);
    // })
      console.log(`${search.author} wrote the book ${search.searchedBook} and ${search.numBooks} other books`);
      var string = `${search.author} wrote the book ${search.searchedBook} and ${search.numBooks} other books`;
      callback(string);
  }

  /*
  function passes string the given addHTML function
   */
  function writeString(string) {
    addHTML(string);
  }


}

//gran the current form in the HTML document
var form = document.querySelector("form");

//event that listens for form submit
form.addEventListener("submit", function(event) {
  var search_text = form.elements.value.value;
  
  console.log("Saving value", search_text);
  
  //get main DIV
  var start_div = document.getElementById('start');
  //Clear main DIV
  start_div.innerHTML = '';
  
  addHTML("Looking up Authors for search term "+search_text);
  
  //uncomment these lines to run your code here
  SearchAuthors(search_text);

  
  event.preventDefault();
});

};
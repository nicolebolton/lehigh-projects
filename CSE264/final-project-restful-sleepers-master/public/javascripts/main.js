/*
 * This files holds all the code to test you REST API
 */

//Run once broswer has loaded everything
$(document).ready(function() {
    if (sessionStorage.getItem('session') === null){
        window.location.replace('/login');
    }
});

window.onload = function () {

    var session = this.sessionStorage.getItem('session');
    //search a recipe by ingredients

    if (sessionStorage.getItem('admin') === 'true') {
        $("<a/>", {id: "userBtn"}).text('View Users').insertAfter("#saved");

        document.getElementById("userBtn")
          .addEventListener("click", function(e){
              window.location.replace("/users");
          });
    }

    document.getElementById("logout")
      .addEventListener("click", function(e){
          sessionStorage.removeItem('session');
          sessionStorage.removeItem('user');
          sessionStorage.clear();
          window.location.replace("/login");
      });


    document.getElementById("search-submit")
    .addEventListener("click", function(e){
        //console.log("yay");
        var info = { "ingredients": document.getElementById("ingredientSearch").value};
        console.log(info);
        $.ajax({
            type: "POST",
            url: "/posts/search",
            dataType: "json",
            data: info,
            success: function (msg, status, jqXHR) {
                var $div_container = $("#result-container");
                $div_container.empty();

                //RECIPE GET
                var recipe = msg;

                if (recipe.length === 0) {
                    $div_container.append($('<h2 />', {class: 'no-result'}).text(`Oops, looks like we couldn't find anything`))
                }
                //console.log(recipe);
                var i = 0;
                recipe.forEach(result => {
                    i += 1;
                    var $result_container =  $('<div />', {class: 'search-result ui segment', id: result.id});

                    var $result_title = $("<h3 />", {class: 'recipe-title'}).text(result.title);
                    var $result_img = $("<img />", {class: 'recipe-image'})
                      .attr("src", result.image);
                    var $save_recipe = $("<a />", {class: 'bookmark' , id : 'bookmark'+i})
                      .append($("<i/>", {class: 'bookmark outline icon'}));
                    var $more_info = $('<div/>', {class: 'more-info'})
                      .append($("<h4/>").text(`Uses ${result.usedIngredients.length} Ingredient(s)`));




                    $result_container.append(
                      $result_img, $save_recipe, $result_title, $more_info
                    );

                    $result_container.appendTo($div_container);
                })

                $(".bookmark#bookmark1").click(function() {

                    $(this).find('i').removeClass('outline');
                    var result = recipe[0];
                    document.getElementById('bookmark1');

                        var id = result.id;
                        
                        var info = {
                                "username": sessionStorage.getItem('user'),
                                "id": result.id,
                                "title": result.title,
                                "image": result.image,
                                "imageType": result.imageType,
                                "session": sessionStorage.getItem('session')
                                }
                        console.log(info);

                        $.ajax({
                            type: "POST",
                            url:  '/posts/' +id+ '/save',
                            dataType: "json",
                            data: info,
                            success: function (msg, status, jqXHR) {
                            //RECIPE GET
                            
                            console.log("searched OK");
                            }
                    });
                });

                $(".bookmark#bookmark2").click(function() {

                    $(this).find('i').removeClass('outline');
                    var result = recipe[1];
                    document.getElementById('bookmark2')
                        
                        console.log('Got here');
                        var id = result.id;
                    var info = {
                        "username": sessionStorage.getItem('user'),
                        "id": result.id,
                        "title": result.title,
                        "image": result.image,
                        "imageType": result.imageType,
                        "session": sessionStorage.getItem('session')
                    }
                    console.log(info);

                    $.ajax({
                        type: "POST",
                        url:  '/posts/' +id+ '/save',
                        dataType: "json",
                        data: info,
                        success: function (msg, status, jqXHR) {
                            //RECIPE GET

                            console.log("searched OK");
                        }
                    });
                });

                $(".bookmark#bookmark3").click(function() {

                    $(this).find('i').removeClass('outline');
                    var result = recipe[2];
                    document.getElementById('bookmark3')
                        
                        console.log('Got here');
                        var id = result.id;
                    var info = {
                        "username": sessionStorage.getItem('user'),
                        "id": result.id,
                        "title": result.title,
                        "image": result.image,
                        "imageType": result.imageType,
                        "session": sessionStorage.getItem('session')
                    }
                    console.log(info);

                    $.ajax({
                        type: "POST",
                        url:  '/posts/' +id+ '/save',
                        dataType: "json",
                        data: info,
                        success: function (msg, status, jqXHR) {
                            //RECIPE GET

                            console.log("searched OK");
                        }
                    });
                });
                $(".bookmark#bookmark4").click(function() {

                    $(this).find('i').removeClass('outline');
                    var result = recipe[3];
                    document.getElementById('bookmark4')
                        
                        console.log('Got here');
                        var id = result.id;
                    var info = {
                        "username": sessionStorage.getItem('user'),
                        "id": result.id,
                        "title": result.title,
                        "image": result.image,
                        "imageType": result.imageType,
                        "session": sessionStorage.getItem('session')
                    }
                    console.log(info);

                    $.ajax({
                        type: "POST",
                        url:  '/posts/' +id+ '/save',
                        dataType: "json",
                        data: info,
                        success: function (msg, status, jqXHR) {
                            //RECIPE GET

                            console.log("searched OK");
                        }
                    });
                });
                $(".bookmark#bookmark5").click(function() {

                    $(this).find('i').removeClass('outline');
                    var result = recipe[4];
                    document.getElementById('bookmark5')
                        
                        console.log('Got here');
                        var id = result.id;
                    var info = {
                        "username": sessionStorage.getItem('user'),
                        "id": result.id,
                        "title": result.title,
                        "image": result.image,
                        "imageType": result.imageType,
                        "session": sessionStorage.getItem('session')
                    }
                    console.log(info);

                    $.ajax({
                        type: "POST",
                        url:  '/posts/' +id+ '/save',
                        dataType: "json",
                        data: info,
                        success: function (msg, status, jqXHR) {
                            //RECIPE GET

                            console.log("searched OK");
                        }
                    });
                });
                $(".bookmark#bookmark6").click(function() {
                    $(this).find('i').removeClass('outline');
                    var result = recipe[5];
                    document.getElementById('bookmark6')

                    console.log('Got here');
                    var id = result.id;

                    var info = {
                        "username": sessionStorage.getItem('user'),
                        "id": result.id,
                        "title": result.title,
                        "image": result.image,
                        "imageType": result.imageType,
                        "session": sessionStorage.getItem('session')
                    }
                    console.log(info);

                    $.ajax({
                        type: "POST",
                        url:  '/posts/' +id+ '/save',
                        dataType: "json",
                        data: info,
                        success: function (msg, status, jqXHR) {
                            //RECIPE GET

                            console.log("searched OK");
                        }
                    });
                });

                $(".recipe-title, .recipe-image").click(function() {
                    var recipe_id = $(this).parent().attr('id');
                    $.ajax({
                        type: "GET",
                        url: `/posts/search/${recipe_id}`,
                        success: function (res, status, jqXHR) {
                            var recipe_info = res;
                            console.log(recipe_info);
                            window.open(recipe_info.sourceUrl, '_blank');
                        }
                    })
                });
            }
        });
    },false);

    document.getElementById("saved")
    .addEventListener("click", function(e){
        window.location.replace("/saved");        
    });

    document.getElementById("logout")
    .addEventListener("click", function(e){
        sessionStorage.removeItem('session');
        sessionStorage.removeItem('user');
        //not redirecting
        window.location.replace("/login");          
    });            


    document.getElementById("user-img")
      .addEventListener("click", function(e){
          window.location.replace("/");
      });




};
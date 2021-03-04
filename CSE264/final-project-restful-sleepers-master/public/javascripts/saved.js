$(document).ready(function() {
    if (sessionStorage.getItem('session') === null){
        window.location.replace('/login');
    }
});

window.onload = function(){

    var session = this.sessionStorage.getItem('session');
    var user = this.sessionStorage.getItem("user");

    if (sessionStorage.getItem('admin') === 'true') {
        $("<a/>", {id: "userBtn"}).text('View Users').insertAfter("#saved");
        document.getElementById("userBtn")
          .addEventListener("click", function(e){
              window.location.replace("/users");
          });
    }

    $.ajax({
        type: "GET",
        url: "/posts/" + user,
        dataType: "json",
        success: function (msg, status, jqXHR) {
            var body = {username: sessionStorage.getItem('user'), session: sessionStorage.getItem('session')};
            var id = msg;
            $.ajax({
                type: "POST",
                url: "/posts/" + id + "/recipes",
                dataType: "json",
                data: body,
                success: function (msg, status, jqXHR) {
                    console.log(msg);
                    var recipe = msg;
                    var $div_container = $("#result-container");
                    $div_container.empty();
                    if (recipe.length === 0) {
                        $div_container.append($('<h2 />', {class: 'no-result'}).text(`Oops, looks like we couldn't find anything`))
                    }
                    //console.log(recipe);
                    recipe.forEach(result => {
                        console.log(result.id);
                        var $result_container =  $('<div />', {class: 'search-result ui segment', id: result.id});

                        var $result_title = $("<h3 />", {class: 'recipe-title'}).text(result.title);
                        var $result_img = $("<img />", {class: 'recipe-image'})
                          .attr("src", result.image);


                        $result_container.append(
                          $result_img, $result_title
                        );

                        $result_container.appendTo($div_container);
                    })

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
        }
    });

    document.getElementById("user-img")
      .addEventListener("click", function(e){
          window.location.replace("/");
      });

    document.getElementById("saved")
      .addEventListener("click", function(e){
          window.location.replace("/saved");
      });

    document.getElementById("logout")
    .addEventListener("click", function(e){
        sessionStorage.removeItem('session');
        sessionStorage.removeItem('user');
        sessionStorage.clear();
        window.location.replace("/login");
    }); 

    
}
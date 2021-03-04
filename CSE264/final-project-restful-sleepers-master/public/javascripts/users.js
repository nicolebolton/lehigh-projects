$(document).ready(function() {
    if (sessionStorage.getItem('session') === null){
        window.location.replace('/login');
    }
});

window.onload = function() {

    if (sessionStorage.getItem('admin') === 'true') {
        $("<a/>", {id: "userBtn"}).text('View Users').insertAfter("#saved");

        document.getElementById("userBtn")
          .addEventListener("click", function(e){
              window.location.replace("/users");
          });
    }

    $.ajax({
        type: "GET",
        url: "/posts/users",
        dataType: "json",
        success: function (msg, status, jqXHR) {
            console.log(msg);
            var users = msg;
            var $div_container = $("#result-container");
            $div_container.empty();

            users.forEach(user => {
                var $result_container =  $('<div />', {class: 'search-result ui segment user', id: user.id});
                var $user = $("<h3 />", {class: 'recipe-title user'}).text(user.username);
                var $user_email = $("<h3 />", {class: 'recipe-title user'}).text(user.email);

                $result_container.append(
                  $user, $user_email
                );

                $result_container.appendTo($div_container);
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
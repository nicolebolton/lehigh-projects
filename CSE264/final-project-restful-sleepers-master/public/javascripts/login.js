window.onload = function() {
  document.getElementById("create-account")
    .addEventListener("click", function(e){
        $('.ui.modal.create')
          .modal('show')
        ;
    });


    //issue here: it's hanging
  document.getElementById("account-submit")
    .addEventListener("click", function(e){
        var info = {username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            email: document.getElementById("email").value
        };
        $.ajax({
            type: "POST",
            url: "/posts/signup",
            dataType: "json",
            data: info,
            success: function(msg, status, jqXHR){
                console.log("registered ok");
                sessionStorage.setItem('session', msg.session);
                sessionStorage.setItem('admin', msg.admin);
                sessionStorage.setItem('user', info.username);
                window.location.replace('/');
            }
        });
    });

  //oops they have an account after all
  document.getElementById("sign-in")
    .addEventListener("click", function(e){
        $('.ui.modal.create')
          .modal('hide')
        ;
    });


  //they have a login
  //Should be OK
  document.getElementById("login-submit")
    .addEventListener("click", function(e){
        //check if valid login
        var info = {username: document.getElementById("user").value, password: document.getElementById("pass").value};
        if (info.username && info.password) {
            $.ajax({
                type: "POST",
                url: "/posts/login/" + info.username,
                dataType: "json",
                data: info,
                success: function(msg, status, jqXHR){
                    console.log(msg);
                    sessionStorage.setItem('session', msg.session);
                    sessionStorage.setItem('admin', msg.admin);
                    sessionStorage.setItem('user', info.username);
                    console.log("Session made OK");
                    window.location.replace('/');
                }
            });
        } else{
            alert('No username or password entered');
        }
    });
}
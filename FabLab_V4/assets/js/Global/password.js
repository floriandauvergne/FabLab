$(document).ready(function () {
    if (localStorage.getItem('Email') == null) {
        window.location = "login.html";
    }

    $("#email").text(localStorage.getItem('Email'))

    if (localStorage.getItem('Grade') == 4)
        $("a").attr("href", "Admin/profile.html")

    else
        $("a").attr("href", "Adherent/profile.html")


    $("button").click(function () {
        if ($("#password").val()) {
            if ($("#password").val() != $("#password-repeat").val()) {
                alert("Les mot de passe ne correspondent pas")
            } else {
                $.ajax({
                    url: 'http://51.210.151.13/btssnir/projets2022/fablab/api/profil/mdp.php',
                    dataType: 'json',
                    data: {mail:localStorage.getItem('Email'),mdp:$("#password").val()},
                    type: 'post',
                    success: function(msg){
                        if(msg.success==true){
                            window.location="profile.html";
                        }else
                            $("#email").text("UNE ERREUR EST SURVENUE")
                    }
                });
            }
        } else {
            alert("Veuillez saisir un mot de passe")
        }
    })
})
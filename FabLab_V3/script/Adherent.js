$(document).ready(function() {
    var url="https://a3b49ec7-c30d-4962-9bad-63b0c319f410.mock.pstmn.io/"
    var request = $.ajax({
        method: "GET",
        url: url+"banniere.php",
        data: { mail : localStorage.getItem('Email')},
        dataType: "json"
    });
    request.done(function(msg) {

        switch (msg.Grade){
            case "1" : msg.Grade="Member";break;
            case "2" : msg.Grade="Teacher";break;
            case "3" : msg.Grade="Manager";break;
            case "4" : msg.Grade="Admin";break;
        }

        $("header").html("<p>"+msg.Prenom+" "+msg.Grade+"<a href=\"Profil.html\"><img src=\""+msg.Photo+"\" height=\"40\" width=\"40\"></a> </p>");
    })
})
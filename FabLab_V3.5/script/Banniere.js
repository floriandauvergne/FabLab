$(document).ready(function() {
    var url = "../api"
    var request = $.ajax({
        method: "GET",
        url: url + "/profil/banniere.php",
        data: {mail: localStorage.getItem('Email')},
        dataType: "json"
    });
    request.done(function (msg) {
        switch (msg.Grade) {
            case "1" :
                msg.Grade = "Member";
                break;
            case "2" :
                msg.Grade = "Teacher";
                break;
            case "3" :
                msg.Grade = "Manager";
                break;
            case "4" :
                msg.Grade = "Admin";
                break;
        }

        $("header").html("<p>" + msg.Prenom + " " + msg.Grade + "<a href=\"Profil.html\"><img src=\"" + msg.Photo + "\" height=\"40\" width=\"40\"></a> </p>");
    })
})
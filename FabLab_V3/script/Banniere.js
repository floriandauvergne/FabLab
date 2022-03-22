$(document).ready(function() {
    var url = "https://b268076a-1104-466e-837a-a82b9ada121d.mock.pstmn.io/profil/"
    var request = $.ajax({
        method: "GET",
        url: url + "banniere",
        data: {mail: localStorage.getItem('Email')},
        dataType: "json"
    });
    request.done(function (msg) {
        console.log(msg.Grade)

        switch (msg.Grade) {
            case 1 :
                msg.Grade = "Member";
                break;
            case 2 :
                msg.Grade = "Teacher";
                break;
            case 3 :
                msg.Grade = "Manager";
                break;
            case 4 :
                msg.Grade = "Admin";
                break;
        }

        $("header").html("<p>" + msg.Nom + " " + msg.Grade + "<a href=\"Profil.html\"><img src=\"" + msg.Photo + "\" height=\"40\" width=\"40\"></a> </p>");
    })
})
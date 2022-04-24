$(document).ready(function() {
    var request = $.ajax({
        method: "GET",
        url: "../../api/profil/banniere.php",
        data: {mail: localStorage.getItem('Email')},
        dataType: "json"
    });
    request.done(function (msg) {
        if(msg==null){
            localStorage.clear();
            window.location="../login.html";
        }
        localStorage.setItem('Grade', msg.Grade);

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
        $("#banniere").append("<div class=\"container-fluid\">\n" +
            "                        <ul class=\"navbar-nav flex-nowrap ms-auto\">\n" +
            "                            <li class=\"nav-item dropdown no-arrow\">\n" +
            "                                <div class=\"nav-item dropdown no-arrow\"><a class=\"dropdown-toggle nav-link\" aria-expanded=\"false\" data-bs-toggle=\"dropdown\" href=\"#\"><span class=\"d-none d-lg-inline me-2 text-gray-600 small\" id=\"nom_compte\">"+msg.Prenom+" "+msg.Nom+"</span><img id=\"photo_compte\"  class=\"border rounded-circle img-profile\" src=\""+msg.Photo+"\"></a>\n" +
            "                                    <div id='deconnexion' class=\"dropdown-menu shadow dropdown-menu-end animated--grow-in\" ><a class=\"dropdown-item\"><i class=\"fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400\"></i>&nbsp;Logout</a></div>\n" +
            "                                </div>\n" +
            "                            </li>\n" +
            "                        </ul>\n" +
            "                    </div>");
        $("#deconnexion").click(function (){

            setInterval(function (){
                localStorage.clear();
                window.location="../login.html";}, 100);
        })

    })
})
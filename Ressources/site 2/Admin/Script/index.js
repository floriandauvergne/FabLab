function recuperer() {
    var ancien_message;
    var request = $.ajax({
        method: "POST",
        url: "../../api/log/membrepresents.php",
        data: {},
        dataType: "json"
    });

    request.done(function (msg) {
        $("#Heure").text("Membres présents à " + msg[0].Heure + "H" + msg[0].Minute);
        if(ancien_message!=msg){
            $("#Membres-presents").empty();
            if (msg.length > 1) {

                for (let i = 1; i < msg.length; i++) {
                    $("#Membres-presents").append("<div class=\"col-lg-2 mb-4\">\n" +
                        "                                    <div class=\"card textwhite bg-" + msg[i].Couleur + " text-white shadow text-center\">\n" +
                        "                                        <div class=\"card-body\"><img height='60px' width='60px' class=\"border rounded-circle img-profile\" src=\"" + msg[i].Photo + "\">\n" +
                        "                                            <p class=\"m-0\">" + msg[i].Prenom + "." + msg[i].Nom[0] + "</p>\n" +
                        "                                            <p class=\"text-white-50 small m-0\">" + msg[i].Grade + "</p>\n" +
                        "                                        </div>\n" +
                        "                                    </div>\n" +
                        "                                </div>")
                }

            } else {
                $("#Membres-presents").append("<h4 class=\"text-dark mb-0\">Aucun membre n'est présent actuellement</h4>")
            }
        }
    })
}


$(document).ready(function () {


    recuperer();

    setTimeout(function () {
        if (localStorage.getItem('Grade') != "4") {
            window.location = "../Adherent";
        }
    }, 500)

    setInterval(function timeChecker() {


        var oldTime = timeChecker.oldTime || new Date().getMinutes(),
            newTime = new Date().getMinutes(),
            timeDiff = newTime - oldTime;

        timeChecker.oldTime = newTime;




        if (timeDiff!=0) {
            recuperer();
        }
    }, 500);


    //
    // setInterval(function (){
    //     var current=new Date();
    //     setTimeout(function (){
    //         var last = new Date();
    //         if (last.getMinutes() != current.getMinutes()) {
    //              recuperer()
    //         }
    //     },500)
    // },1000)


//     setInterval(function () {
//         var last = new Date();
//         setTimeout(function (){
//
//             var current= new Date();
//
//             console.log(last.getMinutes());
//             console.log(current.getMinutes());
//
//
//             if (last.getMinutes() != current.getMinutes()) {
//                 alert("changegemnt")
//                 // recuperer()
//             }
//         } ,500)
//     }, (2000))
 })
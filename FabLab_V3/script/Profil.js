$(document).ready(function() {
    var url="https://a3b49ec7-c30d-4962-9bad-63b0c319f410.mock.pstmn.io/"

    var request = $.ajax({
        method: "GET",
        url: url+"profil.php",
        data: { mail : localStorage.getItem('Email')},
        dataType: "json"
    });

    request.done(function(msg) {

        switch (msg.Grade){
            case 1 : msg.Grade="Member";break;
            case 2 : msg.Grade="Teacher";break;
            case 3 : msg.Grade="Manager";break;
            case 4 : msg.Grade="Admin";break;
        }
        $("input")[0].value=msg.Nom;
        $("input")[1].value=msg.Prenom;
        $("input")[2].value=msg.Mail;
        $("input")[3].value=msg.Grade;
        $("input")[4].value=msg.Age;
        $("input")[5].value=msg.Tel;
        $("img").attr("src", msg.Photo);

    })
    request.fail(function(jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });

    $("#Modif").click(function (){
        var ancien_mail=$("input")[2].value;
        $("#Modif").css({display: "none"})
        $("input").prop( "disabled", false );
        $("#grade").prop( "disabled", true );
        $("div").append("<button id=\"Confirmer\">Confirmer</button><button id=\"Annuler\">Annuler</button>");

        $("#Annuler").click(function (){location.reload();})

        $("#Confirmer").click(function (){

            request = $.ajax({
                method: "POST",
                url: "profil.php",
                data: {
                    ancien_mail: ancien_mail,
                    modif :"1",
                    nom:$("input")[0].value,
                    prenom:$("input")[1].value,
                    age:$("input")[4].value,
                    tel:$("input")[5].value,
                    mail:$("input")[2].value,
                    Photo:null
                },
                dataType: "json"
            });
            request.done(function (msg){
                if(msg.success==true){
                    alert("Changement effectuee");
                    location.reload();
                }
                else
                    alert("Une erreur est arrivée");
            })

        })
    })
})

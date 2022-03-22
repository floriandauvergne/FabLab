$(document).ready(function() {
    var url="https://b268076a-1104-466e-837a-a82b9ada121d.mock.pstmn.io/profil"

    var request = $.ajax({
        method: "GET",
        url: url+"/recuperer",
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
        $("#Modif").css({display: "none"})
        $("input").prop( "disabled", false );
        $("#grade").prop( "disabled", true );
        $("div").append("<button id=\"Confirmer\">Confirmer</button><button id=\"Annuler\">Annuler</button>");

        $("#Annuler").click(function (){location.reload();})

        $("#Confirmer").click(function (){

            request = $.ajax({
                method: "POST",
                url: url+"/modifier",
                data: {
                    ancien_mail: $("input")[2].value,
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

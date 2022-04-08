$(document).ready(function() {
    $('body').hide();

    var url = "../api/profil"

    var request = $.ajax({
        method: "GET",
        url: url+"/recuperer.php",
        data: { mail : localStorage.getItem('Email')},
        dataType: "json"
    });

    $(function () {
        function checkPendingRequest() {
            if ($.active > 0) {
                $('html').css('cursor', 'wait');
                 window.setTimeout(checkPendingRequest, 1000);
            }
            else {
                $('html').css('cursor', 'auto');
                $("body").show();

            }
        };

        window.setTimeout(checkPendingRequest, 0);
    });

    request.done(function(msg) {

        switch (msg.Grade){
            case "1" : msg.Grade="Member";break;
            case "2" : msg.Grade="Teacher";break;
            case "3" : msg.Grade="Manager";break;
            case "4" : msg.Grade="Admin";break;
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
        var ancien_mail=document.getElementsByTagName("input")[2].value;
        var photo_profil=document.getElementsByTagName('img')[0].src;
        $("#Modif").css({display: "none"})
        $("input").prop( "disabled", false );
        $("#grade").prop( "disabled", true );
        $("div").append("<button id=\"Confirmer\">Confirmer</button><button id=\"Annuler\">Annuler</button>");

        $("#Annuler").click(function (){location.reload();})

        $("#Confirmer").click(function (){
            var age_valable=0;
            var tel_valable=0;

            if($("input")[4].value>15&&$("input")[4].value<99){
                 age_valable=1;
            }else
                alert("L'age n'est pas valide");

            if($("input")[5].value.length==10){
                tel_valable=1;
            }else
                alert("Le numéro de téléphone n'est pas valide");

            if(age_valable==1&&tel_valable==1){
                request = $.ajax({
                    method: "POST",
                    url: url+"/modifier.php",
                    data: {
                        nom:$("input")[0].value,
                        prenom:$("input")[1].value,
                        mail:$("input")[2].value,
                        age:$("input")[4].value,
                        tel:$("input")[5].value,
                        ancien_mail: ancien_mail,
                        Photo:photo_profil
                    },
                    dataType: "json"
                });
                request.done(function (msg){
                    if(msg.success==true){
                        alert("Changement effectuee");
                        localStorage.setItem('Email', $("input")[2].value);
                        location.reload();
                    }
                    else
                        alert("Une erreur est arrivée");
                })
            }


        })
    })
    if(window.closed){
        localStorage.clear();
    }
})

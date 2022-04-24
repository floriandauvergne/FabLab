var mail;
var limite=3;
var url = "../api/";
var ID;
function recup_membres(limit){
    var request = $.ajax({
        method: "GET",
        url: url + "membre/recuperer.php",
        data: {limite:limit},
        dataType: "json"
    });
    request.done(function (msg) {
        for (i = 0; i < msg.length; i++) {
            if (msg[i].Grade=="4")
                $("#liste").append("⭐<a href=\"javascript:void(0)\" id='"+i+"'>" + msg[i].Nom + "." + msg[i].Prenom[0] + "</a><br>")

            else
            $("#liste").append("<a href=\"javascript:void(0)\" id='"+i+"'>" + msg[i].Nom + "." + msg[i].Prenom[0] + "</a><br>")

            $("#"+i).click(function (){

                ID=msg[this.id].ID

                if(msg[this.id].Mail==localStorage.getItem('Email')){
                    alert("Vous ne pouvez pas changer votre grade");
                    $("#Membres_liste").css({display: "block"});
                    $("#Membres_Modif").css({display: "none"});
                }
                else {
                    $("#Membres_liste").css({display: "none"})
                    $("#Membres_Modif").css({display: "block"})
                    var liste=$($("#table_info")[0]).find("td").find("input");
                    var image=$($("#table_info")[0]).find("td").find("img")[0];
                    var grade=(msg[this.id].Grade)-1;
                    mail=msg[this.id].Mail;
                    $(liste)[0].value=msg[this.id].Nom;
                    $(liste)[1].value=msg[this.id].Prenom;
                    $(liste)[2].value=msg[this.id].Mail;
                    $(liste)[3].value=msg[this.id].Age;
                    $(liste)[4].value=msg[this.id].Tel;
                    $(image).attr("src", msg[this.id].Photo);
                    var option="#Membre_Modifier_Grade option:eq("+grade+")";
                    $(option).prop('selected', true);
                }
            });
        }
    })

    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });

    var request = $.ajax({
        method: "GET",
        url: url + "membre/recuperer.php",
        data: {nombre:1},
        dataType: "json"
    });

    request.done(function (msg) {
        $("#Nombre").text("Nombres d'adhérents total: "+msg.Nombre)
        if(limite>=msg.Nombre){
            $("#Afficher_plus").hide();
        }
    })

    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}


$(document).ready(function () {
    var Heure = new Date().getHours()
    var Minute =new Date().getMinutes()

    recup_membres(limite)

    var request = $.ajax({
        method: "GET",
        url:url+"log/membrepresents.php",
        data: {},
        dataType: "json"
    });
    request.done(function (msg) {
        document.getElementById("time").innerText="Membres présent à "+msg[0].Heure+" H : "+msg[0].Minute
        console.log(msg)
        if (msg.length > 1) {
            for (i = 1; i < msg.length; i++) {
                $("#Membres_présent").find("tbody").append("<tr><td>" + msg[i].Nom + "." + msg[i].Prenom[0] + " <img class='rounded-circle' src=\"" + msg[i].Photo + "\" height=\"40\" width=\"40\"></td></tr>");
            }
        }else {
            $("#Membres_présent").find("tbody").append("<tr><td>Aucun membre n'est présent actuellement au FABLAB</td><td></td></tr>");
        }
    })

    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });

    $($("#Membres_Modif").find("button")[0]).click(function (){
        var Grade=0;
        var Mail=mail;
            switch ($("#Membre_Modifier_Grade").val()){
                case "Admin" : Grade=4;break;
                case "Manager" : Grade=3;break;
                case "Teacher" : Grade=2;break;
                case "Member" : Grade=1;break;
            }

        var request = $.ajax({
            method: "POST",
            url: url + "membre/modifier.php",
            data: {mail:Mail,grade:Grade},
            dataType: "json"
        });
        request.done(function (msg) {
            if (msg.success==true) {
                alert("Changement effectué");
                $("#liste").empty();
                recup_membres(limite);
                $("#Membres_liste").css({display: "block"})
                $("#Membres_Modif").css({display: "none"})
            }
            else{alert("Erreur")}
        })

        request.fail(function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });
    })

    $("#Afficher_plus").click(function (){
        $("#liste").hide();

        limite=limite+3;
        $("#liste").empty();
        recup_membres(limite);
        $("#liste").delay( 500 ).fadeIn( 500 );
    })

    $($("#Membres_Ajout").find("button")[0]).click(function (){
        //$($("#Membres_Ajout").find("input")[0]).val()
        var tab=$("#Membres_Ajout_Tableau").find("input")
        var nom=tab[0].value;
        var prenom=tab[1].value;
        var mail=tab[2].value;
        var grade=tab[3].value;

        if(nom!=""&&prenom!=""&&mail!=""&&grade!=""){
            var request = $.ajax({
                method: "POST",
                url: url + "membre/ajouter.php",
                data: {Nom:nom,Prenom:prenom,Mail:mail,Grade:grade},
                dataType: "json"
            });
            request.done(function (msg) {
                if (msg.success==true) {
                    alert("Changement effectué");
                    $("#Membres_liste").css({display: "block"})
                    $("#Membres_Ajout").css({display: "none"})
                    $("#liste").hide();
                    $("#liste").empty();
                    limite=(limite-limite)+3
                    recup_membres(limite);
                    $("#liste").delay( 500 ).fadeIn( 500 );
                    $("#Afficher_plus").show();
                }
                else{
                    alert("Erreur")
                }

            })

            request.fail(function (jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });

        }
        else{
            alert("Le formulaire n'est pas conforme")
        }

    })

    $("#Membres_Modif_Supprimer").click(function (){
        if (window.confirm("Voulez-vous supprimer ce membre ?")) {
            request = $.ajax({
                method: "POST",
                url: url+"/membre/supprimer.php",
                data: {
                    id:ID
                },
                dataType: "json"
            });
            request.done(function(msg) {
                if(msg.success==true){
                    alert("Membre Supprimé")
                    $("#Membres_liste").css({display: "block"})
                    $("#Membres_Modif").css({display: "none"})
                    $("#liste").hide();
                    $("#liste").empty();
                    limite=(limite-limite)+3
                    recup_membres(limite);
                    $("#liste").delay( 500 ).fadeIn( 500 );
                    $("#Afficher_plus").show();
                }
            })
            request.fail(function(jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });
        }
    })

    $("#Membres_bouton").click(function () {
        $("#Membres").css({display: "block"})
        $("#Membres_liste").css({display: "block"})
        $("#Membres_présent").css({display: "none"})
        $("#Membres_Ajout").css({display: "none"})
        $("#Membres_Modif").css({display: "none"})

        $("#Info").css({display: "none"})
        $("#Cadenas").css({display: "none"})
    })

    $("#Affiche_Membres_présent").click(function () {
        $("#Membres_liste").css({display: "none"})
        $("#Membres_Ajout").css({display: "none"})
        $("#Membres_présent").css({display: "block"})
    })

    $("#Ajouter_un_membre").click(function () {
        $("#Membres_liste").css({display: "none"})
        $("#Membres_Ajout").css({display: "block"})
    })

    $("#Membres_Ajout_Annuler").click(function () {
        $("#Membres_liste").css({display: "block"})
        $("#Membres_Ajout").css({display: "none"})
    })

    $("#Membres_Modif_Annuler").click(function () {
        $("#Membres_liste").css({display: "block"})
        $("#Membres_Modif").css({display: "none"})
    })

    $("#Membre_Ajout_Plusieurs").click(function () {
        $("#Membre_Ajout_Plusieurs_Formulaire").css({display: "block"})
    })

    $("#Membre_Ajout_Plusieurs_Annuler").click(function () {
        $("#Membre_Ajout_Plusieurs_Formulaire").css({display: "none"})
    })


})

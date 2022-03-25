$(document).ready(function() {
    var url="https://b268076a-1104-466e-837a-a82b9ada121d.mock.pstmn.io/cadenas/"

    var request = $.ajax({
        method: "GET",
        url: url+"recuperer",
        dataType: "json"
    });

    request.done(function(msg) {
        for(i=0;i<msg.length;i++){

            if(msg[i].Actif){
                msg[i].Actif="Oui"
            }
            else
                msg[i].Actif="Non"

            var cadenas= "<dl><dt><a href=\"javascript:void(0)\">"+msg[i].NomCadenas+"</a></dt><dd>Id: "+msg[i].idCadenas+"/Niveau de sécurité: "+msg[i].Niveau+"/Actif : "+msg[i].Actif+"</dd></dl>"

            $("#cadenas_liste").append(cadenas)
        }
        $("#cadenas_liste").append("<button id=\"ajout\">Ajouter un cadenas</button>")

        $( "#cadenas_liste" ).children().click(function(){
            if(this.id=="ajout"){
                $("#cadenas_liste").css({display: "none"})
                $("#cadenas_modif").css({display: "none"})
                $("#cadenas_ajout").css({display: "block"})
            }
            else{
                $("#cadenas_liste").css({display: "none"})
                $("#cadenas_modif").css({display: "block"})
                var nom=this.childNodes[0].childNodes[0].innerText

                var cadenas=this.childNodes[1].innerText.split('/').join(',').split(':').join(',').split(',')

                var id=cadenas[1];
                var secu=cadenas[3];

                $('#cadenas_modif').find("input")[0].value=nom;
                $('#cadenas_modif').find("input")[1].value=id;
                $('#cadenas_modif').find("input")[2].value=secu;

                console.log(cadenas);
                $("#cadenas_ajout").css({display: "none"})
            }
        })

    })
    request.fail(function(jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });


    $($('#cadenas_ajout').find("button")[0]).click(function (){

        var nom=$('#cadenas_ajout').find("input")[0].value
        var ID=$('#cadenas_ajout').find("input")[1].value
        var Secu=$('#cadenas_ajout').find("input")[2].value

        if(nom!=""&&ID!=""&&Secu!=""){
            request = $.ajax({
                method: "POST",
                url: url+"ajouter",
                data: {
                    nom:nom,
                    ID:ID,
                    Secu:Secu
                },
                dataType: "json"
            });
            request.done(function(msg) {
                if(msg.action==true){
                    alert("Cadenas ajouté")
                    $('#cadenas_ajout').find("input")[0].value=""
                    $('#cadenas_ajout').find("input")[1].value=""
                    $('#cadenas_ajout').find("input")[2].value=""
                }
            })
            request.fail(function(jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });

        }
        else
            alert("Non rempli")

    })

    $($('#cadenas_modif').find("button")[0]).click(function (){

        var nom=$('#cadenas_modif').find("input")[0].value
        var ID=$('#cadenas_modif').find("input")[1].value
        var Secu=$('#cadenas_modif').find("input")[2].value

        if(nom!=""&&ID!=""&&Secu!=""){
            request = $.ajax({
                method: "POST",
                url: url+"modifier",
                data: {
                    nom:nom,
                    ID:ID,
                    Secu:Secu
                },
                dataType: "json"
            });
            request.done(function(msg) {
                if(msg.action==true){
                    alert("Cadenas modifié")
                }
            })
            request.fail(function(jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });

        }
        else
            alert("Non rempli")

    })



    $("#cadenas_bouton").click(function(){
        $("#Cadenas").css({display: "block"})
        $("#cadenas_liste").css({display: "block"})
        $("#cadenas_modif").css({display: "none"})
        $("#cadenas_ajout").css({display: "none"})

        $("#Info").css({display: "none"})
        $("#Membres").css({display: "none"})
    })



    $(".annulation").click(function(){
        $("#cadenas_liste").css({display: "block"})
        $("#cadenas_modif").css({display: "none"})
        $("#cadenas_ajout").css({display: "none"})
        $("#Membre_Ajout_Plusieurs_Formulaire").css({display: "none"})
    })
})

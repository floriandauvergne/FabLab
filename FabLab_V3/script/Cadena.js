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

            var cadenas= "<dl><dt><a href=\"javascript:void(0)\">"+msg[i].NomCadenas+"</a></dt><dd>Id: "+msg[i].idCadenas+" Niveau de sécurité: "+msg[i].Niveau+" Actif : "+msg[i].Actif+"</dd></dl>"

            $("#cadenas_liste").find("ul").append("<li><a href=\"javascript:void(0)\">"+cadenas+"</a></li>")}
    })
    request.fail(function(jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });


    $($('#cadenas_ajout').find("button")).click(function (){
        var nom=$('#cadenas_ajout').find("input")[0].value
        var ID=$('#cadenas_ajout').find("input")[1].value
        var Secu=$('#cadenas_ajout').find("input")[2].value

        var request = $.ajax({
            method: "POST",
            url: url+"cadenas.php",
            data:{id:ID,Nom:nom,Niveau:Secu},
            dataType: "json"
        });


        request.done(function(msg) {

        })
        request.fail(function(jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });

    })



    $("#cadenas_bouton").click(function(){
        $("#Cadenas").css({display: "block"})
        $("#cadenas_liste").css({display: "block"})
        $("#cadenas_modif").css({display: "none"})
        $("#cadenas_ajout").css({display: "none"})

        $("#Info").css({display: "none"})
        $("#Membres").css({display: "none"})
    })

    $( "#cadenas_liste" ).children().click(function(){
        if(this.id=="ajout"){
            $("#cadenas_liste").css({display: "none"})
            $("#cadenas_modif").css({display: "none"})
            $("#cadenas_ajout").css({display: "block"})
        }
        else{
            $("#cadenas_liste").css({display: "none"})
            $("#cadenas_modif").css({display: "block"})
            $("#cadenas_ajout").css({display: "none"})
        }
    })

    $(".annulation").click(function(){
        $("#cadenas_liste").css({display: "block"})
        $("#cadenas_modif").css({display: "none"})
        $("#cadenas_ajout").css({display: "none"})
        $("#Membre_Ajout_Plusieurs_Formulaire").css({display: "none"})
    })
})

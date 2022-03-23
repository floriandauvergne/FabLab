$(document).ready(function() {
    var url="https://b268076a-1104-466e-837a-a82b9ada121d.mock.pstmn.io/membre/"

    var request = $.ajax({
        method: "GET",
        url: url+"recuperer",
        data: {},
        dataType: "json"
    });
    request.done(function(msg) {
        for(i=0;i<msg.length;i++){
            $("#Membres_présent").find("tbody").append("<tr><td>"+msg[i].Nom+"."+msg[i].Prenom[0]+"</td><td><img src=\""+msg[i].Photo+"\" height=\"40\" width=\"40\"></td></tr>");
        }
    })
    request.fail(function(jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });

    $("#Membres_bouton").click(function(){
        $("#Membres").css({display: "block"})
        $("#Membres_liste").css({display: "block"})
        $("#Membres_présent").css({display: "none"})
        $("#Membres_Ajout").css({display: "none"})
        $("#Membres_Modif").css({display: "none"})

        $("#Info").css({display: "none"})
        $("#Cadenas").css({display: "none"})
    })

    $("#Affiche_Membres_présent").click(function(){
        $("#Membres_liste").css({display: "none"})
        $("#Membres_Ajout").css({display: "none"})
        $("#Membres_présent").css({display: "block"})
    })

    $("#Ajouter_un_membre").click(function(){
        $("#Membres_liste").css({display: "none"})
        $("#Membres_Ajout").css({display: "block"})
    })
    $("a").click(function (){
        $("#Membres_liste").css({display: "none"})
        $("#Membres_Modif").css({display: "block"})

    })

    $("#Membres_Ajout_Annuler").click(function (){
        $("#Membres_liste").css({display: "block"})
        $("#Membres_Ajout").css({display: "none"})
    })

    $("#Membres_Modif_Annuler").click(function (){
        $("#Membres_liste").css({display: "block"})
        $("#Membres_Modif").css({display: "none"})
    })

    $("#Membre_Ajout_Plusieurs").click(function (){
        $("#Membre_Ajout_Plusieurs_Formulaire").css({display: "block"})
    })

    $("#Membre_Ajout_Plusieurs_Annuler").click(function (){
        $("#Membre_Ajout_Plusieurs_Formulaire").css({display: "none"})
    })


})

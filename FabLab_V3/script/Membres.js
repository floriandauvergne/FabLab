$(document).ready(function() {

    var url="https://a3b49ec7-c30d-4962-9bad-63b0c319f410.mock.pstmn.io/"

    var request = $.ajax({
        method: "GET",
        url: url+"banniere.php",
        data: { mail : localStorage.getItem('Email')},
        dataType: "json"
    });
    request.done(function(msg) {

        switch (msg.Grade){
            case "1" : msg.Grade="Member";break;
            case "2" : msg.Grade="Teacher";break;
            case "3" : msg.Grade="Manager";break;
            case "4" : msg.Grade="Admin";break;
        }

        $("header").html("<p>"+msg.Prenom+" "+msg.Grade+"<a href=\"Profil.html\"><img src=\""+msg.Photo+"\" height=\"40\" width=\"40\"></a> </p>");
    })

    var request = $.ajax({
        method: "GET",
        url: url+"membres.php",
        data: {},
        dataType: "json"
    });

    request.done(function(msg) {
        for(i=0;i<msg.length;i++){
            $("tbody").append("<tr><td>"+msg[i].Nom+"</td><td><img src=\""+msg[i].Photo+"\" height=\"40\" width=\"40\"></td></tr>");
        }
        $("img").attr("src", msg.Photo);

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

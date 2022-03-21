$(document).ready(function() {
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
})
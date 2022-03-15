$(document).ready(function() {
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

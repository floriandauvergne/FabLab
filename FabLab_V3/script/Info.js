$(document).ready(function() {
    $("#Info_bouton").click(function(){
        $("#Info").css({display: "block"})
        $("#Info_tab").css({display: "block"})
        $("#Info_log").css({display: "none"})
        $("#Cadenas").css({display: "none"})
        $("#Membres").css({display: "none"})
    })

    $("#retour").click(function(){
        $("#Info_tab").css({display: "block"})
        $("#Info_log").css({display: "none"})
    })

    $("#logs").click(function(){
        $("#Info_tab").css({display: "none"})
        $("#Info_log").css({display: "block"})
    })
})
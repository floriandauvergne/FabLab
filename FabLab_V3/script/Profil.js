$(document).ready(function() {
    $("#Modif").click(function (){
        $("#Modif").css({display: "none"})
        $("input").prop( "disabled", false );
        $("div").append("<button id=\"Confirmer\">Confirmer</button><button id=\"Annuler\">Annuler</button>");

        $("#Annuler").click(function (){location.reload();})

        $("#Confirmer").click(function (){
            alert("Changement effectuee");
            location.reload();
        })
    })
})
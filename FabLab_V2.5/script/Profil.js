$(document).ready(function() {
    var email = location.search.replace('?', '').split('&').map(function(val){
        return val.split('=');
    });
    console.log(email[0][1]);
if(email[0][1]=="test.admin@lycee-jeanrostand.fr"){
    var donnees=new Array();

    donnees["Nom"]="TEST";
    donnees["Prenom"]="Admin";
    donnees["Age"]="20";
    donnees["Type"]="Eleve";
    donnees["Grade"]="Admin";
    donnees["Tel"]="01 49 65 78 24";
    donnees["Mail"]="test.admin@lycee-jeanrostand.fr";
    donnees["Photo"]="../../Image/photo_profil.jpg";

    $("input")[0].value=donnees["Nom"];
    $("input")[1].value=donnees["Prenom"];
    $("input")[2].value=donnees["Mail"];
    $("input")[3].value=donnees["Grade"];
    $("input")[4].value=donnees["Age"];
    $("input")[5].value=donnees["Tel"];
    $("img").attr("src", donnees["Photo"]);
}

    $("#Modif").click(function (){
        $("#Modif").css({display: "none"})
        $("input").prop( "disabled", false );
        // $("input").children[0].prop( "disabled", true );
        $("div").append("<button id=\"Confirmer\">Confirmer</button><button id=\"Annuler\">Annuler</button>");

        $("#Annuler").click(function (){location.reload();})

        $("#Confirmer").click(function (){
            alert("Changement effectuee");
            location.reload();
        })
    })
})

// $("img").src="ada";
import {
    cadenas_suppresion
} from "./cadenas_suppresion.js";
import {
    cadenas_ajout
} from "./cadenas_ajout.js";

import {cadenas_modif} from "./cadenas_modif.js";

export function cadenas_principale(){

    $("#cadenas").click(function(){

        if(!document.getElementById("div_cadenas")){

            $("body").append("<div id='div_cadenas'></div>");

            var request=$.ajax({
                method: "GET",
                url: "Test.php",
                data: { cadenas: "Affiche"},
                dataType: "json"
            });

            request.done(function( msg ) {
                $("#div_cadenas").append("<div id='affichage_cadenas'></div>");
                $("#affichage_cadenas").append("<button id='Ajout_cadenas'>Ajouter un cadenas</button>");
                $.each(msg,function (i,cadenas){
                    var txt="<p id='cadena_"+cadenas.id+"'>ID Verrou: "+cadenas.id+" Niveau de securite: "+cadenas.Niveau+"<button id='suppresion_cadenas_"+cadenas.id+"'>Supprimer le cadenas</button><button id='modifier_cadenas_"+cadenas.id+"'>Modifier le cadenas</button></p>"
                    $("#affichage_cadenas").append(txt);
                    cadenas_suppresion(cadenas.id);
                    cadenas_modif(cadenas.id,cadenas.Niveau);

                });

                cadenas_ajout();

            })
        }

        document.getElementById("div_cadenas").style.display = "block";

        if(document.getElementById("div_stats")){
            document.getElementById("div_stats").style.display = "none";
        }
        if(document.getElementById("div_profil")){
            document.getElementById("div_profil").style.display = "none";
        }
    })
}
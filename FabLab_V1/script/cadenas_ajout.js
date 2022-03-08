import {cadenas_suppresion} from "./cadenas_suppresion.js";
export function cadenas_ajout(){
    $("#Ajout_cadenas").click(function (){
        document.getElementById('affichage_cadenas').hidden=true;

        $("#div_cadenas").append("<div id='Nouveau_cadenas'><h1>Nouveau cadenas</h1><la>ID du cadenas : </la><input placeholder='ex:3000'></br><la>Niveau de sécurité : </la><select><option>1</option><option>2</option><option>3</option></select></br><button id='Ajout_cadenas_confirmation'>Confirmer</button><button id='Ajout_cadenas_annulation'>Annuler</button></div>");

        $("#Ajout_cadenas_confirmation").click(function (){

            var child=document.getElementById("Nouveau_cadenas").children;

            if(child[2].value!=""){
                var request=$.ajax({
                    method: "GET",
                    url: "Test.php",
                    data: { cadenas: "Ajout",cadenas_id:child[2].value,niv_secu:child[5].value},
                    dataType: "json"
                });

                request.done(function (msg){
                    if(msg=="reussite"){
                        $("#Nouveau_cadenas").remove();
                        $("#affichage_cadenas").append("<p id=cadena_"+child[2].value+">ID Verrou:"+child[2].value+" Niveau de securite:"+child[5].value+"<button id='suppresion_cadenas_"+child[2].value+"'>X</button></p>");
                         cadenas_suppresion(child[2].value);
                        document.getElementById('affichage_cadenas').hidden=false;
                    }
                    else
                        alert("une erreur est survenue")
                })
            }

        })
        $("#Ajout_cadenas_annulation").click(function (){
            $("#Nouveau_cadenas").remove();
            document.getElementById('affichage_cadenas').hidden=false;
        })
    })
}
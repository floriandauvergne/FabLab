export function cadenas_modif(id,niveau){
    $("#modifier_cadenas_"+id).click(function (){
        document.getElementById('affichage_cadenas').hidden=true;

        $("#div_cadenas").append("<div id='Modif_cadenas'><h1>Modifier cadenas</h1><la>ID du cadenas : </la><input value='"+id+"'></br><la>Niveau de sécurité : </la><select><option>"+niveau+"</option><option>1</option><option>2</option><option>3</option></select></br><button id='Modif_cadenas_confirmation'>Confirmer</button><button id='Modif_cadenas_annulation'>Annuler</button></div>");


        $("#Modif_cadenas_confirmation").click(function () {

            var child = document.getElementById("Modif_cadenas").children;

            var request = $.ajax({
                method: "GET",
                url: "Test.php",
                data: {cadenas: "Modif",ancien_id:id, cadenas_id: child[2].value, niv_secu: child[5].value},
                dataType: "json"
            });

            request.done(function (msg) {
                if (msg == "reussite") {
                    $("#Modif_cadenas").remove();
                    document.getElementById('cadena_' + id).innerHTML = "<p id='cadena_" + child[2].value + "'>ID Verrou: " + child[2].value + " Niveau de securite: " + child[5].value + "<button id='suppresion_cadenas_" + child[2].value + "'>Supprimer le cadenas</button><button id='modifier_cadenas_" + child[2].value + "'>Modifier le cadenas</button></p>"
                    document.getElementById('affichage_cadenas').hidden = false;
                    cadenas_modif(child[2].value, child[5].value);
                } else
                    alert("une erreur est survenue")
            })
        })



        $("#Modif_cadenas_annulation").click(function (){
            $("#Modif_cadenas").remove();
            document.getElementById('affichage_cadenas').hidden=false;
        })

    })
}
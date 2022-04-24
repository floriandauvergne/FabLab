var id;
var url = "../api";

function recup(){
    var request = $.ajax({
        method: "GET",
        url: url+"/cadenas/recuperer.php",
        dataType: "json"
    });

    request.done(function(msg) {
        var index = msg.findIndex(std=> std.Nouveau);

        if(index!=-1){
            $("#cadenas_liste").append("<dl id=\"nouveau\"><dt>Nouveau:</dt></dl>");
        }

        for(i=0;i<msg.length;i++){

            if(msg[i].Actif){
                msg[i].Actif="Oui"
            }
            else
                msg[i].Actif="Non"

            if(msg[i].Nouveau==1){
                var cadenas= "<dd class='cadenas' ><a href=\"javascript:void(0)\">"+msg[i].idCadenas+"</a></dd>"

                $("#cadenas_liste").find("#nouveau").append(cadenas)
            }

            else {
                var cadenas = "<dl><dt class='cadenas' ><a href=\"javascript:void(0)\">" + msg[i].NomCadenas + "</a></dt><dd>Id: " + msg[i].idCadenas + "/Niveau de sécurité: " + msg[i].Niveau + "/Actif : " + msg[i].Actif + "</dd></dl>"

                $("#cadenas_liste").append(cadenas)
            }
        }


        $("#cadenas_liste").children().children().children().click(function(){

            $("#cadenas_liste").css({display: "none"})
            $("#cadenas_modif").css({display: "block"})

            if(this.parentNode.parentNode.id=="nouveau"){
                id=this.innerText;
                var nom="";
                var secu="";
            }

            else{
                var cadenas=this.parentNode.parentNode.children[1].innerText.split('/').join(',').split(':').join(',').split(',')
                var nom=this.innerText;
                id=cadenas[1];
                var secu=cadenas[3];

            }
            //$('#cadenas_modif').find("input")[1].value=secu;
            // $("option:eq(1)").prop('selected', true);
            $('#cadenas_modif').find("input")[0].value=nom;
            var option="#Cadenas_Modif_Niveau option:eq("+(secu-1)+")";

            $(option).prop('selected', true);

            $("#cadenas_ajout").css({display: "none"})

        })

    })
    request.fail(function(jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}


$(document).ready(function() {
    recup();
    $($('#cadenas_modif').find("button")[0]).click(function (){
        var nom=$('#cadenas_modif').find("input")[0].value
        var ID=id;
        var Secu=$('#cadenas_modif').find("select")[0].value

        switch (Secu){
            case "Member":Secu=1;break;
            case "Teacher":Secu=2;break;
            case "Manager":Secu=3;break;
            case "Admin":Secu=4;break;
        }

        if(nom!=""&&ID!=""&&Secu!=""){
            request = $.ajax({
                method: "POST",
                url: url+"/cadenas/modifier.php",
                data: {
                    Nom:nom,
                    id:ID,
                    Niveau:Secu
                },
                dataType: "json"
            });
            request.done(function(msg) {
                if(msg.success==true){
                    alert("Cadenas modifié")
                    $("#cadenas_liste").empty();
                    recup();
                    $("#cadenas_liste").css({display: "block"})
                    $("#cadenas_modif").css({display: "none"})
                }
            })
            request.fail(function(jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });

        }
        else
            alert("Non rempli")

    })


    $($('#cadenas_modif').find("button")[2]).click(function (){
        var ID=id;
        if (window.confirm("Voulez-vous supprimer ce cadenas ?")) {
            request = $.ajax({
                method: "POST",
                url: url+"/cadenas/supprimer.php",
                data: {
                    id:ID
                },
                dataType: "json"
            });
            request.done(function(msg) {
                if(msg.success==true){
                    alert("Cadenas Supprimé")
                    $("#cadenas_liste").empty();
                    recup();
                    $("#cadenas_liste").css({display: "block"})
                    $("#cadenas_modif").css({display: "none"})
                }
            })
            request.fail(function(jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });
        }
    })


    $("#cadenas_bouton").click(function(){
        $("#Cadenas").delay( 500 ).fadeIn( 500 );
        // $("#Cadenas").css({display: "block"})
        $("#cadenas_liste").css({display: "block"})
        $("#cadenas_modif").css({display: "none"})
        $("#cadenas_ajout").css({display: "none"})

        $("#Info").css({display: "none"})
        $("#Membres").css({display: "none"})
    })



    $($('#cadenas_modif').find("button")[1]).click(function(){
        $("#cadenas_liste").css({display: "block"})
        $("#cadenas_modif").css({display: "none"})
        $("#cadenas_ajout").css({display: "none"})
        $("#Membre_Ajout_Plusieurs_Formulaire").css({display: "none"})
    })
})

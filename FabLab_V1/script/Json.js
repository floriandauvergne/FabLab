import {
    cadenas_principale
} from "./cadenas.js";
import {
    statistiques_principale
} from "./statistiques.js";
import {
    deconnexion_principale
} from "./Deconnexion.js";
import {
    profil_principale
} from "./profil.js"

$(document).ready(function() {
    $("#login_button").click(function() {
        if (!document.getElementById("message_rep")) {
            var request = $.ajax({
                method: "GET",
                url: "Test.php",
                data: {
                    nom: document.getElementById("login").value
                },
                dataType: "json"
            });
            request.done(function(msg) {
                if (msg !== false) {
                    $("#connection").remove();

                    let txt=
                        "<div id=\"div_profil\" align=\"center\">\n" +
                        "    <div class=\"card-header\">Photo</div>\n" +
                        "        <div class=\"card-body text-center\">\n" +
                        "        <img class=\"img-account-profile rounded-circle mb-2\" src=\""+msg.Photo+"\" alt=\"Pas de photo de profil\">\n" +
                        "        </div>\n" +
                        "        <div class=\"card-header\">Detail</div>\n" +
                        "        <div class=\"card-body-info\">\n" +
                        "        <label class=\"small mb-1\">Nom\n" +
                        "        <input disabled class=\"form-control\" value=\""+msg.Nom+"\">\n" +
                        "        </label>\n" +
                        "        <label class=\"small mb-1\">Prénom\n" +
                        "        <input disabled class=\"form-control\" value=\""+msg.Prenom+"\">\n" +
                        "        </label>\n" +
                        "        <label class=\"small mb-1\">Grade \n" +
                        "        <input disabled class=\"form-control\" value=\""+msg.Grade+"\">\n" +
                        "        </label>\n" +
                        "        <label class=\"small mb-1\">Adresse mail \n" +
                        "        <input disabled class=\"form-control\" value=\""+msg.Mail+"\">\n" +
                        "        </label>\n" +
                        "        <label class=\"small mb-1\">Numéro de téléphone\n" +
                        "        <input disabled class=\"form-control\" value=\""+msg.Tel+"\">\n" +
                        "        </label>\n" +
                        "    </div>\n" +
                        "</div>";

                    if (msg.Grade === 'Admin') {
                        $("body").append("<div align=\"center\"><button class=\"btn btn-primary\" id='cadenas'>Cadenas</button><button id='Statistque'>Statistque</button><button id='Profil'>Profil</button><button id='Deconnexion'>Deconnexion</button></div>\n"); // Append the new elements
                    }

                    $("body").append(txt); // Append the new elements

                    if(msg.Grade !== 'Admin') {
                        $(".card-body-info").append("<button id='Deconnexion'>Deconnexion</button>")
                    }

                    cadenas_principale();
                    statistiques_principale();
                    deconnexion_principale();
                    profil_principale();


                } else {
                    document.getElementById("false").style.display = "block";
                    setTimeout(() => { document.getElementById("false").style.display = "none"; }, 1500);
                }
            });
            request.fail(function(jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });
        }
    });
});
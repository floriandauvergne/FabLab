$(document).ready(function () {
////CODE AFFICHAGE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Requête pour récupérer la liste des Membres
    var request = $.ajax({
        method: "GET",
        url: "../../api/membre/recuperer.php",
        data: {},
        dataType: "json"
    });
    request.done(function (msg) {
        //Ici,le nombre d'adhérents correspond au dernier élément de la réponse
        var nombre_adherents = $(msg).get(-1).Nombre
        console.log(msg)

        //Afficher le nombre d'adhérents sur la page
        $("#Nombre_adherents").text("Nombre d'adhérents : " + nombre_adherents);
        // $("#Nombre_adherents").append(" ");

        for (let i = 0; i < (msg.length - 1); i++) {
            //Déparser le JSON pour ajouter les adhérents
            $("#dataTable").append("" +
                "                                <tr class='Membre' id='" + msg[i].ID + "'>\n" +
                "                                    <td style=\"height: 50px;\"><img class=\"rounded-circle me-2\" width=\"30\" height=\"30\"\n" +
                "                                                                   src=\"" + msg[i].Photo + "\">" + msg[i].Nom + " " + msg[i].Prenom + "\n" +
                "                                    </td>\n" +
                "                                    <td><select\n" +
                "                                            style=\"margin-top: 5px;background: var(--bs-table-bg);color: var(--bs-table-striped-color);border-color: var(--bs-table-bg);\">\n" +
                "                                        <optgroup label=\"" + msg[i].Grade_complet + "\">\n" +
                "                                            <option value=\"1\">Member</option>\n" +
                "                                            <option value=\"2\">Teacher</option>\n" +
                "                                            <option value=\"3\">Manager</option>\n" +
                "                                            <option value=\"4\">Admin</option>\n" +
                "                                        </optgroup>\n" +
                "                                    </select></td>\n" +
                "                                    <td>"+msg[i].iduid+"</td>\n" +
                "                                    <td>" + msg[i].Age + "</td>\n" +
                "                                    <td>" + msg[i].Type + "<br></td>\n" +
                "                                    <td style=\"height: 50px;\">\n" +
                "                        <div  style=\"cursor: pointer;\"><label>Supprimer</label><i\n" +
                "                                style=\"padding-left:8px\" class=\"fas fa-user-minus\"></i></div>                                        " +
                "<button class=\"btn btn-primary\" type=\"button\"\n" +
                "                                                style=\"display: none;height: 30px;font-size: 12px;\">Confirmer\n" +
                "                                        </button>\n" +
                "                                    </td>\n" +
                "                                </tr>")

            //Sélectionner le bon grade dans le select
            $("#" + msg[i].ID + " select option[value=" + msg[i].Grade + "]").attr('selected', 'selected');

            ///////////////////////////CODE MODIFICATION/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            //Détecter un changement dans les select
            $("#" + msg[i].ID + " select").change(function () {
                //récupérer la valeur contenue dans l'affiche du menu déroulant
                var Ancien_Grade = $(this).find("optgroup").attr('label');
                //récupérer la valeur contenue dans la valeur du menu déroulant
                var Nouveau_Grade = $(this).find('option:selected').text();

                //Si la valeur du changement est différente de la valeur précédente
                if (Ancien_Grade != Nouveau_Grade) {
                    //Faire le focus sur le membre
                    $(".Membre").hide();
                    $("#" + msg[i].ID).show();
                    //et afficher le bouton de confirmation
                    $("#" + msg[i].ID + " button").show();
                    $("#" + msg[i].ID + " div").hide();

                } else {
                    //Sinon remttre à l'état initial
                    $(".Membre").show();
                    $("#" + msg[i].ID + " button").hide();
                    $("#" + msg[i].ID + " div").show();
                }
            })

            //Confirmer les changements
            $("#" + msg[i].ID + " button").click(function () {

                var Nouveau_Grade = $("#" + msg[i].ID + " select").find('option:selected');

                var request = $.ajax({
                    method: "POST",
                    url: "../../api/membre/modifier.php",
                    data: {id: msg[i].ID, grade: Nouveau_Grade.val()},
                    dataType: "json"
                });
                request.done(function (msg2) {
                    if (msg2.success == true) {
                        alert("Changement effectué pour " + msg[i].Nom + " " + msg[i].Prenom)
                        $(".Membre").show();
                        $("#" + msg[i].ID + " button").hide();
                        $("#" + msg[i].ID + " optgroup").attr('label', Nouveau_Grade.text());
                        $("#" + msg[i].ID + " div").show();
                    } else {
                        alert("Erreur")
                    }
                })
            })
/////////CODE SUPPRESSION/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            $("#" + msg[i].ID + " div").click(function () {
                if (window.confirm("Voulez-vous supprimer ce membre ?")) {
                    request = $.ajax({
                        method: "POST",
                        url: "../../api/membre/supprimer.php",
                        data: {
                            id: msg[i].ID
                        },
                        dataType: "json"
                    });
                    request.done(function (msg3) {
                        if (msg3.success == true) {
                            $("#" + msg[i].ID).remove();
                        }
                    })
                }
            })

        }
    })

    //////////////CODE AJOUT//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Lorsque l'on clique sur le bouton pour ajouter un membre
    $("#Ajouter-un-membre").click(function () {
        //cacher la barre de recherche
        $("#recherche").hide();
        //cacher la liste des adhérents
        $(".my-1").hide();
        //Afficher le formulaire d'inscription
        $(".my-0").show();
        //Gérer l'affichage des boutons
        $("#Ajouter-un-membre").hide();
        $("#Ajouter-un-membre-annuler").show();


    })
    //Lorsque l'on clique sur le bouton pour annuler l'ajouter d'un membre
    $("#Ajouter-un-membre-annuler").click(function () {
        //afficher la barre de recherche
        $("#recherche").show();
        //afficher la liste des adhérents
        $(".my-1").show();
        //cacher le formulaire d'inscription
        $(".my-0").hide();
        //Gérer l'affichage des boutons
        $("#Ajouter-un-membre-annuler").hide();
        $("#Ajouter-un-membre").show();

        //vider le formulaire
        $("#dataTable-Nouveau input").val("");
    })

    $("#Ajouter-un-membre-confirmer").click(function () {
        //Si aucun des champs n'est vide alors envoyer le formulaire
        if ($("#Mail-Nouveau").val() != "" && $("#Nom-Nouveau").val() != "" && $("#Grade-Nouveau").val() != "" && $("#Carte-Nouveau").val() != "" && $("#Age-Nouveau").val() != "" && $("#Type-Nouveau").val() != "") {
            var request = $.ajax({
                method: "POST",
                url: "../../api/membre/ajouter.php",
                data: {
                    Nom: $("#Nom-Nouveau").val(),
                    Prenom: $("#Prenom-Nouveau").val(),
                    Mail: $("#Mail-Nouveau").val(),

                    Grade: $("#Grade-Nouveau").val(),
                    Age: $("#Age-Nouveau").val(),
                    Type: $("#Type-Nouveau").val()
                },

                dataType: "json"
            });
            request.done(function (msg) {
                if (msg.success == true) {
                    window.location = "membres.html";
                }
                else if(msg.success == "mail"){
                    alert("Le mail n'est pas correct")
                }
                else
                    alert("Une erreure est survenue")
            })
        }
    })


////////////CODE RECHERCHE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Detecter un changement dans la barre de recherche
    $("#recherche").on("input", function () {
        //recuperer les cases comportant le nom des adhérents
        var collection = $(".Membre td");

        //recuperer la recherche et la formater pour retirer les majucules
        var recherche = this.value.toLowerCase()

        for (let i = 0; i < collection.length - 5; i = i + 6) {

            //recuperer le nom des adhérents à l'intérieur des case et les formater pour retirer les majucules
            var nom = collection[i].innerText.toLowerCase()

            //Si le nom correspond à la recherche
            if ((nom).includes(recherche))
                //Le maintenir afffiché sur la page
                collection[i].parentNode.hidden = false
            else
                //Sinon le cacher
                collection[i].parentNode.hidden = true
        }
    })


})
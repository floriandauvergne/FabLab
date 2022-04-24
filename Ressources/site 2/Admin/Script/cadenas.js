$(document).ready(function() {
        var request = $.ajax({
            method: "GET",
            url: "../../api/cadenas/recuperer.php",
            dataType: "json"
        });

        request.done(function (msg){
            var nombre_cadenas = $(msg).get(-1).Nombre

            $("#Nombre_cadenas").text("Nombre de cadenas : " + nombre_cadenas);

            for(let i=0;i<(msg.length-1);i++){
                switch (msg[i].Niveau){
                    case "1":msg[i].Niveau="Member";break;
                    case "2":msg[i].Niveau="Teacher";break;
                    case "3":msg[i].Niveau="Manager";break;
                    case "4":msg[i].Niveau="Admin";break;
                }

                switch (msg[i].Actif){
                    case 1:msg[i].Actif="Oui";break;
                    case 0:msg[i].Actif="Non";break;
                }

                if(msg[i].Nouveau==1){
                    $("tbody").append("                                        <tr>\n" +
                        "                                            <td style=\"height: 50px;\">Nouveau</td>\n" +
                        "                                            <td>Non défini</td>\n" +
                        "                                            <td>"+msg[i].Actif+"</td>\n" +
                        "                                        </tr>")
                }

                else{
                    $("tbody").append("                                        <tr>\n" +
                        "                                            <td style=\"height: 50px;\">"+msg[i].NomCadenas+"</td>\n" +
                        "                                            <td>"+msg[i].Niveau+"</td>\n" +
                        "                                            <td>"+msg[i].Actif+"</td>\n" +
                        "                                        </tr>")
                }

            }




            console.log(msg)
        })
})

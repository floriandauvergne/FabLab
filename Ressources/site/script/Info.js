function logs_recup(){
    var request = $.ajax({
        method: "GET",
        url: url+"log/recuperer.php",
        data: {brut:1},
        dataType: "json"
    });

    request.done(function (msg){
        for(let i=0;i<msg.length;i++){
            $("#logs_complets").append("<ul>"+msg[i].Nom+" a ouvert "+msg[i].NomCadenas+" le "+msg[i].Date+" à "+msg[i].Horaire+"</ul>")
            console.log(msg[i].Jour)
        }
        console.log(msg)

    })
    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}

$(document).ready(function() {
    logs_recup();
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
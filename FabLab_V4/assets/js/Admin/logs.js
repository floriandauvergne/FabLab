$(document).ready(function (){
    var request = $.ajax({
        method: "GET",
        url: "http://51.210.151.13/btssnir/projets2022/fablab/api/log/recuperer.php",
        data: {brut:1},
        dataType: "json"
    });

    request.done(function (msg){
        for(let i=(msg.length-1);i>=0;i--){
            $("#logs").append("<ul>"+msg[i].Nom+" a ouvert "+msg[i].NomCadenas+" le "+msg[i].Date+" à "+msg[i].Horaire+"</ul>")
            console.log(msg[i].Jour)
        }
        console.log(msg)

    })
    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
})

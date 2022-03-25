$(document).ready(function() {
    var url="https://b268076a-1104-466e-837a-a82b9ada121d.mock.pstmn.io/"

    $("#false").hide();

    $("#confirm").click(function (){

        if($("#mail").val()&&$("#mdp").val()){


            localStorage.setItem('Email', $("#mail").val());

            var request = $.ajax({
                method: "GET",
                url: url + "connexion",
                data: {email: localStorage.getItem('Email'),password:$("#mdp").val()},
                dataType: "json"
            });


            request.done(function (msg){
                if(msg.action==true){
                    if(msg.grade<4){
                        window.location="Adherent.html";
                    }

                    else if(msg.grade==4){
                        window.location="Admin.html";
                    }
                }
                else {
                    $("#false").text('Le compte n\'existe pas');
                    $("#false").show();
                    setTimeout(() => { $("#false").hide(); }, 1500);
                }
            })
        }
        else{
            $("#false").text('Veuillez renseigner tout les champs');
            $("#false").show();
            setTimeout(() => { $("#false").hide(); }, 2000);
        }
    })
    if(window.closed){
        localStorage.clear();
    }
})
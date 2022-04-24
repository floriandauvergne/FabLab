$(document).ready(function() {
    $("#confirm").click(function (){

        if($("#mail").val()&&$("#mdp").val()){


            localStorage.setItem('Email', $("#mail").val());

            var request = $.ajax({
                method: "GET",
                url: "../api/connexion.php",
                data: {mail: localStorage.getItem('Email'),password:$("#mdp").val()},
                dataType: "json"
            });


            request.done(function (msg){
                if(msg.succes==true){

                    localStorage.setItem('Grade', msg.grade);

                    if(msg.grade<4){
                        window.location="Adherent";
                    }

                    else if(msg.grade==4){
                        window.location="Admin";
                    }
                }
                else {
                    $("#false").text('Le compte n\'existe pas');
                    $("#false").show();
                    setTimeout(() => { $("#false").text(' '); }, 1500);
                }
            })
        }
        else{
            $("#false").text('Veuillez renseigner tout les champs');
            $("#false").show();
            setTimeout(() => { $("#false").text(' '); }, 2000);
        }
    })
})


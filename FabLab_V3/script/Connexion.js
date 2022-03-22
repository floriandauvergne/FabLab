$(document).ready(function() {
    var url="Profil.html"
    $("#false").hide();
    $("button").click(function (){
        if($("input")[0].value!=""&&$("input")[1].value!=""){
            localStorage.setItem('Email', $("input")[0].value);

            if($("input")[0].value=="test.eleve@lycee-jeanrostand.fr"){
                window.location="Adherent.html";
            }

            else if($("input")[0].value=="test.admin@lycee-jeanrostand.fr"){
                window.location="Admin.html";
            }
            else {
                $("#false").show();
                setTimeout(() => { $("#false").hide(); }, 1500);
            }
        }
        else{
            alert("Veuillez renseigner les champs")
        }
    })
    if(window.closed){
        localStorage.clear();
    }
})
export function profil_principale(){
    $("#Profil").click(function () {
        //Afficher la div correspondant au profil de l'utilisateur;
        document.getElementById("div_profil").style.display = "block"

        //Cacher la div correspondant au statistique;
        if(document.getElementById("div_stats")){
            document.getElementById("div_stats").style.display = "none";
        }
        //Cacher la div correspondant à la gestion des cadenas;
        if(document.getElementById("div_cadenas")){
            document.getElementById("div_cadenas").style.display = "none";
        }
    })
}
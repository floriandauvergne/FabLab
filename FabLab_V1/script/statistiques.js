export function statistiques_principale(){
    $("#Statistque").click(function(){

        var image="https://formations.stats-co.eu/wp-content/uploads/2020/10/cours-ligne-mooc-statistiques-statistiques-descriptives-stats-co-fili1-1024x635.png"

        if(!document.getElementById("div_stats")){
            $("body").append("<div id='div_stats' center><h1>Statistiques des passages du FabLab</h1><img src='"+image+"'></div>");
        }

        document.getElementById("div_stats").style.display = "block";

        if(document.getElementById("div_cadenas")){
            document.getElementById("div_cadenas").style.display = "none";
        }

        if(document.getElementById("div_profil")){
            document.getElementById("div_profil").style.display = "none";
        }
    })
}
export function cadenas_suppresion(id){
    $("#suppresion_cadenas_"+id).click(function(){

        if(window.confirm("Supprimer le cadenas "+id+" ?")){
            var request=$.ajax({
                method: "GET",
                url: "Test.php",
                data: { cadenas: "Supprime",cadenas_id:id},
                dataType: "json"
            });

            request.done(function (msg){
                if(msg=="reussite"){
                    $("#suppresion_cadenas_"+id).remove();
                    $("#cadena_"+id).remove();
                }
                else
                    alert("une erreur est survenue")
            })

        }

    })
}
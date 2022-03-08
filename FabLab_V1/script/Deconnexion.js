export function deconnexion_principale(){
    $("#Deconnexion").click(function (){
        // if(window.confirm("Voulez-vous vous deconnecter ?"))
            location.reload();
    })
}
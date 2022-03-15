$(document).ready(function() {
    $("#false").hide();
    $("button").click(function (){
        if($("input")[0].value!=""&&$("input")[1].value!=""){
            $("#false").show();
            setTimeout(() => { $("#false").hide(); }, 1500);
        }

    })
})
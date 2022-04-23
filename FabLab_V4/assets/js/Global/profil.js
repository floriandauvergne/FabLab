$(document).ready(function() {

    if (localStorage.getItem('Grade') != 4){
        $("#accordionSidebar").empty();
        $("#grade").text("Adherent")
        $("#accordionSidebar").append("" +
            "<li class=\"nav-item\"><a class=\"nav-link\" href=\"../Adherent/index.html\"><i class=\"fas fa-tachometer-alt\"></i><span>Dashboard</span></a></li>\n" +
            "                    <li class=\"nav-item\"><a class=\"nav-link\" href=\"profile.html\"><i class=\"far fa-id-badge\"></i><span>Profil</span></a></li>\n")
    }

    // else
    //     $("a").attr("href", "Adherent/profile.html")

    var request = $.ajax({
        method: "GET",
        url: "http://51.210.151.13/btssnir/projets2022/fablab/api/profil/recuperer.php",
        data: { mail : localStorage.getItem('Email')},
        dataType: "json"
    });
    request.done(function (msg){
        $("#image_profil").attr("src", msg.Photo);
        $("#first_name").attr("placeholder", msg.Prenom);
        $("#last_name").attr("placeholder", msg.Nom);
        $("#phone").attr("placeholder", msg.Tel);
        $("#email").attr("placeholder", msg.Mail);
    })

    $("input").on("input", function() {
        if($("#first_name").val()==""&&$("#last_name").val()==""&&$("#phone").val()==""&&$("#email").val()==""){
            $("#bouton-confirmation").hide();
        }

        else{
            $("#bouton-confirmation").show();
        }
    });

    $("#bouton-confirmation").click(function (){
        var changement="Changement effectué pour "

        if(!$("#first_name").val())
            var Prenom=$("#first_name").attr("placeholder");
        else{
            var Prenom=$("#first_name").val();
            changement=changement+"prénom"
        }


        if(!$("#last_name").val())
            var Nom=$("#last_name").attr("placeholder");
        else{
            var Nom=$("#last_name").val();
            changement=changement+","+"nom"
        }


        if(!$("#phone").val()||$("#phone").val().length!=10)
            var Tel=$("#phone").attr("placeholder");
        else{
            var Tel=$("#phone").val();
            changement=changement+","+"numéro de téléphone"
        }


        if(!$("#email").val()||$("#email").val().includes("@")==false)
            var Email=$("#email").attr("placeholder");
        else{
            var Email=$("#email").val();
            changement=changement+","+"addresse mail"
        }

        if(changement!="Changement effectué pour "){
            if(changement[25]==",")
            changement=changement.replace(',', '');
        }


        request = $.ajax({
            method: "POST",
            url: "http://51.210.151.13/btssnir/projets2022/fablab/api/profil/modifier.php",
            data: {
                nom:Nom,
                prenom:Prenom,
                mail:Email,
                tel:Tel,
                ancien_mail: $("#email").attr("placeholder"),
            },
            dataType: "json"
        });
        request.done(function (msg){
            if(msg.success==true){
                alert(changement);
                localStorage.setItem('Email', Email);
                location.reload();
            }
            else
                alert("Une erreur est arrivée");
        })
    })

    $("#image_profil-bouton").click(function (){
        $("#image_profil").hide()
        $("#image_profil-bouton").hide()
        $("#photo").show()
    })
    
    $("#photo").submit(function (event){
        event.preventDefault();


        var form_data = new FormData();

        var file_data = $('#file').prop('files')[0];

        form_data.append('file', file_data);

        form_data.append('mail','Florian')

        console.log(form_data['mail'])

        $.ajax({
            url: 'http://51.210.151.13/btssnir/projets2022/fablab/api/profil/photo.php?mail='+$("#email").attr("placeholder")+'&ancienne='+$("#image_profil").attr("src"), // <-- point to server-side PHP script
            dataType: 'json',  // <-- what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function(msg){
                if(msg.success==true){
                    location.reload();
                }
            }
        });
    })
})
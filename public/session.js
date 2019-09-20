if(sessionStorage.getItem("logId") == true){
    let admin = sessionStorage.getItem("logId")
    $.ajax({
        url: `http://localhost:3000/Admin/${admin}`,
        method: 'get'
    }).done(e =>{
        $('#welcome').prepend(
            `<h3>Welcome Admin</h3>`
        )
    })
}
else{
    window.location = "login.html"
}
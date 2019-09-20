$(document).ready(function() {

let div = null
$('#sub').submit(e => {

    e.preventDefault();
    let location =  $("#pl").val()
    let propId =  $("#propertyid").val()
    let propInfo =  $("#propertyInfo").val()
    let feature = $("#features").val()
    let amount = $('#amount').val()
    // let img = $('#img').attr("src", "")

    alert('clicked');

    $.ajax({
        url: "http://localhost:3000/property",
        method: "post",
        data: {
            location, propId, propInfo, feature, amount
        }
    }).done(data => {
        $("#pl").val('')
        $("#propertyid").val('')
        $("#propertyInfo").val('')
        $("#features").val('')
        $('#amount').val('')

        $('.left-items').append(
            `
                <img src="images/image10.jpg" alt="logo"/>
                <p>${data.location}</p>
                <p>${data.amount}</p>
                <p>${data.propId}</p>
                <p>${data.propInfo}</p>
                <p>${data.feature}</p>
                <button id="update-file"><a href="update.html">Update</a></button>
                <button id="del-file">Delete</button>
            `
        )
    })

})
  
$.ajax({
    url: 'http://localhost:3000/property',
    method: "get",
}).done(data => {
    for(let i = 0; i < data.length; i++) {
        $('.left-items').append(
            `
                <img src="images/image10.jpg" alt="logo"/>
                <p>${data[i].location}</p>
                <p>${data[i].amount}</p>
                <p>${data[i].propId}</p>
                <p>${data[i].propInfo}</p>
                <p>${data[i].feature}</p>
                <button id="view-${data[i].id}" class="view" data-toggle="modal" data-target="#exampleModal">View</button>
                <button id="update-file${data[i].id}" class="update" data-toggle="modal" data-target="#upda"><a >Update</a></button>
                <button class="del" id="del-file${data[i].id}">Delete</button>
                 `
        )
    }

    // To delete
    $('.del').on("click", (e) => {
        let delId = e.target.id.split('del-file').join('')
        // alert(delId)
        $.ajax({
            url: "http://localhost:3000/property/"+delId,
            method: "delete",
        }).done(d => {
            alert("deleted")
            window.location = "portal.html"
        })
    })


    // To view
    $('.view').on("click", (e) => {
        let viewId = e.target.id.split('view-').join('')
        // alert(delId)
        $.ajax({
            url: `http://localhost:3000/property/${viewId}`,
            method: "get",
        }).done(d => {
            // alert("Viewed")
            
            $('.view_top').html(
                `   <img src="images/image10.jpg" alt="logo"/>
                    <p>${d.location}</p>
                    <p>${d.amount}</p>
                    <p>${d.propId}</p>
                    <p>${d.propInfo}</p>
                    <p>${d.feature}</p>
                `
            )
        })
    })
    $('.update').on('click', (e) => {
        let updateId = e.target.id.split("update-file").join('')
        $.ajax({
            url: `http://localhost:3000/property/${updateId}`,
            method: 'get',
        }).done(data => {
            div = $('.update').parent().children("div")
        })
    })
})
 $("#signin").click(function(){
    let email = $("#email").val()
    let pass = $("#pass").val()
    $.ajax({
        url: `http://localhost:3000/Admin?email=${email}`,
        method: 'get'
    }).done(event => {
        if(pass = event[0].password){
            sessionStorage.setItem("logId", event[0].id)
            window.location = "portal.html"
        }
        else{
            alert("Login with correct details")
        }
    })
 })   



})

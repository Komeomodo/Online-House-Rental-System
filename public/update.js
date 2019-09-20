$('.upd').on('click', (e) => {
    e.preventDefault();
    let location =  $("#pl").val()
    let propId =  $("#propertyid").val()
    let propInfo =  $("#propertyInfo").val()
    let feature = $("#features").val()
    let amount = $('#amount').val()

    let updateId = e.target.id.split("update-file").join('')
        $.ajax({
            url: `http://localhost:3000/property/${updateId}`,
            method: 'put',
            data: {
                location, propId, propInfo, feature, amount
            }
        }).done(() => {
            alert('Edited')
            window.location.assign('portal.html')
            div.children[0].innerHTML = "Location: " + location
            div.children[0].innerHTML = "PropId: " + propId
            div.children[0].innerHTML = "Feature: " + feature
            div.children[0].innerHTML = "PropInfo: " + propInfo
            div.children[0].innerHTML = "Amount: " + amount
        }) 
})
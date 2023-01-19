let url = `ws://${window.location.host}/ws/${CHANNEL}/`
id = Date.now()

const chatSocket = new WebSocket(url)

function messageIn(tym=null, message=null){
    return `<div class="msg-in">
            <div class="msg-body">
                <div class="msg-info">
                    <p><strong>you</strong> ${tym}</p>
                </div>
                <div class="msg">
                    ${message}
                </div>
            </div>
        </div>`
}

function messageOut(tym=null, user=null, message=null){
    return `<div class="msg-out">
                    <div class="avatar"><img src="/static/img/user.jpg" width="100%" height="100%"></div>
                    <div class="msg-body">
                        <div class="msg-info">
                            <p><strong>${user}</strong> ${tym}</p>
                        </div>
                        <div class="msg">
                            ${message}
                        </div>
                    </div>

                </div>`
}


function sendImage(e){
    time = new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})
    var file = $(e).prop('files')[0]
    var fileType = file['type'].split('/')[0]
    var reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = function (){
        if (fileType == 'image'){
            formData = {'form': 'image', "message": reader.result, "id": id, "time": time, 'user': NAME}
            chatSocket.send(JSON.stringify(formData))
            msgIn = messageIn(tym=time, message=`<img class="materialboxed" src="${reader.result}" width="100%">`)
            $('.chat-body').append(msgIn)
            $('.materialboxed').materialbox();
        }
    };

    reader.onerror = function (error){
        console.log('Error: ', error);
    };
}

chatSocket.onmessage = function(e){
    let data = JSON.parse(e.data)
    if(data.type === 'chat'){
        console.log(data)
        var result = data.data
        if(result.id != id){
            if(result.form == 'image'){
                msgOut = messageOut(
                tym=result.time,
                user=result.user,
                message=`<img class="materialboxed" src="${result.message}" width="100%">`)
                $('.chat-body').append(msgOut)
                $('.materialboxed').materialbox();
            }else{
                msgOut = messageOut(tym=result.time, user=result.user, message=result.message)
                $('.chat-body').append(msgOut)
            }
        }
    }
    $('.chat-body').animate({scrollTop: $('.chat-body')[0].scrollHeight}, 1000);
}

$('form').submit(function(e){
    e.preventDefault()
    if($('#msg').val() != ''){
        time = new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true})
        console.log()
        formData = {"form": "text", "message": $('#msg').val(), "id": id, "time": time, 'user': NAME}
        chatSocket.send(JSON.stringify(formData))
        msgIn = `<div class="msg-in">
                        <div class="msg-body">
                            <div class="msg-info">
                                <p><strong>you</strong> ${time}</p>
                            </div>
                            <div class="msg">
                                ${$('#msg').val()}
                            </div>
                        </div>
                    </div>`
        $('.chat-body').append(msgIn)
        $(this)[0].reset()
        $('.chat-body').animate({scrollTop: $('.chat-body')[0].scrollHeight}, 1000);
    }

})

$('.image').click(function(){
    $('#image').trigger('click')
})
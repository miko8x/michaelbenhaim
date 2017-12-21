$(document).ready(function(){
    $('#submit').click(function(){
        var data = {
            first_name: $('.first_name input').val(),
            phonenumber: $('.phonenumber input').val(),
            email: $('.email input').val(),
            content:$('.content input').val(),
        };
        modifyCss('.leadforms', 'add', 'loading');
        $.post('/api/sendmsg', data, function(res){
            modifyCss('.leadforms', 'remove', 'loading');
            if (res.sent == 'ok' ){
                console.log('success');
                clearInputs();
                sayThanks(data.first_name);
            }
            else if (res.sent != 'ok'){
                console.log('failed to send data error: '+ res.status +', sent: '+res.sent);
            }
        }, "json");
    });

    $(".phonenumber input").keypress( function(e) {
        var chr = String.fromCharCode(e.which);
        if ("1234567890".indexOf(chr) < 0 || $(this).val().length > 9)
            return false;
    });

    function modifyCss(selector, action, css_class){
        if (action == 'remove'){
            $(selector).removeClass(css_class);
        }
        else if (action == 'add') {
            $(selector).addClass(css_class);
        }
    }

    function clearInputs(){
        $('input').val('');
        $('textarea').val('');
    }

    function sayThanks(name){
        $('#second .ui.container').html('<div class="ui large inverted centered message">תודה על פנייתך '+name+ '</div>');
    }

});
var ctrl;
doGet = function(url, output){
    $.ajax({
        type: 'GET',
        url: url,
        success: function(data){
        var ticket = JSON.parse(data).ticker
        var dia = new Date()
        dia = dia.getDate() + '/' + (dia.getMonth() + 1) + '/' + dia.getFullYear() + ' ' + dia.getHours() + ':' + dia.getMinutes() + ':' + dia.getSeconds()
        $('#' + output).html('<h4>Preço em ' + dia + '</h4><b>Compra:</b>&nbsp;R$ '+ ticket.buy+ '<br><b>Venda:</b>&nbsp;R$ '+ ticket.sell)
    },
    error: function(xhr, type){
        var dia = new Date()
        dia = dia.getDate() + '/' + (dia.getMonth() + 1) + '/' + dia.getFullYear() + ' ' + dia.getHours() + ':' + dia.getMinutes() + ':' + dia.getSeconds()
        $('#' + output).html(dia + ' - Erro ao atualizar<br>')
    }})
}

update = function(){
    doGet('http://www.mercadobitcoin.com.br/api/ticker_litecoin/', 'ltc-result')
    doGet('http://www.mercadobitcoin.com.br/api/ticker/', 'btc-result')
}

setup = function(){
    clearInterval(ctrl)
    update()
    ctrl = setInterval(update, 60000)
}

$(document).ready(function(){

    $('#btnClick').click(function(){
        setup()
    });

    setup()
});


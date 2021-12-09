$(async function() {

    var idProfissional = document.getElementById("idProfissional").value;
    var datas_data = {idProfissional};

    var dates = await fetch('/calculardias', {
        method: 'post', 
        body: JSON.stringify(datas_data),
        headers: {
        'Content-Type': 'application/json'
    }});

    dates = await dates.json();

    fim = [];

    for(var i=0; i<dates.length; i++) {
        fim[i] = dates[i];
    }

    function desabilitarDatas(data) {
        var string = $.datepicker.formatDate('yy-mm-dd', data);
        return [fim.indexOf(string) != -1];
    }

$( "#datepicker" ).datepicker({
    minDate: '0',
    dateFormat: 'dd-mm-yy',
    showAnim: "slideDown",
    beforeShowDay: desabilitarDatas,
    buttonText: "Choose",
    showButtonPanel: true,
    
    onSelect: async function(datetext){

        var data = document.getElementById("datepicker").value;
        var idProfissional = document.getElementById("idProfissional").value;

        var dados = {data, idProfissional};
                                  
        var ch = await fetch('/calcularhorarios', {
            method: 'post', 
            body: JSON.stringify(dados),
            headers: {
            'Content-Type': 'application/json'
        }})

        var resultado = await ch.json();
       
        console.log(resultado.intervalo)
        var options = '';
        
            for(var i=0; i<resultado.horarios.length; i++) {
                options += '<option value="'+resultado.horarios[i]+'">'+resultado.horarios[i]+'</option>';
            }

            $('#horarios').empty().append(options);
            $('#intervalo').val(resultado.intervalo);
        
    }
});
});
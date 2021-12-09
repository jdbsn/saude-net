class ConsultaFactory {

    ConstruirProfissional(consultaSimples){

        var ano = Number.parseInt(consultaSimples.data.split("-")[0]);
        var mes = Number.parseInt(consultaSimples.data.split("-")[1]);
        var dia = Number.parseInt(consultaSimples.data.split("-")[2]);

        var horaInicio =  Number.parseInt(consultaSimples.hora_inicio.split(":")[0]);
        var minutoInicio = Number.parseInt(consultaSimples.hora_inicio.split(":")[1]);

        var horaFim =  Number.parseInt(consultaSimples.hora_fim.split(":")[0]);
        var minutoFim = Number.parseInt(consultaSimples.hora_fim.split(":")[1]);

        mes = mes - 1;
        
        var comeco = new Date(ano, mes, dia, horaInicio, minutoInicio,0,0);
        var fim = new Date(ano, mes, dia, horaFim, minutoFim,0,0);

        var consulta = {
            id: consultaSimples.id,
            title: consultaSimples.paciente.nome,
            start: comeco,
            end: fim
        }

        return consulta;

    }

    ConstruirPaciente(consultaSimples){

        var ano = Number.parseInt(consultaSimples.data.split("-")[0]);
        var mes = Number.parseInt(consultaSimples.data.split("-")[1]);
        var dia = Number.parseInt(consultaSimples.data.split("-")[2]);
        var hora =  Number.parseInt(consultaSimples.hora_inicio.split(":")[0]);
        var minuto = Number.parseInt(consultaSimples.hora_inicio.split(":")[1]);

        mes = mes - 1;

        var comeco = new Date(ano, mes, dia, hora, minuto,0,0);

        var consulta = {
            id: consultaSimples.id,
            title: consultaSimples.profissional.nome,
            start: comeco,
            end: comeco
        }

        return consulta;

    }

}

module.exports = new ConsultaFactory();
const Consulta = require("../models/Consulta");

const Paciente = require("../models/Paciente");
const Profissional = require("../models/Profissional");

const ConsultaFactory = require("../factories/ConsultaFactory")

const moment = require("moment")

class ConsultaService{

    async criar(data, hora_inicio, intervalo, idPaciente, idProfissional) {

        var dia = Number.parseInt(data.split("-")[0]);
        var mes = Number.parseInt(data.split("-")[1]);
        var ano = Number.parseInt(data.split("-")[2]);
        
        var datamarcada = ano+"-"+mes+"-"+dia;

        function calcularHoraFim(hora_inicio, intervalo) {
            function D(J){ return (J<10? '0':'') + J;};
            var piece = hora_inicio.split(':');
            var mins = piece[0]*60 + +piece[1] + +intervalo;
          
            return D(mins%(24*60)/60 | 0) + ':' + D(mins%60);  
          }  
          
        var hora_fim = calcularHoraFim(hora_inicio, intervalo);  
        console.log(hora_fim)

        try {
            await Consulta.create({
                data: datamarcada,
                hora_inicio,
                hora_fim,
                idPaciente,
                idProfissional,
                status: 'agendado'
            })
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async pegarTodosPaciente(idPaciente, mostrarFinalizado) {
        try {
            if(mostrarFinalizado) {
                return await Consulta.findAll({where: {idPaciente: idPaciente}, include: [{model: Profissional}]});
            } else {
                var consultas = await Consulta.findAll({where: {idPaciente: idPaciente, status: 'agendado'}, include: [{model: Profissional}, {model: Paciente}]});
                var listaConsultas = [];
                consultas.forEach(consulta => {
    
                    listaConsultas.push(ConsultaFactory.ConstruirPaciente(consulta));
    
                })
                
                return listaConsultas;
    
            }
        } catch (err) {
            console.log(err);
            return [];
        }
        
    }

    async pegarTodosProfissional(idProfissional, mostrarFinalizado) {
        try {
            if(mostrarFinalizado) {
                return await Consulta.findAll({where: {idProfissional: idProfissional}, include: [{model: Paciente}]});
            } else {
                var consultas = await Consulta.findAll({where: {idProfissional: idProfissional, status: 'agendado'}, include: [{model: Paciente}]});
                var listaConsultas = [];
                consultas.forEach(consulta => {
    
                    listaConsultas.push( ConsultaFactory.ConstruirProfissional(consulta));
    
                })
                
                return listaConsultas;
    
            }
        } catch (err) {
            console.log(err);
            return [];
        }
        
    }

    async acharPorId(id) {
        try {
            return await Consulta.findOne({where: {id: id}, include: [{model: Profissional}, {model: Paciente}]});
        } catch (err) {
            console.log(err);
            return undefined;
        }
            
    }

    async acharTodosPorDiaProfissional(idProfissional, data) {
        try {
            return await Consulta.findAll({where: {
                idProfissional: idProfissional,
                data: data,
                status: 'agendado'
            }, attributes: ['hora_inicio']})
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async atender(id, anotacoes) {
        try {
            await Consulta.update({status: 'finalizado', anotacoes: anotacoes}, {where: {id: id}})
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

}

module.exports = new ConsultaService();
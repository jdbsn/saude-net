const Consulta = require("../models/Consulta");

const Paciente = require("../models/Paciente");
const Profissional = require("../models/Profissional");

const ConsultaFactory = require("../factories/ConsultaFactory")

const moment = require("moment");
const ProfissionalService = require("./ProfissionalService");

const CalcularHoraFim = require("../modules/CalcularHoraFim");

const Email = require("../modules/Email");

class ConsultaService{

    async criar(data, hora_inicio, intervalo, idPaciente, emailPaciente, idProfissional) {

        var dia = Number.parseInt(data.split("-")[0]);
        var mes = Number.parseInt(data.split("-")[1]);
        var ano = Number.parseInt(data.split("-")[2]);
        
        var datamarcada = ano+"-"+mes+"-"+dia;
          
        var hora_fim = CalcularHoraFim(hora_inicio, intervalo);  

        try {
            await Consulta.create({
                data: datamarcada,
                hora_inicio,
                hora_fim,
                idPaciente,
                idProfissional,
                status: 'agendado'
            })

            var profissional = await ProfissionalService.acharPorId(idProfissional);

            Email.confirmacaoAgendamento(emailPaciente, profissional, data, hora_inicio);

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

    async remarcar(id, data, hora_inicio, intervalo) {
        var dia = Number.parseInt(data.split("-")[0]);
        var mes = Number.parseInt(data.split("-")[1]);
        var ano = Number.parseInt(data.split("-")[2]);
        
        var datamarcada = ano+"-"+mes+"-"+dia;
        var hora_fim = CalcularHoraFim(hora_inicio, intervalo);
        try {
            Consulta.update({data: datamarcada, hora_inicio: hora_inicio, hora_fim: hora_fim}, {where: {id: id}});
            return true;
        } catch (err) {
            console.log(err);
            return false;
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
    
    async cancelarPaciente (id, idPaciente) {

        try {
            var consulta = await this.acharPorId(id);

            if(consulta.idPaciente != idPaciente) {
                return false;
            } else {
                Consulta.destroy({where: {id: id}});
                return true;
            }
        } catch (err) {
            console.log(err);
        }

    }

    async cancelarProfissional (id, idProfissional) {

        try {
            var consulta = await this.acharPorId(id);

            if(consulta.idProfissional != idProfissional) {
                return false;
            } else {
                Consulta.destroy({where: {id: id}});
                return true;
            }
        } catch (err) {
            console.log(err);
        }

    }

}

module.exports = new ConsultaService();
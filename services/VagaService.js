const Vaga = require("../models/Vaga");
const ConsultaService = require("./ConsultaService");

const { Op } = require("sequelize");

const moment = require("moment");

class VagaService {

    async criar(data, hora_inicio, hora_fim, intervalo, idProfissional) {
        var dia = Number.parseInt(data.split("-")[0]);
        var mes = Number.parseInt(data.split("-")[1]);
        var ano = Number.parseInt(data.split("-")[2]);

        var datafinal = ano+"-"+mes+"-"+dia;
        try {
            await Vaga.create({
                data: datafinal,
                hora_inicio,
                hora_fim,
                intervalo,
                idProfissional
            })
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async acharTodos(idProfissional) {
        try {
            return await Vaga.findAll({where: {idProfissional: idProfissional}});
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async acharPorDia(data, idProfissional) {
        try {
            return await Vaga.findOne({where: {data: data, idProfissional: idProfissional}});
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async calcularDias(idProfissional) {
        try {
            var resultado = await Vaga.findAll({where: {
                idProfissional: idProfissional,
                data: {
                  [Op.gte]: moment().format("YYYY-MM-DD")
                }
                }});

            var datas = [];
            
            resultado.forEach(data => {
                datas.push(data.data);
            })

            return datas;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async calcularHorarios (data, idProfissional) {

        try {

            var dia = Number.parseInt(data.split("-")[0]);
            var mes = Number.parseInt(data.split("-")[1]);
            var ano = Number.parseInt(data.split("-")[2]);
        
            var dataFinal = ano+"-"+mes+"-"+dia;

            var vaga = await this.acharPorDia(dataFinal, idProfissional);

            if(vaga == null) {
                return [];
            } else {
                var hora_inicio = Number.parseInt(vaga.hora_inicio.split(":")[0]);
                var minuto_inicio = Number.parseInt(vaga.hora_inicio.split(":")[1]);
        
                var hi = (hora_inicio * 60) + minuto_inicio;
            
                var horafim = Number.parseInt(vaga.hora_fim.split(":")[0]);
                var minutofim = Number.parseInt(vaga.hora_fim.split(":")[1]);
            
                var hf = (horafim * 60) + minutofim;
            
                var horarios = [];
            
                for (var i=0; hi<hf; i++) {
                    var hora = Math.floor(hi/60);
                    var minuto = (hi%60);
                    horarios[i] = (("0" + hora).slice(-2) + ':' + ("0" + minuto).slice(-2));
                    hi = hi + Number.parseInt(vaga.intervalo);
                }

                var horarioMarcado = await ConsultaService.acharTodosPorDiaProfissional(idProfissional, dataFinal);
                var index = 0;

                for (var i=0; i<horarioMarcado.length; i++) {
                    index = horarios.indexOf(horarioMarcado[i].hora_inicio);
                    if (index > -1) {
                        horarios.splice(index, 1);
                    }
                }
    
                var resultado = {
                    horarios,
                    intervalo: vaga.intervalo
                }

            return resultado;
            }
        
        } catch (err) {
            console.log(err);
        }
        
    }

}

module.exports = new VagaService();
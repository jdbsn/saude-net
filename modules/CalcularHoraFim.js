function calcularHoraFim(hora_inicio, intervalo) {
    function D(J){ return (J<10? '0':'') + J;};
    var piece = hora_inicio.split(':');
    var mins = piece[0]*60 + +piece[1] + +intervalo;
  
    return D(mins%(24*60)/60 | 0) + ':' + D(mins%60);  
}  

module.exports = calcularHoraFim;
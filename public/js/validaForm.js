$(document).ready(function(){
    $("#validaform").validate({
    rules:{
      nome: {
        required: true,
        minlength: 10,
        maxlength: 60,
      },
      data_nascimento: {
        required: true,
        date: true
      },
      genero: {
          required: true,
      },
      telefone: {
        required: true
        
      },
      rua: {
          required: true,
          minlength: 8,
          maxlength: 40
      },
      bairro: {
          required: true,
          minlength: 4,
          maxlength: 30
      },
      cep:{
           required: true
      },
      cidade:{
          required: true
      },
      estado: {
        required: true
      },
      cpf: {
        required: true,
        cpfBR: true
      },
      cnpj: {
        required: true
      },
      tipo:{
          required: true
      },
      especialidade: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      senha: {
        required: true,
        minlength: 8,
        maxlength: 16
      },
      confirmaSenha:{
          required: true,
          equalTo: '#senha'
      }
      
   }
    })
  
  })
 
  let tipo = document.querySelector("#tipo");
  let tipo1 = ["Pediatra", "Cardiologista", "Ortopedista", "Urologista", "Neurologista", "Dermatologista", "Psiquiatra"]
  let tipo2 = ["Ortodontista", "Odontopediatra", "Implantodentista", "Estomatologista"]
  let tipo3 = []
  let tipo4 =[]
  let tipo5 = ["cardiovascular", "Respiratória", "Osteopatia"]
  
  tipo.addEventListener('change', () => {
    switch (tipo.value){
      case "Médico":
        criaSelect(tipo1);
        break;
        case "Dentista": 
        criaSelect(tipo2);
        break;
        case "Psicologo":
        criaSelect(tipo3);
        break;
        case "":
        criaSelect(tipo4);
        break;
        case "Fisioterapeuta":
          criaSelect(tipo5)
          break;
    }
  });
  
  function limpaSelect(selectbox){
    var i;
    for(i = selectbox.options.length -1; i >=0; i--){
      selectbox.remove(i);
    }
  }
  function criaOption (elemento){
    let selectespecialidade = document.querySelector('#especialidade')
    let criaElementoOption = document.createElement('option')
    let insereSelect = selectespecialidade.appendChild(criaElementoOption)
    criaElementoOption.textContent = elemento;
  }
  
  function compara(primeiroTipo, segundoTipo ){
    if( primeiroTipo == segundoTipo){
      primeiroTipo.forEach((elemento) =>{
        criaOption (elemento);
      });
    }
  
  }
  
  function criaSelect (tipo){
    limpaSelect(document.querySelector('#especialidade'));
  
    compara(tipo, tipo1);
    compara(tipo, tipo2);
    compara(tipo, tipo3);
    compara(tipo, tipo4);
    compara(tipo, tipo5);
    compara(tipo, tipo6);
    compara(tipo, tipo7);
    compara(tipo, tipo8);
  }
  
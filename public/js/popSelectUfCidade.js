   
  const selectEstado = document.querySelector('#estado');
  const selectCidade = document.querySelector('#cidade');

  function popSelectEstado() {
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then(res => res.json())
    .then(estados => {
      
      estados.map(estado => {
        
        const option = document.createElement('option');
    
        option.setAttribute('value', estado.sigla);
        option.textContent = estado.nome;
    
        selectEstado.appendChild(option);
      });
    })
  }

  function popSelectCidade() {
  selectEstado.addEventListener('change', () => {
    
    let nodesSelectCities = selectCidade.childNodes;
    
    [...nodesSelectCities].map(node => node.remove());
    
    let estado = selectEstado.options[selectEstado.selectedIndex].value;
    
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`)
      .then(res => res.json())
      .then(cidades => {
        
        selectCidade.removeAttribute('disabled');
      
        cidades.map(cidade => {
        
          const option = document.createElement('option');

          option.setAttribute('value', cidade.nome);
          option.textContent = cidade.nome;

          selectCidade.appendChild(option);
        });
      })
  });
  }

  popSelectEstado();
  popSelectCidade();

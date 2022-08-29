let result = document.querySelector('#result');
let msg = document.querySelector('#msg');
let msgErro = document.querySelector('#msgErro');
let thead = document.querySelector('thead');
let table = document.querySelector('table');
let botaoDel = document.querySelector("#btn-del");
let linha = document.createElement('tr');

async function consultaCEP() {
    let cep = document.querySelector('#cep').value;    

    cep.length != 8 && alert('CEP inválido. Favor inserir novamente.')

    cep.value === cep && alert('Este CEP já foi verificado')

    let url = `https://viacep.com.br/ws/${cep}/json/`;

    await fetch(url)
    .then((response) => {
        response.json()
        .then((data) => {
            console.log(data)
            mostraDados(data)

            let enderecos = JSON.parse(
              localStorage.getItem("Lista de Endereços")
            );
            if (enderecos == null) {
              localStorage.setItem("Lista de Endereços", "[]");
              enderecos = [];
            }
            enderecos.push(data);
            localStorage.setItem(
              "Lista de Endereços",
              JSON.stringify(enderecos)
            );
        })        
    })
    .catch((error) => {
        console.log(`Ocorreu um erro: ${error.name} | ${error.status}`)
    })

    document.querySelector('#cep').value = ''
}

function mostraDados(dados) {        
    if(dados.length != 0 ) {        
        $(msg).hide()
        $(thead).show()
    } 

    if (dados.cep === undefined ) {
        $(msgErro).show()
        $(table).hide()
        $(result).hide()  
        $(botaoDel).remove()   
    }

    linha.innerHTML = `
        <td>${dados.cep}</td>
        <td>${dados.logradouro}</td>
        <td>${dados.bairro}</td>
        <td>${dados.localidade}/${dados.uf}</td>
    `;    

    result.appendChild(linha);      
    $(botaoDel).show()    
}

function novaBusca() {
    location.reload();
}

function deletar() {
    $(botaoDel).remove() 
    $(result).remove() 
    $(table).remove() 
    localStorage.clear()
    location.reload()
}





function contaAcessos() {
    const dadosVisitas = JSON.parse(localStorage.getItem('informacoesAcesso'))
    if (dadosVisitas) {
        if (dadosVisitas.contador) {
            let count = parseInt(dadosVisitas.contador)
            return count + 1
        }
        return 0
    }
}

function formataData() {
    const formatData = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }

    const dataAlterada = new Intl.DateTimeFormat('pt-BR', formatData).format(new Date())

    return dataAlterada
}

function salvaInformacoes() {
    const informacoesAcesso = {
        ultimaVisita: formataData(),
        contador: contaAcessos()
    }
    localStorage.setItem('informacoesAcesso', JSON.stringify(informacoesAcesso))
}

function alteraHTML() {
    const p = document.querySelector('#dadosVisitas')
    const informaceosAcesso = JSON.parse(localStorage.getItem('informacoesAcesso'))
    p.innerHTML = `essa página foi acessada ${informaceosAcesso.contador}. O último acesso foi em ${informaceosAcesso.ultimaVisita}`

}

salvaInformacoes()
alteraHTML()
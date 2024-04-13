function changePageTitle(title) {
    document.title = title
}

function generateInfoSection(arrayImagensFiltradas, pokemonName) {
    const h2 = document.createElement('h2')
    h2.id = "info-pokemon-label"
    h2.textContent = `Informações sobre ${pokemonName}`

    const img = document.querySelector('img')

    img.src = arrayImagensFiltradas[0]
    img.alt = `Imagem do pokemon ${pokemonName}`

    let atual = 0
    img.addEventListener('click', () => {
        console.log(atual)
        atual = (atual + 1) % arrayImagensFiltradas.length
        img.src = arrayImagensFiltradas[atual]
    })

    const section = document.querySelector('#info-pokemon')

    section.appendChild(h2)
    section.appendChild(img)

}

async function getPokemonData(name) {


    try {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

        const jsonData = await data.json()

        const arrayImagens = Object.values(jsonData.sprites)
        let arrayImagensFiltradas = arrayImagens.filter(imagem => typeof imagem === 'string')
        generateInfoSection(arrayImagensFiltradas, name)

    } catch (error) {
        console.error(error)
    }
}

function getSearchParams() {
    // Early return -> Caso location search, não faz nada.
    if (!location.search) {
        return
    }

    // URLSearchParams é uma classe que facilita a manipulação de query strings
    const urlSearchParams = new URLSearchParams(location.search)

    // Pegando o valor do parâmetro name
    const pokemonName = urlSearchParams.get('name')

    changePageTitle(`Pagina do ${pokemonName}`)
    getPokemonData(pokemonName)
}

document.addEventListener('DOMContentLoaded', function () {
    getSearchParams()

})
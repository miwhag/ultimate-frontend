
const main = document.querySelector('main')
const header = document.querySelector('header')

let headerTitle = document.createElement('h1')
let headerImg = document.createElement('img')
headerImg.src = '/photos/disc.png'
headerImg.className = 'disc-picture'
headerTitle.className = 'header-title'
headerTitle.innerText = "LEAGUE"
header.append(headerTitle, headerImg)


fetch("http://localhost:3000/players")
.then(response => response.json())
.then(players => {
    players.map(player => {
        let card = document.createElement('card')
        card.innerHTML =  `
        <div class="card" style="width: 12rem;">
        <img class="card-img-top" src="${player.image}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title"> ${player.name}</h4>
        <h3 class="card-text h3">${player.team.name}</h3>
        <p class="card-text">Position - ${player.position}</p>
        <p class="card-text"> Level - ${player.level}</p>
        </div>
        </div>`

    main.append(card)

    })
})


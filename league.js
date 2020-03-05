const main = document.querySelector('main')
const header = document.querySelector('.header-text')
const headerText = document.createElement('h1')
headerText.innerText = 'LEAGUE'
headerText.className = 'header-text'
header.append(headerText)

fetch("http://localhost:3000/players")
.then(response => response.json())
.then(players => {
    players.map(player => {
console.log(player)
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

let card = document.createElement('card')
card.innerHTML =  `
<div class="card" style="width: 18rem;">
<img class="card-img-top" src="${player.image}" alt="Card image cap">
<div class="card-body">
<h5 class="card-title"> ${player.name}</h4>
<p class="card-text">Position - ${player.position}</p>
<p class="card-text"> Level - ${player.level}</p>
<p class="card-text">Spirit Animal - ${player.spirit_animal}</p>
</div>
</div>`
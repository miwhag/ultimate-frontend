const rosterLink = document.querySelector('.roster-link')
const cardContainer= document.querySelector('.card-container')
console.log(rosterLink)

const header = document.querySelector('.header-text')
const headerText = document.createElement('h1')
headerText.className = 'header-text'
header.append(headerText)

fetch('https://serene-atoll-97679.herokuapp.com/teams')
.then(response => response.json())
.then(teams => {
    const flatiron_flyer = teams.find(team => team.name === "Flatiron Flyers")
    flatiron_flyer.players.map(player => {

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

            cardContainer.append(card)
    })
   
})


           
            


            // let card = document.createElement('div')
            // card.innerHTML = `
            // <img class="card-img-top" src="${playerPic}" alt="Card image cap">
            // <div class="card-body">
            // <h5 class="card-title">Card title</h5>
            // <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            // <a href="#" class="btn btn-primary">Go somewhere</a>
            // </div> `
            

// }
//     })
// })
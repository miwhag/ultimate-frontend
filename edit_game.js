
const header = document.querySelector('.header-text')
const headerText = document.createElement('h1')
const main = document.querySelector('main')
const cardsContainer = document.querySelector('.cards-container')
const newGameForm = document.querySelector('.new-game-form')

headerText.className = 'header-text'
header.append(headerText)


fetch('http://localhost:3000/team_games')
.then(response => response.json())
.then(teams => {
    teams.map(teamObject => {
        // console.log(teamObject)
        let card = document.createElement('card')
            card.innerHTML =  `
            <div class="card">
            <img class="card-img-top" src="${teamObject.rival.image}" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-text"> Name: ${teamObject.rival.name}</h4>
            <p class="card-text">Team Color:  ${teamObject.rival.color}</p><br>

            <p class="card-text"> Game Time:  ${teamObject.game.time}</p>
            <p class="card-text"> Game Date:   ${teamObject.game.date}</p><br>
            
            <p class="card-text"> Location:   ${teamObject.game.location.name}</p>
            <p class="card-text"> Address:   ${teamObject.game.location.address}</p><br>
            
            <p class="card-text"> Field Number:   ${teamObject.game.location.field_num}</p>
            <p class="card-text"> Field Type:   ${teamObject.game.location.field_type}</p>

            </div>
            </div>`

         main.append(cardsContainer)
        cardsContainer.append(card)
    })

    })
   

    const rivalSelect = document.querySelector('#rival-select')
    const teamSelect = document.querySelector('#team-select')
    fetch("http://localhost:3000/teams")
    .then( response => response.json())
    .then(teams => {
        teams.map(team => {
            // console.log(team)
            if (team.name !== "Flatiron Flyers"){
                let option = document.createElement('option')
                option.innerText = team.name
                option.value = team.id
        
                rivalSelect.append(option)
            } else {
                let option = document.createElement('option')
                option.innerText = team.name
                option.value = team.id
                
                teamSelect.append(option)
            }
        })
        })
 
    const seasonSelect = document.querySelector('#season-select')
    fetch("http://localhost:3000/seasons")
    .then( response => response.json())
    .then(seasons => {
        seasons.map(season => {
        
                let option = document.createElement('option')
                option.innerText = season.name
                option.value = season.id
        
                seasonSelect.append(option)
        })
    })
    

    const locationSelect = document.querySelector('#location-select')
    fetch("http://localhost:3000/locations")
    .then( response => response.json())
    .then(locations => {
        locations.map(location => {
        
                let option = document.createElement('option')
                option.innerText = `${location.name} at field ${location.field_num}`
                option.value = location.id
        
                locationSelect.append(option)
        })
    })


    // newGameForm.addEventListener('submit',function(){
    //     createNewGame()
    // })

    function createNewGame(){

        const formData = new FormData(newGameForm)
        const formLocation = formData.get("location")
        const formSeason = formData.get("season")
        const formTime = formData.get("time")
        const formDate = formData.get("date")
        
        
        fetch('http://localhost:3000/games', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            }, 
            body: JSON.stringify({
                location: parseInt(formLocation), 
                season: parseInt(formSeason), 
                time: formTime, 
                date: formDate
            })
        }).then(response => response.json())
        .then(result => createNewTeamGame(result))
    }
    


    function createNewTeamGame(result){
        
        const gameid = result.id

        const formData = new FormData(newGameForm)
        const formTeamName = formData.get("team")
        const formRivalName = formData.get("rival")
        const formGameId = gameid
        
        fetch('http://localhost:3000/team_games', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            }, 
            body: JSON.stringify({
                team: parseInt(formTeamName), 
                rival: parseInt(formRivalName), 
                game: formGameId
            })
        })
 }


 function scheduleNewGame(id, result){
     createNewGame()
     createNewTeamGame()
 }

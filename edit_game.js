const header = document.querySelector('header')
let headerTitle = document.createElement('h1')
let headerImg = document.createElement('img')
headerImg.src = '/photos/disc.png'
headerImg.className = 'disc-picture'
headerTitle.className = 'header-title'
headerTitle.innerText = "EDIT SCHEDULE"
header.append(headerTitle, headerImg)

const main = document.querySelector('main')
const cardsContainer = document.querySelector('.cards-container')
const newGameForm = document.querySelector('.new-game-form')
const newTeamForm = document.querySelector('.new-team-form')
const deleteTeamForm = document.querySelector('.delete-team-form')



fetch('https://serene-atoll-97679.herokuapp.com/')
.then(response => response.json())
.then(teams => createScheduleCard(teams)) 

function createScheduleCard(teams){
    teams.map(teamObject => {
        const card = document.createElement('card')
        card.innerHTML = `
        <img class="card-img-top" src="${teamObject.rival.image}" alt="Card image cap">`
        card.className = 'card'

        const cardBody = document.createElement('div')
        cardBody.innerHTML = `
        <h5 class="card-text"> Name: ${teamObject.rival.name}</h4>
       <p class="card-text">Team Color:  ${teamObject.rival.color}</p><br>
        <p class="card-text"> Game Time:  ${teamObject.game.time}</p>
        <p class="card-text"> Game Date:   ${teamObject.game.date}</p><br>
        
        <p class="card-text"> Location:   ${teamObject.game.location.name}</p>
        <p class="card-text"> Address:   ${teamObject.game.location.address}</p><br>
        
        <p class="card-text"> Field Number:   ${teamObject.game.location.field_num}</p>
        <p class="card-text"> Field Type:   ${teamObject.game.location.field_type}</p>
        `
        cardBody.className = "card-body"

        
        const deleteButton = document.createElement('button')
        deleteButton.innerText = 'DELETE'
        deleteButton.className = 'btn btn-outline-danger'
    
        main.append(cardsContainer)
        cardsContainer.append(card)
        card.appendChild(cardBody)
        cardBody.appendChild(deleteButton)


        deleteButton.addEventListener('click', () => {
            let result = confirm("Want to delete?");
            if (result) {
            event.target.parentNode.parentNode.remove()
            fetch(`https://serene-atoll-97679.herokuapp.com/${teamObject.id}`, {
                method: 'DELETE'
            })
            }   
        })
    })
}
 
const rivalSelect = document.querySelector('#rival-select')
const teamSelect = document.querySelector('#team-select')
fetch("https://serene-atoll-97679.herokuapp.com/teams")
.then( response => response.json())
.then(teams => {
    teams.map(team => {
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
fetch("https://serene-atoll-97679.herokuapp.com/seasons")
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
fetch("https://serene-atoll-97679.herokuapp.com/locations")
.then( response => response.json())
.then(locations => {
    locations.map(location => {
    
            let option = document.createElement('option')
            option.innerText = `${location.name} at field ${location.field_num}`
            option.value = location.id
    
            locationSelect.append(option)
    })
})


newTeamForm.addEventListener('submit',function(){
    addNewTeam()
})

function addNewTeam(){
    const formData = new FormData(newTeamForm)
    const newTeamName = formData.get("name")
    const newTeamColor = formData.get("color")
    const newTeamImage = formData.get("image")

    fetch('https://serene-atoll-97679.herokuapp.com/teams', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
        }, 
        body: JSON.stringify({
            name: newTeamName, 
            color: newTeamColor,
            image: newTeamImage
        })  
    }) 
}

const deleteTeamSelectTag = document.querySelector('#team-delete-select')
fetch("https://serene-atoll-97679.herokuapp.com/teams")
.then( response => response.json())
.then(teams => {
    teams.map(team => {
        if (team.name !== "Flatiron Flyers"){
            let option = document.createElement('option')
            option.innerText = team.name
            option.value = team.id
    
            deleteTeamSelectTag.append(option) 
        }  
    })
})

newGameForm.addEventListener('submit',function(){
    event.preventDefault()
    createNewGame()
})

function createNewGame(){
    const formData = new FormData(newGameForm)
    const formLocation = formData.get("location")
    const formSeason = formData.get("season")
    const formTime = formData.get("time")
    const formDate = formData.get("date")
    
    fetch('https://serene-atoll-97679.herokuapp.com/games', {
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
    })
        .then(response => response.json())
        .then(data => createNewTeamGame(data))
        .catch( error => console.error(error.message))
}


function createNewTeamGame(result){

    console.log('New team game function result', result)
    const gameid = result.id

    const formData = new FormData(newGameForm)
    const formTeamName = formData.get("team")
    const formRivalName = formData.get("rival")
    const formGameId = gameid
    
    fetch('https://serene-atoll-97679.herokuapp.com/', {
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
    }).then(() => window.location.reload())
}

const deleteButton = document.querySelector('.delete-team-button')
deleteButton.addEventListener('click', () => {

    let result = confirm("Want to delete?");
    if (result) {
        const selectElement = document.querySelector('#team-delete-select')
        const id = selectElement.options[selectElement.selectedIndex].value
        if(id !== 'Select a Team'){
          fetch(`https://serene-atoll-97679.herokuapp.com/teams/${id}`, {
              method: 'DELETE'
          })
        }
    }
    })
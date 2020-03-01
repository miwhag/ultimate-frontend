
const tbody = document.querySelector('tbody')
const trTag = document.querySelector('tr')
const main = document.querySelector('main')
const scheduleHeader= document.querySelector('#team-picture-container')

fetch('http://localhost:3000/team_games')
.then(response => response.json())
.then(teamGames=> {
    teamGames.map(game=> {
        console.log(game)
        let gameContainer = document.createElement('div')
        gameContainer.className = 'game-div-container'


        let rivalName = document.createElement('h5')
        let date = document.createElement('h5')
        let time = document.createElement('h5')
        let location = document.createElement('h5')
        let score = document.createElement('h5')

        rivalName.innerText = game.rival.name
        date.innerText = game.game.date
        time.innerText = game.game.time
        location.innerText = game.game.location_id
        score.innerText = game.game.score_id
        
       
        main.append(gameContainer)
        gameContainer.append(rivalName, date, time, location, score)
    })

    let headerTitle = document.createElement('h1')
    let headerImg = document.createElement('img')
    headerImg.src = 'team.png'
    headerImg.className = 'team-picture'
    headerTitle.className = 'header-title'
    headerTitle.innerText = "Schedule"
    scheduleHeader.append(headerTitle, headerImg)

})

// fetch('http://localhost:3000/games')
// .then(response => response.json())
// .then(games => {
//     games.map(game => {
//         // let tdTagLocation= document.createElement('td')
//         // tdTagLocation.innerText = game.location.name
//         // trTag.append(tdTagLocation)
//     })
// })
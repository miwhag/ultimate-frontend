const tbody = document.querySelector('tbody')
const trTag = document.querySelector('tr')
const main = document.querySelector('main')
const scheduleHeader= document.querySelector('#team-picture-container')


fetch('http://localhost:3000/team_games')
.then(response => response.json())
.then(teamGames=> {
    console.log(teamGames)
    teamGames.map(gameObject=> {
        // console.log(game)
        let gameContainer = document.createElement('div')
        gameContainer.className = 'game-div-container'

        let rivalName = document.createElement('h4')
        let date = document.createElement('h5')
        let time = document.createElement('h5')
        let score = document.createElement('h5')
        let teamImage = document.createElement('img')
        let locationId = document.createElement('h5')
        let locationName = document.createElement('h5')
        

        
        rivalName.innerText = gameObject.rival.name
        date.innerText = gameObject.game.date
        time.innerText = gameObject.game.time
        score.innerText = gameObject.game.score_id
        teamImage.src = gameObject.rival.image
        teamImage.className = "team-logo"
        locationName.innerHTML = `<a href="about_game_location.html?id=${gameObject.game.location_id}">${gameObject.game.location.name}</a>`
       

            
        main.append(gameContainer)
        gameContainer.append(teamImage,rivalName, date, time, score, locationName)

        // gameContainer.addEventListener('click', event => {
            
        // })
    })

    let headerTitle = document.createElement('h1')
    let headerImg = document.createElement('img')
    headerImg.src = 'team.png'
    headerImg.className = 'team-picture'
    headerTitle.className = 'header-title'
    headerTitle.innerText = "Schedule"
    scheduleHeader.append(headerTitle, headerImg)
})








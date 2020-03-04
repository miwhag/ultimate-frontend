const tbody = document.querySelector('tbody')
const trTag = document.querySelector('tr')
const main = document.querySelector('main')
const scheduleHeader= document.querySelector('#team-picture-container')


fetch('http://localhost:3000/team_games')
.then(response => response.json())
.then(teamGames=> {
    console.log(teamGames)
    teamGames.map(gameObject=> {
        console.log(gameObject)
        let gameContainer = document.createElement('div')
        gameContainer.className = 'game-div-container'

        let rivalName = document.createElement('h4')
        let date = document.createElement('h5')
        let time = document.createElement('h5')
        let score = document.createElement('h5')
        let teamImage = document.createElement('img')
        let locationName = document.createElement('h5')
        let seeMoreInfo = document.createElement('h5')
        
 
        
        rivalName.innerText = gameObject.rival.name
        date.innerText = gameObject.game.date
        time.innerText = gameObject.game.time
        score.innerText = gameObject.game.score_id
        teamImage.src = gameObject.rival.image
        teamImage.className = "team-logo"
        locationName.innerHTML = gameObject.game.location.name
        seeMoreInfo.innerHTML = `<a href="game_info.html?id=${gameObject.id}"> View More </a>`
       

            
        main.append(gameContainer)
        gameContainer.append(teamImage,rivalName, date, time, locationName, seeMoreInfo)

        // gameContainer.addEventListener('click', event => {
            
        // })
    })

    let headerTitle = document.createElement('h1')
    let headerImg = document.createElement('img')
    headerImg.src = '/photos/team.png'
    headerImg.className = 'team-picture'
    headerTitle.className = 'header-title'
    headerTitle.innerText = "SCHEDULE"
    scheduleHeader.append(headerTitle, headerImg)
})








const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')
const header = document.querySelector('header')
const main = document.querySelector('.rival-vs-home-section')
const gameInfoSection = document.querySelector('.game-info-section')


fetch(`http://localhost:3000/team_games/${id}`)
.then(response => response.json())
.then(teamObject=> {
    console.log(teamObject)

        let pageTitle = document.createElement('h2')
        pageTitle.innerText = "MATCHUP"
        pageTitle.className = "header-text"

        let teamDiv = document.createElement('div')
        let rivalDiv = document.createElement('div')
        teamDiv.className = 'team-div'
        rivalDiv.className = 'rival-div'

        let teamImageContainer = document.createElement('div')
        teamImageContainer.className = 'team-image-container'
        let rivalImageContainer = document.createElement('div')
        rivalImageContainer.className = 'rival-image-container'

        let vs = document.createElement('h1')
        vs.className = 'vs'
        let teamImage = document.createElement('img')
        let rivalImage = document.createElement('img')
        teamImage.className = 'team-image'
        rivalImage.className = 'rival-image'


        let teamName = document.createElement('h4')
        let teamColor = document.createElement('h4')
        let rivalName = document.createElement('h4')
        let rivalColor = document.createElement('h4')
        let date = document.createElement('h5')
        let time = document.createElement('h5')
        let score = document.createElement('h5')
        let locationName = document.createElement('h5')
        let locationAddress = document.createElement('h5')
        let locationLat = teamObject.game.location.lat
        let locationLng = teamObject.game.location.lng

        teamName.innerText = teamObject.team.name
        teamColor.innerText = teamObject.team.color
        teamImage.src = teamObject.team.image
        rivalName.innerText = teamObject.rival.name 
        rivalColor.innerText = teamObject.rival.color
        rivalImage.src = teamObject.rival.image
        date.innerText = teamObject.game.date
        time.innerText = teamObject.game.time
        score.innerText = teamObject.game.score
        locationName.innerText = teamObject.game.location.name
        locationAddress.innerText = teamObject.game.location.address
        vs.innerText = "VS"

        header.append(pageTitle)
        gameInfoSection.append( date, time, locationName, locationAddress)
        main.append( teamDiv, vs, rivalDiv)
        teamDiv.append(teamImageContainer,teamName, teamColor)
        rivalDiv.append(rivalImageContainer, rivalName, rivalColor)
        rivalImageContainer.appendChild(rivalImage)
        teamImageContainer.appendChild(teamImage)

        var latLng = {lat: parseFloat(locationLat), lng: parseFloat(locationLng)}

        var map = new google.maps.Map(document.getElementById('map'), {
            center: latLng,
            zoom: 17
          });

        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
          });

})




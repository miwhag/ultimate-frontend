const searchParams = new URLSearchParams(window.location.search)
const id = searchParams.get('id')
const teamInfoMainContainer = document.querySelector('.rival-vs-home-section')
const gameInfoSection = document.querySelector('.game-info-section')
const header = document.querySelector('header')

let headerTitle = document.createElement('h1')
let headerImg = document.createElement('img')
headerImg.src = '/photos/disc.png'
headerImg.className = 'disc-picture'
headerTitle.className = 'header-title'
headerTitle.innerText = "GAME INFO"
header.append(headerTitle, headerImg)


fetch(`https://serene-atoll-97679.herokuapp.com/${id}`)
.then(response => response.json())
.then(teamObject=> {
        let imageContainer = document.createElement('div')
        let textContainer = document.createElement('h1')
        let vs = document.createElement('h1')
        let info = document.createElement('h1')
        let teamImage = document.createElement('img')
        let rivalImage = document.createElement('img')
        let rivalName = document.createElement('h4')
        let rivalColor = document.createElement('h4')
        let date = document.createElement('h5')
        let time = document.createElement('h5')
        let locationName = document.createElement('h5')
        let locationAddress = document.createElement('h5')
        let locationFieldNum = document.createElement('h5')
        let locationFieldType = document.createElement('h5')


        imageContainer.className = 'image-container'
        textContainer.className = 'text-container'
        vs.className = 'vs'
        info.className = 'info'
        info.innerText = 'INFORMATION'
        teamImage.className = 'team-image'
        rivalImage.className = 'rival-image'

  
        let locationLat = teamObject.game.location.lat
        let locationLng = teamObject.game.location.lng
        teamImage.src = teamObject.team.image
        rivalName.innerText = `Playing Against: ${teamObject.rival.name}`
        rivalColor.innerText = `Against Team Color: ${teamObject.rival.color}`
        rivalImage.src = teamObject.rival.image
        date.innerText = `Date: ${teamObject.game.date}`
        time.innerText = `Time: ${teamObject.game.time}`
        locationName.innerText = `Location: ${teamObject.game.location.name}`
        locationAddress.innerText = `Address: ${teamObject.game.location.address}`
        locationFieldNum.innerText = `Playing on field number: ${teamObject.game.location.field_num}`
        locationFieldType.innerText = `Field Type: ${teamObject.game.location.field_type}`
        vs.innerText = "VS"

        textContainer.append(info, date, time, locationName, locationAddress, locationFieldNum, locationFieldType, rivalName, rivalColor)
        teamInfoMainContainer.append(imageContainer, textContainer)
        imageContainer.append(rivalImage, vs, teamImage)
        

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


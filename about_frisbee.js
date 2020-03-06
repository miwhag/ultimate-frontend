const header = document.querySelector('header')


let headerTitle = document.createElement('h1')
let headerImg = document.createElement('img')

headerImg.src = '/photos/disc.png'
headerImg.className = 'disc-picture'
headerTitle.className = 'header-title'
headerTitle.innerText = "ABOUT FRISBEE"

header.append(headerTitle, headerImg)








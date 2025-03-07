let x = 1

if (localStorage.getItem('ilmoitukset')) {
    ilmoitukset = JSON.parse(localStorage.getItem('ilmoitukset'))
} else {
    ilmoitukset = []
}

for (i = 0; i < ilmoitukset.length; i++) {
    tamaIlmoitus = ilmoitukset[i]
    seina = document.createElement('div')
    seina.setAttribute('id', 'seina')
    ilmoitus = document.createElement('div')
    ilmoitus.setAttribute('id', 'ilmoitus' + i)
    ilmoitus.setAttribute('class', 'ilmoitus')
    ilmoitus.classList.add('col-md-3')
    theNimi = document.createElement('h1')
    theNimi.innerHTML = tamaIlmoitus.nimi
    theKuva = document.createElement('img')
    theKuva.setAttribute('src', './lataus.png')
    theSijainti = document.createElement('div')
    theSijainti.innerHTML = tamaIlmoitus.sijainti
    theTuotekuvaus = document.createElement('div')
    theTuotekuvaus.innerHTML = tamaIlmoitus.kuvaus
    theHinta = document.createElement('div')
    theHinta.innerHTML = tamaIlmoitus.hinta + ' €'
    viestinappi = document.createElement('button')
    viestinappi.setAttribute('onclick', `lahetaViesti(${i})`)
    viestinappi.innerHTML = 'Lähetä viesti'
    ilmoitus.appendChild(theNimi)
    ilmoitus.appendChild(theKuva)
    ilmoitus.appendChild(theSijainti)
    ilmoitus.appendChild(theTuotekuvaus)
    ilmoitus.appendChild(theHinta)
    ilmoitus.appendChild(viestinappi)
    if(x==1){
        row = document.createElement('div')
        row.setAttribute('class', 'row')
    }
    row.appendChild(ilmoitus)
    seina.appendChild(row)
    document.body.appendChild(row)
    x++
    if(x == 4){
        x = 1
    }
}

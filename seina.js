if (localStorage.getItem('ilmoitukset')){
    ilmoitukset = JSON.parse(localStorage.getItem('ilmoitukset'))
}else {
    ilmoitukset = []
}

for (i = 0; i < ilmoitukset.length; i++){
    tamaIlmoitus = ilmoitukset[i]
    ilmoitus = document.createElement('div')
    ilmoitus.setAttribute('id', 'ilmoitus'+i)
    theNimi = document.createElement('h1')
    theNimi.innerHTML = tamaIlmoitus.nimi
    theKuva = document.createElement('img')
    theSijainti = document.createElement('div')
    theSijainti.innerHTML = tamaIlmoitus.sijainti
    theTuotekuvaus = document.createElement('div')
    theTuotekuvaus.innerHTML = tamaIlmoitus.kuvaus
    theHinta = document.createElement('div')
    theHinta.innerHTML = tamaIlmoitus.hinta
    viestinappi = document.createElement('button')
    viestinappi.setAttribute('onclick', 'lahetaviesti()')
    viestinappi.innerHTML = 'Lähetä viesti'
    ilmoitus.appendChild(theNimi)
    ilmoitus.appendChild(theKuva)
    ilmoitus.appendChild(theSijainti)
    ilmoitus.appendChild(theTuotekuvaus)
    ilmoitus.appendChild(theHinta)
    ilmoitus.appendChild(viestinappi)
    document.body.appendChild(ilmoitus)
}
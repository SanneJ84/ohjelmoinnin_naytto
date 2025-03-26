let x = 1
let scr

function naytaKaikki(){
    location.replace('./kirppis.html')
}

function naytaVaatteet(){
    location.replace('./vaatteet.html');
}

function naytaOppikirjat(){
    location.replace('./oppikirjat.html');
}

function naytaMuut(){
    location.replace('./muut.html');
}

if (localStorage.getItem('ilmoitukset')) {
    ilmoitukset = JSON.parse(localStorage.getItem('ilmoitukset'))
} else {
    ilmoitukset = []
}

let laitteet = []
for (i = 0; i < ilmoitukset.length; i++) {
    if (ilmoitukset[i].kategoria == 'laitteet'){
        laitteet.push(ilmoitukset[i])
    }
}
for (i = 0; i < laitteet.length; i++) {
    tamaIlmoitus = laitteet[i]
    seina = document.createElement('div')
    seina.setAttribute('id', 'seina')
    ilmoitus = document.createElement('div')
    ilmoitus.setAttribute('id', 'ilmoitus' + i)
    ilmoitus.setAttribute('class', 'ilmoitus')
    ilmoitus.classList.add('col-md-3')
    theLuoja = document.createElement('div')
    theLuoja.innerHTML = 'Ilmoituksen luoja: ' + tamaIlmoitus.luoja
    theNimi = document.createElement('h1')
    theNimi.innerHTML = tamaIlmoitus.nimi
    theKuva = document.createElement('div')
    
    const img = document.createElement("img");
    img.style.width = "100%";
    img.style.height = "auto";
    img.style.objectFit = "contain";

    if (tamaIlmoitus.kuva && tamaIlmoitus.kuva.startsWith("data:image/")) {
        img.src = tamaIlmoitus.kuva;
    } else {
        img.src = "./lataus.png";
    }
    theKuva.appendChild(img);

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
    ilmoitus.appendChild(theLuoja)
    ilmoitus.appendChild(theSijainti)
    ilmoitus.appendChild(theTuotekuvaus)
    ilmoitus.appendChild(theHinta)
    ilmoitus.appendChild(viestinappi)
    if(x==1){
        row = document.createElement('div')
        row.setAttribute('class', 'row')
    }
    row.appendChild(ilmoitus)
    document.body.appendChild(row)
    x++
    if(x == 4){
        x = 1
    }
}

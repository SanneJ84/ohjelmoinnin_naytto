let x = 1
let scr

if (localStorage.getItem('ilmoitukset')) {
    ilmoitukset = JSON.parse(localStorage.getItem('ilmoitukset'))
} else {
    ilmoitukset = []
}

function naytaVaatteet(){
    location.replace('./vaatteet.html');
}

function naytaLaitteet(){
    location.replace('./laitteet.html');
}

function naytaOppikirjat(){
    location.replace('./oppikirjat.html');
}

function naytaMuut(){
    location.replace('./muut.html');
}

for (i = 0; i < ilmoitukset.length; i++) {
    tamaIlmoitus = ilmoitukset[i]
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

    // Kun käyttäjä on ilmoituksen luoja, näytetään muokkaus- ja poistopainikkeet
    if (tamaIlmoitus.luoja === localStorage.getItem('kirjautunutkayttaja')) {
        const editButton = document.createElement('button');
        editButton.innerHTML = 'Muokkaa';
        editButton.setAttribute('onclick', `muokkaaIlmoitusta(${i})`);
        editButton.classList.add('btn', 'btn-warning', 'mr-2');
        editButton.style.marginRight = '5px';
 
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Poista';
        deleteButton.setAttribute('onclick', `poistaIlmoitus(${i})`);
        deleteButton.classList.add('btn', 'btn-danger');
 
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('mt-2');
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
 
        ilmoitus.appendChild(buttonContainer);
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

    // Muokkaa ilmoitusta
    function muokkaaIlmoitusta(index) {
        const ilmoitus = ilmoitukset[index];
        localStorage.setItem('muokattavaIlmoitus', JSON.stringify({index, ...ilmoitus}));
        location.href = 'muokkaa_ilmoitusta.html';
    }
     
    // Poista ilmoitus
    function poistaIlmoitus(index) {
        if (confirm('Haluatko varmasti poistaa tämän ilmoituksen?')) {
            const poistettuIlmoitus = ilmoitukset[index];
            ilmoitukset.splice(index, 1);
            localStorage.setItem('ilmoitukset', JSON.stringify(ilmoitukset));
     
            poistaIlmoituksenViestikeskustelut(poistettuIlmoitus);
     
            location.reload();
        }
    }

    // Poistetaan ilmoituksen viestiketjut ja uudet viestit kun ilmoitus poistetaan
    function poistaIlmoituksenViestikeskustelut(ilmoitus) {
        const viestit = JSON.parse(localStorage.getItem('viestit')) || {};
        const uudetAvaimetJaViestit = {};
     
        for (const [avain, keskustelu] of Object.entries(viestit)) {
            const [ilmoitusIndex, myyja, ostaja] = avain.split('-');
            if (myyja !== ilmoitus.luoja) {
                uudetAvaimetJaViestit[avain] = keskustelu;
            }
        }
     
        localStorage.setItem('viestit', JSON.stringify(uudetAvaimetJaViestit));
     
        const uudetViestit = JSON.parse(localStorage.getItem('uudetViestit')) || {};
        for (const kayttaja in uudetViestit) {
            uudetViestit[kayttaja] = uudetViestit[kayttaja].filter(viesti => viesti.lähettäjä !== ilmoitus.luoja);
            if (uudetViestit[kayttaja].length === 0) {
                delete uudetViestit[kayttaja];
            }
        }
        localStorage.setItem('uudetViestit', JSON.stringify(uudetViestit));
    }
}



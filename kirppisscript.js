function kirjauduUlos() {
    localStorage.removeItem('kirjautunutkayttaja');
    location.replace('./index.html');
}

function uusiIlmoitus() {
    location.replace('./uusiilmoitus.html');
}

// Näytetään ilmoitukset jos käyttäjä on kirjautunut sisään ja ilmoituksia on olemassa 
function naytaViestit() {
    const kirjautunutKayttaja = localStorage.getItem('kirjautunutkayttaja');
    if (!kirjautunutKayttaja) {
        alert('Kirjaudu ensin sisään nähdäksesi viestit.');
        return;
    }

    const viestit = JSON.parse(localStorage.getItem('viestit')) || {};
    const kayttajanViestiketjut = haeKayttajanViestiketjut(viestit, kirjautunutKayttaja);

    if (kayttajanViestiketjut.length === 0) {
        alert('Sinulla ei ole vielä viestejä.');
        return;
    }

    naytaViestiketjuValinta(kayttajanViestiketjut, kirjautunutKayttaja);
}

// Haetaan käyttäjän viestiketjut
function haeKayttajanViestiketjut(viestit, kirjautunutKayttaja) {
    return Object.keys(viestit).filter(avain =>
        avain.includes(kirjautunutKayttaja)     
    );
}

// Näytetään valintalista viestiketjuista joista käyttäjä voi valita tarkasteltavan viestiketjun
function naytaViestiketjuValinta(kayttajanViestiketjut, kirjautunutKayttaja) {
    let viestiListaus = 'Valitse viestiketjun numero jota haluat tarkastella:\n\n';
    const uudetViestit = JSON.parse(localStorage.getItem('uudetViestit')) || {};
    const kayttajanUudetViestit = uudetViestit[kirjautunutKayttaja] || [];
 
    kayttajanViestiketjut.forEach((ketju, index) => {
        const [ilmoitusIndex, myyjä, ostaja] = ketju.split('-');
        const toinen = myyjä === kirjautunutKayttaja ? ostaja : myyjä;
        const onkoUusiaViesteja = kayttajanUudetViestit.some(viesti => viesti.lähettäjä === toinen);
        const uusiViestiMerkki = onkoUusiaViesteja ? ' (Uusi viesti!)' : '';
        viestiListaus += `${index + 1}. Keskustelu käyttäjän ${toinen} kanssa${uusiViestiMerkki}\n`;
    });
 
    const valinta = prompt(viestiListaus);
    if (valinta && valinta > 0 && valinta <= kayttajanViestiketjut.length) {
        valitseViestiketju(kayttajanViestiketjut, valinta);
    }
}

// Valitaan viestiketju ja siirrytään viestit-sivulle
function valitseViestiketju(kayttajanViestiketjut, valinta) {
    const valittuKetju = kayttajanViestiketjut[valinta - 1];
    localStorage.setItem('aktiivisenKeskustelunAvain', valittuKetju);
    location.href = 'viestit.html';
}

// Lähetetään viesti ilmoituksen tekijälle joka myy tuotetta
function lahetaViesti(ilmoitusIndex) {
    const kirjautunutKayttaja = localStorage.getItem('kirjautunutkayttaja');
    const ilmoitus = ilmoitukset[ilmoitusIndex];

    if (kirjautunutKayttaja === ilmoitus.luoja) {
        alert('Et voi lähettää viestiä omaan ilmoitukseesi');
        return;
    }

    const keskustelunAvain = muodostaKeskustelunAvain(ilmoitusIndex, ilmoitus.luoja, kirjautunutKayttaja, ilmoitus.nimi);
    localStorage.setItem('aktiivisenKeskustelunAvain', keskustelunAvain);
    location.href = 'viestit.html';
}

// Muodostetaan keskustelun avain ilmoituksen indexin, luojan ja kirjautuneen käyttäjän perusteella
function muodostaKeskustelunAvain(ilmoitusIndex, luoja, kirjautunutKayttaja, ilmoitusNimi) {
    return `${ilmoitusIndex}-${luoja}-${kirjautunutKayttaja}-${ilmoitusNimi}`;
}

// Tarkistetaan onko käyttäjällä uusia viestejä ja jos on, näytetään ilmoitus
function tarkistaUudetViestit() {
    const kirjautunutKayttaja = localStorage.getItem('kirjautunutkayttaja');
    const uudetViestit = JSON.parse(localStorage.getItem('uudetViestit')) || {};

    if (uudetViestit[kirjautunutKayttaja]) {
        naytaUudetViestiIlmoitukset(uudetViestit[kirjautunutKayttaja]);
        poistaUudetViestiIlmoitukset(kirjautunutKayttaja, uudetViestit);
    }
}

// Näytetään ilmoitus uusista viesteistä
	function naytaUudetViestiIlmoitukset(uudetViestit) {
    const ilmoitusElementti = document.getElementById('ilmoitusUudestaViestista');
    let ilmoitusTeksti = 'Sinulle on uusia viestejä käyttäjiltä:\n';
 
    // Käytetään Set-tietorakennetta, jotta vältetään useammat ilmoitukset samalta lähettäjältä
    const lisatytLahettajat = new Set();
 
    uudetViestit.forEach(viesti => {
        if (!lisatytLahettajat.has(viesti.lähettäjä)) {
            ilmoitusTeksti += `| ${viesti.lähettäjä}\n`;        
            lisatytLahettajat.add(viesti.lähettäjä);
        }
    });
 
    ilmoitusElementti.textContent = ilmoitusTeksti;
    ilmoitusElementti.style.display = 'inline';
    ilmoitusElementti.style.color = 'orange';
    ilmoitusElementti.style.fontWeight = 'bold';
    ilmoitusElementti.style.fontStyle = 'italic';
}


// Alustetaan sivu kun se ladataan
window.onload = function () {
    tarkistaUudetViestit();
};
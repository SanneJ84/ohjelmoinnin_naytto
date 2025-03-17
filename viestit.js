// Keskustelun toiminnallisuus ja viestien näyttäminen

let aktiivisenKeskustelunAvain;

// Haetaan viestit ja näytetään ne sivulla, jos viesti luettu poistetaan uudet viesti ilmoitus etusivulta
function haeViestitJaNäytä(keskustelunAvain) {
    const viestit = haeViestit(keskustelunAvain);   
    naytaViestit(viestit);
    poistaUudetViestiIlmoitukset(keskustelunAvain);
}

// Haetaan viestit local storagesta annetun keskustelun avaimen perusteella
function haeViestit(keskustelunAvain) {
    const viestit = JSON.parse(localStorage.getItem('viestit')) || {};
    return viestit[keskustelunAvain] || [];
}

// Viestien näyttäminen sivulla
function naytaViestit(keskustelunViestit) {
    const viestiketju = document.getElementById('viestiketju');
    viestiketju.innerHTML = '';

    if (keskustelunViestit.length > 0) {
        viestiketju.style.border = '1px solid black';
    } else {
        viestiketju.style.border = 'hidden';
    }

    keskustelunViestit.forEach(viesti => {
        console.log(`Näytetään viesti: ${viesti.lähettäjä}: ${viesti.sisältö}`);
        const viestiElementti = document.createElement('div');
        viestiElementti.className = 'alert ' + (viesti.lähettäjä === localStorage.getItem('kirjautunutkayttaja') ? 'alert-primary' : 'alert-secondary');
        viestiElementti.style.border = '1px solid black';
        viestiElementti.innerHTML = `<strong>${viesti.lähettäjä}:</strong> ${viesti.sisältö}`;
        viestiketju.appendChild(viestiElementti);
    });

    viestiketju.scrollTop = viestiketju.scrollHeight;
}

// Tallennetaan keskustelun avain local storageen ja siirrytään viestit sivulle
function tallennaKeskustelunAvain(keskustelunAvain) {
    localStorage.setItem('aktiivisenKeskustelunAvain', keskustelunAvain);
    location.href = 'viestit.html';
}

// Alustetaan sivu kun se ladataan 
function alusta() {
    aktiivisenKeskustelunAvain = localStorage.getItem('aktiivisenKeskustelunAvain');
    if (!aktiivisenKeskustelunAvain) {
        naytaVirheJaPalaa('Virhe: Keskustelua ei löydy');
        return;
    }
    haeViestitJaNäytä(aktiivisenKeskustelunAvain);
}

// Näytetään virheilmotus ja palataan etusivulle
function naytaVirheJaPalaa(viesti) {
    alert(viesti);
    console.log(viesti);
    palaaEtusivulle();
}

// Lähetetään uusi viesti
function lahetaUusiViesti() {
    const uusiViestiElementti = document.getElementById('uusiViesti');
    const uusiViesti = uusiViestiElementti.value.trim();

    if (uusiViesti) {
        tallennaViesti(uusiViesti);
        uusiViestiElementti.value = '';
        haeViestitJaNäytä(aktiivisenKeskustelunAvain);
        paivitaUudetViestit(uusiViesti);
    }
}

// Tallennetaan uusi viesti local storageen
function tallennaViesti(uusiViesti) {
    const viestit = JSON.parse(localStorage.getItem('viestit')) || {};
    if (!viestit[aktiivisenKeskustelunAvain]) {
        viestit[aktiivisenKeskustelunAvain] = [];
    }

    const kirjautunutKayttaja = localStorage.getItem('kirjautunutkayttaja');

    viestit[aktiivisenKeskustelunAvain].push({
        lähettäjä: kirjautunutKayttaja,
        sisältö: uusiViesti,
    });

    localStorage.setItem('viestit', JSON.stringify(viestit));
}

// Päivitetään tieto uusista viesteistä
function paivitaUudetViestit(uusiViesti) {
    const [ilmoitusIndex, myyjä, ostaja] = aktiivisenKeskustelunAvain.split('-');
    const vastaanottaja = myyjä === localStorage.getItem('kirjautunutkayttaja') ? ostaja : myyjä;

    const uudetViestit = JSON.parse(localStorage.getItem('uudetViestit')) || {};
    if (!uudetViestit[vastaanottaja]) {
        uudetViestit[vastaanottaja] = [];
    }
    uudetViestit[vastaanottaja].push({
        lähettäjä: localStorage.getItem('kirjautunutkayttaja'),
        sisältö: uusiViesti,
    });
    localStorage.setItem('uudetViestit', JSON.stringify(uudetViestit));
}

// Poistetaan uudet viesti ilmoitukset
function poistaUudetViestiIlmoitukset(keskustelunAvain) {
    const kirjautunutKayttaja = localStorage.getItem('kirjautunutkayttaja');
    const uudetViestit = JSON.parse(localStorage.getItem('uudetViestit')) || {};
 
    if (uudetViestit[kirjautunutKayttaja]) {
        const [ilmoitusIndex, myyjä, ostaja] = keskustelunAvain.split('-');
        const toinen = myyjä === kirjautunutKayttaja ? ostaja : myyjä;
 
        uudetViestit[kirjautunutKayttaja] = uudetViestit[kirjautunutKayttaja].filter(viesti => viesti.lähettäjä !== toinen);
 
        if (uudetViestit[kirjautunutKayttaja].length === 0) {
            delete uudetViestit[kirjautunutKayttaja];
        }
 
        localStorage.setItem('uudetViestit', JSON.stringify(uudetViestit));
    }
}

// Palataan etusivulle ja poistetaan aktiivisen keskustelun avain local storagesta koska keskustelu on päättynyt
function palaaEtusivulle() {
    localStorage.removeItem('aktiivisenKeskustelunAvain');
    location.href = 'kirppis.html';
}

// Alustetaan sivu kun se ladataan
window.onload = alusta;

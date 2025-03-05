function kirjauduUlos() {
    localStorage.removeItem('kirjautunutkayttaja');
    location.replace('./index.html');
}

function uusiIlmoitus() {
    location.replace('./uusiilmoitus.html');
}

function naytaViestit() {
    const kirjautunutKayttaja = localStorage.getItem('kirjautunutkayttaja');
    if (!kirjautunutKayttaja) {
        alert('Kirjaudu ensin sisään nähdäksesi viestit.');
        return;
    }

    const viestit = JSON.parse(localStorage.getItem('viestit')) || {};
    const kayttajanViestiketjut = Object.keys(viestit).filter(avain =>
        avain.includes(kirjautunutKayttaja) 
    );

    if (kayttajanViestiketjut.length === 0) {
        alert('Sinulla ei ole vielä viestejä.');
        return;
    }

    let viestiListaus = 'Valitse viestiketjun numero jota haluat tarkastella:\n\n';
    kayttajanViestiketjut.forEach((ketju, index) => {
        const [ilmoitusIndex, myyjä, ostaja] = ketju.split('-');
        const toinen = myyjä === kirjautunutKayttaja ? ostaja : myyjä; 
        viestiListaus += `${index + 1}. Keskustelu käyttäjän ${toinen} kanssa\n`;
    });

    const valinta = prompt(viestiListaus);                                      
    if (valinta && valinta > 0 && valinta <= kayttajanViestiketjut.length) {
        const valittuKetju = kayttajanViestiketjut[valinta - 1];
        localStorage.setItem('aktiivisenKeskustelunAvain', valittuKetju);
        location.href = 'viestit.html';
    }
}

function lahetaViesti(ilmoitusIndex) {
    const kirjautunutKayttaja = localStorage.getItem('kirjautunutkayttaja');
    const ilmoitus = ilmoitukset[ilmoitusIndex];

    if (kirjautunutKayttaja === ilmoitus.luoja) {
        alert('Et voi lähettää viestiä omaan ilmoitukseesi');
        return;
    }

    const keskustelunAvain = `${ilmoitusIndex}-${ilmoitus.luoja}-${kirjautunutKayttaja}`;

    localStorage.setItem('aktiivisenKeskustelunAvain', keskustelunAvain);

    location.href = 'viestit.html';
}
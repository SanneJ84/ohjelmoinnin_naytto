let aktiivisenKeskustelunAvain; 

function haeViestitJaNäytä(keskustelunAvain) {
    const viestit = JSON.parse(localStorage.getItem('viestit')) || {};
    const keskustelunViestit = viestit[keskustelunAvain] || [];
    console.log(keskustelunViestit);

    const viestiketju = document.getElementById('viestiketju');
    viestiketju.innerHTML = '';

    keskustelunViestit.forEach(viesti => {
        console.log(`Näytetään viesti: ${viesti.lähettäjä}: ${viesti.sisältö}`);
        const viestiElementti = document.createElement('div');
        viestiElementti.className = 'alert ' + (viesti.lähettäjä === localStorage.getItem('kirjautunutkayttaja') ? 'alert-primary' : 'alert-secondary');
        viestiElementti.textContent = `${viesti.lähettäjä}: ${viesti.sisältö}`;
        viestiketju.appendChild(viestiElementti);
    });
}

function tallennaKeskustelunAvain(keskustelunAvain) {
    localStorage.setItem('aktiivisenKeskustelunAvain', keskustelunAvain);
    location.href = 'viestit.html';
}

function alusta() {
    aktiivisenKeskustelunAvain = localStorage.getItem('aktiivisenKeskustelunAvain');
    if (!aktiivisenKeskustelunAvain) {
        alert('Virhe: Keskustelua ei löydy');
        console.log('Virhe: Keskustelua ei löydy');
        palaaKirppikselle();
        return;
    }
    haeViestitJaNäytä(aktiivisenKeskustelunAvain);
}

function lahetaUusiViesti() {
    const uusiViestiElementti = document.getElementById('uusiViesti');
    const uusiViesti = uusiViestiElementti.value.trim();

    if (uusiViesti) {
        const viestit = JSON.parse(localStorage.getItem('viestit')) || {};
        if (!viestit[aktiivisenKeskustelunAvain]) {
            viestit[aktiivisenKeskustelunAvain] = [];
        }

        viestit[aktiivisenKeskustelunAvain].push({
            lähettäjä: localStorage.getItem('kirjautunutkayttaja'),
            sisältö: uusiViesti,
        });

        localStorage.setItem('viestit', JSON.stringify(viestit));   
        uusiViestiElementti.value = '';
        haeViestitJaNäytä(aktiivisenKeskustelunAvain);
        console.log('Viesti lähetetty:', uusiViesti);
    }
}

function palaaEtusivulle() {
    localStorage.removeItem('aktiivisenKeskustelunAvain');
    location.href = 'kirppis.html';
}

window.onload = alusta;


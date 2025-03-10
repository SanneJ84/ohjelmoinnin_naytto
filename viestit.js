let aktiivisenKeskustelunAvain; 

function haeViestitJaNäytä(keskustelunAvain) {
    const viestit = JSON.parse(localStorage.getItem('viestit')) || {};
    const keskustelunViestit = viestit[keskustelunAvain] || [];
    console.log(keskustelunViestit);

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


let ilmoitukset;

function lisaaIlmoitus(){
    if (localStorage.getItem('ilmoitukset')) {
        ilmoitukset = JSON.parse(localStorage.getItem('ilmoitukset'));
    } else {
        ilmoitukset = [];
    }
    let nimi = document.getElementById('nimi').value
    let sijainti = document.getElementById('sijainti').value
    let kuvaus = document.getElementById('kuvaus').value
    let hinta = document.getElementById('hinta').value
    let luoja = localStorage.getItem('kirjautunutkayttaja')
    let kategoria = document.getElementById('kategoria').value
    let uusiIlmoitus = {'luoja': luoja, 'nimi': nimi, 'sijainti': sijainti, 'kuvaus': kuvaus, 'hinta': hinta, 'kategoria': kategoria}
    ilmoitukset.push(uusiIlmoitus)
    localStorage.setItem('ilmoitukset', JSON.stringify(ilmoitukset))
    location.replace('./kirppis.html')
}
// Toiminnallisuus ilmoituksen muokkaamiseen ja poistamiseen

let muokattavaIlmoitus;
var MyApp = {};
 
function upload() {
    // uusiilmoitus.js:stä
}
 
function alusta() {
    muokattavaIlmoitus = JSON.parse(localStorage.getItem('muokattavaIlmoitus'));
    if (!muokattavaIlmoitus) {
        alert('Virhe: Ilmoitusta ei löydy');
        peruuta();
        return;
    }
 
    document.getElementById('nimi').value = muokattavaIlmoitus.nimi;
    document.getElementById('sijainti').value = muokattavaIlmoitus.sijainti;
    document.getElementById('kategoria').value = muokattavaIlmoitus.kategoria;
    document.getElementById('kuvaus').value = muokattavaIlmoitus.kuvaus;
    document.getElementById('hinta').value = muokattavaIlmoitus.hinta;
 
    if (muokattavaIlmoitus.kuva) {
        document.getElementById('nykyinenKuva').src = muokattavaIlmoitus.kuva;
    }
 
    MyApp.tuotekuva = muokattavaIlmoitus.kuva;
}
 
function tallennaMuokkaus() {
    let ilmoitukset = JSON.parse(localStorage.getItem('ilmoitukset'));
    let index = muokattavaIlmoitus.index;
 
    ilmoitukset[index] = {
        ...muokattavaIlmoitus,
        nimi: document.getElementById('nimi').value,
        sijainti: document.getElementById('sijainti').value,
        kategoria: document.getElementById('kategoria').value,
        kuvaus: document.getElementById('kuvaus').value,
        hinta: document.getElementById('hinta').value,
        kuva: MyApp.tuotekuva
    };
 
    localStorage.setItem('ilmoitukset', JSON.stringify(ilmoitukset));
    localStorage.removeItem('muokattavaIlmoitus');
    alert('Ilmoitus päivitetty onnistuneesti!');
    location.replace('./kirppis.html');
}
 
function peruuta() {
    localStorage.removeItem('muokattavaIlmoitus');
    location.replace('./kirppis.html');
}
 
window.onload = alusta;

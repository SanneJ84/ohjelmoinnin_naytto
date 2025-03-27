// Toiminnallisuus ilmoituksen muokkaamiseen ja poistamiseen
 
let muokattavaIlmoitus;
var MyApp = {};
 
function upload() {
    try {
        const fileUploadInput = document.querySelector('.file-uploader');
        const image = fileUploadInput.files[0];
 
        if (!image.type.includes('image')) {
            return alert('Only images are allowed!');
        }
 
        if (image.size > 10_000_000) {
            return alert('Maximum upload size is 10MB!');
        }
 
        const fileReader = new FileReader();
        fileReader.readAsDataURL(image);
 
        fileReader.onload = (fileReaderEvent) => {
            let base64String = fileReaderEvent.target.result;
 
            if (base64String.startsWith("data:image/")) {
                MyApp.tuotekuva = base64String;
            } else {
                MyApp.tuotekuva = './lataus.png'
            }
        };
    }
    catch(err) {
        MyApp.tuotekuva = './lataus.png'
    }
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
 
    if (muokattavaIlmoitus.kuva && muokattavaIlmoitus.kuva !== './lataus.png') {
        document.getElementById('nykyinenKuva').src = muokattavaIlmoitus.kuva;
    } else {
        document.getElementById('nykyinenKuva').src = './lataus.png';
    }
 
    MyApp.tuotekuva = muokattavaIlmoitus.kuva;
}
 
function tallennaMuokkaus() {
    try {
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
    } catch(err) {
        alert('Virhe tallennettaessa muokattua ilmoitusta. Yritä uudelleen.');
        console.error('Virhe tallennettaessa:', err);
    }
}
 
function peruuta() {
    localStorage.removeItem('muokattavaIlmoitus');
    location.replace('./kirppis.html');
}
 
window.onload = alusta;
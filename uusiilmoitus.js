let ilmoitukset;
var MyApp = {};

function upload() {
    try{
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
    catch(err){
        MyApp.tuotekuva = './lataus.png'
    }
}


function lisaaIlmoitus(){
    try{
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
        let kuva = MyApp.tuotekuva
        let uusiIlmoitus = {'luoja': luoja, 'nimi': nimi, 'sijainti': sijainti, 'kuvaus': kuvaus, 'hinta': hinta, 'kategoria': kategoria, 'kuva': kuva}
        ilmoitukset.push(uusiIlmoitus)
        localStorage.setItem('ilmoitukset', JSON.stringify(ilmoitukset))
        location.replace('./kirppis.html')
    }
    catch(err){
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
        let kuva = './lataus.png'
        let uusiIlmoitus = {'luoja': luoja, 'nimi': nimi, 'sijainti': sijainti, 'kuvaus': kuvaus, 'hinta': hinta, 'kategoria': kategoria, 'kuva': kuva}
        ilmoitukset.push(uusiIlmoitus)
        localStorage.setItem('ilmoitukset', JSON.stringify(ilmoitukset))
        location.replace('./kirppis.html')
    }
}

function peruuta(){
    location.replace('./kirppis.html')
}
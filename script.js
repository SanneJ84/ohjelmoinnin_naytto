//javascript kirjautumiseen

let kayttajanimi
let salasana
let kayttajanimi2
let salasana2
let admin
let valid
let kayttaja = {}
let kayttajat;

function kirjaudu(){
    kayttajat = JSON.parse(localStorage.getItem('users'))
    kayttajanimi2 = document.getElementById('username2').value
    salasana2 = document.getElementById('password2').value
    for (let i = 0; i < kayttajat.length; i++){
        if (kayttajanimi2 === kayttajat[i]['username'] && salasana2 === kayttajat[i]['password']){
            localStorage.setItem('username', kayttajanimi2)
                location.replace("./kirppis.html")
                break
        }
        if(i+1 === kayttajat.length){
            alert('kirjautuminen epäonnistui')
        }
    }
}

function tallennaTiedot(){
    if (localStorage.getItem('kayttajat')) {
        kayttajat = JSON.parse(localStorage.getItem('kayttajat'));
    } else {
        kayttajat = [];
    }
    kayttajanimi = document.getElementById('username1').value
    salasana = document.getElementById('password1').value
    kayttaja = {'username': kayttajanimi, 'password': salasana}
    if(salasana.length === 0 || kayttajanimi.length === 0){
        valid = false
        alert('kirjoita salasana')
        
    }
    if(kayttajat.length > 0){
        for (let i = 0; i < kayttajat.length; i++){
            if (kayttajanimi === kayttajat[i]['username']){
                alert('käyttäjänimi varattu')
                break
            }
            if(i+1 === kayttajat.length){
                kayttajat.push(kayttaja)
                localStorage.setItem('kayttajat', JSON.stringify(kayttajat))
                break
            }
        }
    }else{
        kayttajat.push(kayttaja)
        localStorage.setItem('kayttajat', JSON.stringify(kayttajat))
    }
}

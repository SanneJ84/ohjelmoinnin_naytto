let ilmoitusPoistettava = null; // Aktiivinen poistettava ilmoitus
let ilmoitusMuokattava = null;   // Aktiivinen muokattava ilmoitus

document.addEventListener("DOMContentLoaded", function () {
    const ilmoituksetContainer = document.getElementById("listings");

    // Haetaan localStoragesta tallennetut ilmoitukset
    const ilmoitukset = JSON.parse(localStorage.getItem("ilmoitukset")) || [];
    
    // Luo HTML-ilmoitukset
    ilmoitukset.forEach((ilmoitus) => {
        const ilmoitusElementti = document.createElement("div");
        ilmoitusElementti.className = "listing d-flex flex-column justify-content-center";
        ilmoitusElementti.innerHTML = `
            <h3>${ilmoitus.nimi}</h3>
            <p>${ilmoitus.kuvaus}</p>
            <button class="btn btn-warning" onclick="muokkaaIlmoitus(${ilmoitus.id})">Muokkaa</button>
            <button class="btn btn-danger" data-bs-whatever="${ilmoitus.nimi}" onclick="poistaIlmoitus(this)">Poista</button>
        `;
        ilmoituksetContainer.appendChild(ilmoitusElementti);
    });

    // Kuunnellaan modalin "Poista"-painiketta
    document.getElementById("confirmDeleteButton").addEventListener("click", function () {
        if (!ilmoitusPoistettava) return;

        // Haetaan ilmoitukset localStoragesta
        const ilmoitukset = JSON.parse(localStorage.getItem("ilmoitukset")) || [];

        // Suodatetaan pois poistettava ilmoitus
        const paivitetytIlmoitukset = ilmoitukset.filter(ilmoitus => ilmoitus.id !== ilmoitusPoistettava.id);

        // Päivitetään localStorage
        localStorage.setItem("ilmoitukset", JSON.stringify(paivitetytIlmoitukset));

        // Poistetaan ilmoitus DOM:sta
        ilmoitusPoistettava.element.remove();

        // Näytetään onnistumisilmoitus
        naytaIlmoitus("Ilmoitus on poistettu onnistuneesti!", "success");

        // Tyhjennetään aktiivinen poistettava ilmoitus
        ilmoitusPoistettava = null;

        // Suljetaan modaali
        piilotaModal('confirmationModal');
    });
});

// Funktio, joka avaa vahvistusmodaalin
function poistaIlmoitus(nappi) {
    // Poistettavan ilmoituksen elementti ja id
    const ilmoituksenOtsikko = nappi.getAttribute("data-bs-whatever");
    const ilmoitukset = JSON.parse(localStorage.getItem("ilmoitukset")) || [];
    ilmoitusPoistettava = ilmoitukset.find(ilmoitus => ilmoitus.nimi === ilmoituksenOtsikko);
    ilmoitusPoistettava.element = nappi.closest(".listing");

    // Avataan vahvistusmodaali
    const vahvistusModal = new bootstrap.Modal(document.getElementById("confirmationModal"));
    const poistettavaIlmoitus = document.getElementById('item-to-delete');
    poistettavaIlmoitus.innerText = ilmoitusPoistettava.nimi;
    vahvistusModal.show();
}

// Funktio, joka avaa ilmoituksen muokkauslomakkeen
function muokkaaIlmoitus(id) {
    const ilmoitukset = JSON.parse(localStorage.getItem("ilmoitukset")) || [];
    ilmoitusMuokattava = ilmoitukset.find(ilmoitus => ilmoitus.id === id);

    // Esitä ilmoituksen tiedot lomakkeessa (voit tehdä muokkauslomakkeen HTML:n ja JavaScriptin avulla)
    const muokkausLomake = `
        <form id="editForm">
            <label for="editTitle">Otsikko</label>
            <input type="text" id="editTitle" value="${ilmoitusMuokattava.nimi}">
            <label for="editDescription">Kuvaus</label>
            <textarea id="editDescription">${ilmoitusMuokattava.kuvaus}</textarea>
            <button type="submit" class="btn btn-primary">Tallenna muutokset</button>
        </form>
    `;

    const lomakeContainer = document.getElementById('formContainer');
    lomakeContainer.innerHTML = muokkausLomake;

    document.getElementById('editForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Päivitä ilmoitus
        ilmoitusMuokattava.nimi = document.getElementById('editTitle').value;
        ilmoitusMuokattava.kuvaus = document.getElementById('editDescription').value;

        // Päivitä localStorage
        const paivitetytIlmoitukset = ilmoitukset.map(ilmoitus => ilmoitus.id === ilmoitusMuokattava.id ? ilmoitusMuokattava : ilmoitus);
        localStorage.setItem('ilmoitukset', JSON.stringify(paivitetytIlmoitukset));

        // Näytä onnistumisviesti ja päivitä DOM
        naytaIlmoitus("Ilmoitus päivitettiin onnistuneesti!", "success");

        // Tyhjennä muokkauslomake
        lomakeContainer.innerHTML = '';
        location.reload();  // Voit myös halutessasi päivittää suoraan DOM:iin ilman sivun latausta
    });
}

// Funktio onnistumisviestin näyttämiseen
function naytaIlmoitus(viesti, tyyppi) {
    const ilmoitusMsg = document.createElement("div");
    ilmoitusMsg.className = `alert alert-${tyyppi}`;
    ilmoitusMsg.textContent = viesti;
    document.body.appendChild(ilmoitusMsg);
    setTimeout(() => ilmoitusMsg.remove(), 3000); // Poistetaan viesti 3 sekunnin kuluttua
}

// Funktio modaalin sulkemiseen
function piilotaModal(modalId) {
    const modal = document.getElementById(modalId);
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
}

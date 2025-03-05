function kirjauduUlos(){
    localStorage.removeItem('kirjautunutkayttaja')
    location.replace('./index.html')
}

function uusiIlmoitus(){
    location.replace('./uusiilmoitus.html')
}
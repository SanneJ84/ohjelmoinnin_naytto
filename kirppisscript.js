function kirjauduUlos(){
    localStorage.removeItem('kirjautunutkayttaja')
    location.replace('./index.html')
}
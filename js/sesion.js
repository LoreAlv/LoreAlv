const langsBrowser = navigator.languages;
const idiomesWeb = ["en", "ca", "es"];
let idiomaDefecto = 'en'
let idioma = "en";

function obtenerIdiomaInicial() {
    const idi = localStorage.getItem("idioma");
    if (idi) {
        //hay idioma guardado nos quedamos con ese
        idioma = idi;
        localStorage.setItem("idioma", idioma)
    }
    else {
        for (let i = 0; i < langsBrowser.length; i++){
            let idi = langsBrowser[i];
            idioma = idiomesWeb.find(idioma  => idioma == idi)
        });
    }
    if (!idioma)
    {
                localStorage.setItem("idioma", idiomaDefecto)
    }

}

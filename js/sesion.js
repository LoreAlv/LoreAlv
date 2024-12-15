const langsBrowser = navigator.languages;
const idiomesWeb = ["en", "ca", "es"];
let idiomaDefecto = "en";
let idioma = "en";

function obtenerIdioma() {
    const idi = localStorage.getItem("idioma");

    if (idi) {
        //hay idioma guardado nos quedamos con ese
        idioma = idi;
        // localStorage.setItem("idioma", idioma)
    } else {
        //no hay idioma guardado, miramos los preferidos
        for (let i = 0; i < langsBrowser.length; i++) {
            let idi = langsBrowser[i];
            idioma = idiomesWeb.find((id) => id == idi);
            if (idioma) {
                break;
            }
        }
    }

    if (!idioma) {
        idioma = idiomaDefecto;
    }
    localStorage.setItem("idioma", idioma);
    return idioma;
}

function cambiarIdioma(params) {
    localStorage.setItem("idioma", params);
}

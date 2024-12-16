const langsBrowser = navigator.languages;
const idiomesWeb = ["en", "ca", "es"];
const idiomaDefecto = "en";
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
    location.replace(".\\" + idioma + "\\index.html");
    return idioma;
}

function cambiarIdioma(params) {
    localStorage.setItem("idioma", params);
    location.reload();
}

const paginaDefecto = "#menuHome";
let pagina = paginaDefecto;
function obtenerPagina() {
    const pag = localStorage.getItem("page");
    if (pag) {
        //hay pagina  guardada
        pagina = pag;
    }
    localStorage.setItem("page", pagina);
}

function cambiarPagina(params) {
    localStorage.setItem("page", param);
}

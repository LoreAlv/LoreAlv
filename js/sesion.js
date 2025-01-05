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
    //    location.replace(".\\" + idioma + "\\index.html");
    return idioma;
}

function cambiarIdioma(params) {
    localStorage.setItem("idioma", params);
    // location.reload();
    renderPage(params);
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

async function loadTexts() {
    const response = await fetch("./js/textos.json");
    return response.json();
}

async function renderPage(lang) {
    const texts = await loadTexts();

    document.getElementsByTagName("title").innerHTML = texts[lang].title;

    document.title = texts[lang].title;
    document.documentElement.lang = lang;

    document.getElementById("menuQui").innerHTML = texts[lang].menuQui;
    document.getElementById("menuConeixements").innerHTML = texts[lang].menuConeixements;
    document.getElementById("menuProjectes").innerHTML = texts[lang].menuProjectes;
    document.getElementById("menuContacte").innerHTML = texts[lang].menuContacte;
    document.getElementById("menuIdioma").innerHTML = texts[lang].menuIdioma;

    document.getElementById("presentacioPortada").innerHTML = texts[lang].presentacioPortada;

    document.getElementById("titolQui").innerHTML = texts[lang].titolQui;
    document.getElementById("textQui").innerHTML = texts[lang].textQui;

    document.getElementById("titolContacte").innerHTML = texts[lang].titolContacte;
    document.getElementById("text1Contacte").innerHTML = texts[lang].text1Contacte;
    document.getElementById("text2Contacte").innerHTML = texts[lang].text2Contacte;
    document.getElementById("text3Contacte").innerHTML = texts[lang].text3Contacte;
    document.getElementById("emailContacte").innerHTML = texts[lang].emailContacte;
    document.getElementById("linkedinContacte").innerHTML = texts[lang].linkedinContacte;

    document.getElementById("titolConeixements").innerHTML = texts[lang].titolConeixements;
    document.getElementById("textPrincipalConeixements").innerHTML = texts[lang].textPrincipalConeixements;
    document.getElementById("textLateralConeixements").innerHTML = texts[lang].textLateralConeixements;
    document.getElementById("botoConeixments").innerHTML = texts[lang].botoConeixments;
    document.getElementById("htmlConeixements").innerHTML = texts[lang].htmlConeixements;
    document.getElementById("cssConeixements").innerHTML = texts[lang].cssConeixements;
    document.getElementById("jsConeixements").innerHTML = texts[lang].jsConeixements;
    document.getElementById("reactConeixements").innerHTML = texts[lang].reactConeixements;

    document.getElementById("titolProjectes").innerHTML = texts[lang].titolProjectes;
    document.getElementById("textProjectes").innerHTML = texts[lang].textProjectes;
    document.querySelectorAll(".botoProjectes").forEach((button) => (button.textContent = texts[lang].botoProjectes));
    document.getElementById("textProjecte1").innerHTML = texts[lang].textProjecte1;
    document.getElementById("textProjecte2").innerHTML = texts[lang].textProjecte2;
    document.getElementById("textProjecte3").innerHTML = texts[lang].textProjecte3;

    document.getElementById("menuIdioma").innerHTML = texts[lang].menuIdioma;
    document.getElementById("menuIdioma").innerHTML = texts[lang].menuIdioma;
    document.getElementById("menuIdioma").innerHTML = texts[lang].menuIdioma;
}

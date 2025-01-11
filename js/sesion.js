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
    marcarIdioma(idioma, true);
    //    location.replace(".\\" + idioma + "\\index.html");
    return idioma;
}

function cambiarIdioma(params) {
    localStorage.setItem("idioma", params);
    // location.reload();
    renderPage(params);
    marcarIdioma(params, false);
}

function marcarIdioma(language, inicial) {
    if (!inicial) {
        document.querySelector(".idiomacheck").remove();
        document.querySelectorAll(".idioma").forEach((idioma) => {
            idioma.classList.remove("active");
            idioma.classList.remove("disabled");
            idioma.classList.remove("text-bg-primary");
            idioma.setAttribute("aria-disabled", "false");
        });
    }
    const idiomaActual = document.querySelector("." + language);

    idiomaActual.classList.add("active");
    idiomaActual.classList.add("disabled");
    idiomaActual.classList.add("text-bg-primary");
    idiomaActual.setAttribute("aria-disabled", "true");
    document.querySelector("#menuIdioma").innerHTML = idiomaActual.innerHTML;
    idiomaActual.innerHTML = idiomaActual.innerHTML + ' <i class="bi bi-check idiomacheck"></i>';
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
    document.querySelectorAll(".botoProjectes").forEach((button) => (button.textContent = texts[lang].botoProjectes));

    for (const key in texts[lang]) {
        ponTexto(key, texts[lang][key]);
    }
}

const ponTexto = (id, texto) => {
    if (document.getElementById(id)) document.getElementById(id).innerHTML = texto;
};

const temaDefecto = "light";
let tema = "light";

function cambiarTema(params) {
    let currentTheme = params;
    if (params == "light") {
        document.documentElement.setAttribute("data-bs-theme", "light");
        localStorage.setItem("tema", "light");
        document.getElementById("menuTema").innerHTML = '<i class="bi bi-sun-fill"></i>';
    } else if (params == "auto") {
        //dependiendo del dispositivo
        document.documentElement.setAttribute("data-bs-theme", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        localStorage.setItem("tema", "auto");
        document.getElementById("menuTema").innerHTML = '<i class="bi bi-circle-half"></i>';
    } else {
        document.documentElement.setAttribute("data-bs-theme", "dark");
        localStorage.setItem("tema", "dark");
        document.getElementById("menuTema").innerHTML = '<i class="bi bi-moon-fill"></i>';
    }

    //ahora actualizamos el boton
}

function obtenerTema() {
    const temaGuardado = localStorage.getItem("tema");
    if (temaGuardado) {
        cambiarTema(temaGuardado);
    } else {
        cambiarTema(temaDefecto);
    }
}

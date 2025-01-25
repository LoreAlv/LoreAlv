let textos, cursos;
async function loadFitxer(nomFitxer) {
    const response = await fetch(nomFitxer);
    return response.json();
}

async function renderPageCursos(lang) {
    cursos = await loadFitxer("./js/courses.json");
    textos = await loadFitxer("./js/textos.json");

    if (document.getElementById("cursosContainer")) document.getElementById("cursosContainer").innerHTML = "";
    const filtre = document.querySelectorAll("#filtreCursos button");
    filtre.forEach((element) => {
        element.innerHTML =
            element.innerHTML + '<span style="z-index:99" class="position-absolute top-0 start-100 translate-middle badge rounded-pill  bg-warning text-black-50">0</span>';
    });
    cursos.sort(compareFn);
    cursos.forEach((element) => {
        ponCurso(element, lang);
        let numCursos = document.querySelector(`#curs${element.tema} span`);
        numCursos.innerHTML = parseInt(numCursos.innerHTML) + 1;
    });
}

const compareFn = (a, b) => {
    let aux = a.finalizado.split("/");
    let dateA = new Date(aux[2], aux[1] - 1, aux[0]);
    aux = b.finalizado.split("/");
    let dateB = new Date(aux[2], aux[1] - 1, aux[0]);
    if (dateA < dateB) {
        return 1;
    }
    if (dateA > dateB) {
        return -1;
    }
    return 0;
};

const ponCurso = (curs, lang) => {
    let div = `                    
                    <div class="col tema${curs.tema}">
                        <div class="card flip-card">
                            <div class="flip-card-inner card shadow border border-primary-subtle bg-primary-subtle">
                                <div class="flip-card-front d-flex align-items-center">
                                    <div class="card-body ">
                                        <h3 class="card-title text-center align-middle">${curs.nombreCorto}</h3>
                                        <h4 class="card-text lh-base fw-light fs-5 align-middle">${textos[lang]["deCursos"]} ${curs.instructor}</h4>
                                    </div>
                                </div>
                                <div class="flip-card-back card d-flex align-items-center">
                                    <div class="card-body w-100">
                                        <p class="card-text fw-light fs-6 mb-2 text-body-secondary text-start textCurs">
                                            ${curs.nombre}</p>
                                        <p class="card-text fw-light fs-6 mb-2 text-body-secondary text-start textCurs">
                                            ${textos[lang]["deCursos"]} ${curs.instructor}</p>
                                        <p class="card-text fw-light fs-6 mb-2 text-body-secondary text-start textCurs">
                                            ${curs.horas} ${textos[lang]["horasCursos"]} </p>
                                        <p class="card-text fw-light fs-6 mb-2 text-body-secondary text-start textCurs">
                                            ${textos[lang]["finalitzatCursos"]}:  ${curs.finalizado}</p>
                                    </div>
                                    <div class="card-footer w-100">
                                        <div class="btn-group">
                                            <a class="btn btn-sm btn-outline-primary lh-base fw-light fs-7  text-body-subtle-primary botoCursos"
                                                href="${curs.certificado}"
                                                target="_blank">${textos[lang]["certificatCursos"]}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;

    if (document.getElementById("cursosContainer")) document.getElementById("cursosContainer").innerHTML += div;
};

function applyFilters() {
    const cards = document.querySelectorAll("#cursosContainer .col");

    cards.forEach((card) => {
        // Mostra o amaga segons si compleix tots els filtres actius
        const matches = Array.from(activeFilters).some((filter) => card.classList.contains(filter));

        card.style.display = matches || activeFilters.size === 0 ? "" : "none";
    });
}

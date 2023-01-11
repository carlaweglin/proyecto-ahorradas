//funciones
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


//variables

let vista_balance = $('#vista-balance');
let vista_categorias = $('#vista-categorias');
let vista_reportes = $('#vista-reportes');
let btn_vista_balance = $('#btn-vista-balance');
let btn_vista_categorias = $('#btn-vista-categorias');
let btn_vista_reportes = $('#btn-vista-reportes');
let btn_oculta_filtros = $('#oculta-filtros');
let conteiner_filtros = $('#conteiner-filtros');



//eventos

//------------ botones vistas---------------//

btn_vista_categorias.addEventListener("click", () => {
    vista_balance.classList.add("is-hidden");
    vista_reportes.classList.add("is-hidden");
    vista_categorias.classList.remove("is-hidden");
});

btn_vista_reportes.addEventListener("click", () => {
    vista_balance.classList.add("is-hidden");
    vista_categorias.classList.add("is-hidden");
    vista_reportes.classList.remove("is-hidden");
});

btn_vista_balance.addEventListener("click", () => {
    vista_reportes.classList.add("is-hidden");
    vista_categorias.classList.add("is-hidden");
    vista_balance.classList.remove("is-hidden");
});

btn_oculta_filtros.addEventListener("click", () => {
    conteiner_filtros.classList.toggle("is-hidden");
});


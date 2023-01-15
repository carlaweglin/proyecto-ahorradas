//funciones
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const generaVistaOperaciones = (operacion_confirmada) => {
    $contenedor_operaciones.innerHTML = "";
    for (const operacion of operacion_confirmada) {
        $vista_sin_operaciones.classList.add("is-hidden");
        seccion_agregar_operacion.classList.add("is-hidden");
        vista_balance.classList.remove("is-hidden");
        $vista_con_operaciones.classList.remove("is-hidden");
        $contenedor_operaciones.innerHTML += `
        <div class="columns">
                <div class="column has-text-weight-semibold">${operacion.descripcion}</div>
                <div class="column has-text-weight-semibold">${operacion.categoria}</div>
                <div class="column has-text-weight-semibold">${operacion.fecha}</div>
                <div class="column has-text-weight-semibold">$ ${operacion.monto}</div>
                <div class="column has-text-weight-semibold"><a class="tag is-info is-light btn-editar-categoria">Editar</a>
                <a class="tag is-info is-light">Eliminar</a></div>
              </div>
        `

    }
}


//variables

let vista_balance = $('#vista-balance');
let vista_categorias = $('#vista-categorias');
let vista_reportes = $('#vista-reportes');
let btn_vista_balance = $('#btn-vista-balance');
let btn_vista_categorias = $('#btn-vista-categorias');
let btn_vista_reportes = $('#btn-vista-reportes');
let btn_oculta_filtros = $('#oculta-filtros');
let conteiner_filtros = $('#conteiner-filtros');
let btn_nueva_operacion = $('#btn-nueva-operacion');
let seccion_agregar_operacion = $('#seccion-agregar-operacion');
let btn_cancelar_operacion = $('#btn-cancelar-operacion');
//elementos para editar categorias, vista y botones ?
//let $seccion_editar_categoria = $('#editar-categoria');
//let $$btn_editar_categoria = $$('.btn-editar-categoria');
let $input_operacion_descripcion = $('#input-operacion-descripcion');
let $input_operacion_monto = $('#input-operacion-monto');
let $input_operacion_tipo = $('#input-operacion-tipo');
let $input_operacion_categoria = $('#input-operacion-categoria');
let $input_fecha_operacion = $('#input-fecha-operacion');
let $btn_confirmar_operacion = $('#btn-confirmar-operacion');
let $vista_sin_operaciones = $('#vista-sin-operaciones');
let $contenedor_vista_operaciones = $('#contenedor-vista-operaciones');
let $vista_con_operaciones = $('#vista-con-operaciones');
let $contenedor_operaciones = $('#contenedor-operaciones');
let operacion_a_confirmar = {
    descripcion: "",
    monto: 0,
    tipo: "",
    categoria: "",
    fecha: ""
};
let datosEnLocalstorage = JSON.parse(localStorage.getItem('operaciones_confirmadas'));
let operacion_confirmada = datosEnLocalstorage ? datosEnLocalstorage : [];


//eventos

//------------ botones vistas---------------//

btn_vista_categorias.addEventListener("click", () => {
    vista_balance.classList.add("is-hidden");
    vista_reportes.classList.add("is-hidden");
    seccion_agregar_operacion.classList.add("is-hidden");
    vista_categorias.classList.remove("is-hidden");
});

btn_vista_reportes.addEventListener("click", () => {
    vista_balance.classList.add("is-hidden");
    vista_categorias.classList.add("is-hidden");
    seccion_agregar_operacion.classList.add("is-hidden");
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

btn_nueva_operacion.addEventListener("click", () => {
    vista_balance.classList.add("is-hidden");
    seccion_agregar_operacion.classList.remove("is-hidden");
});

btn_cancelar_operacion.addEventListener("click", () => {
    vista_balance.classList.remove("is-hidden");
    seccion_agregar_operacion.classList.add("is-hidden");
});

$btn_confirmar_operacion.addEventListener("click", () => {
    let ingresarOperacion = { ...operacion_a_confirmar };
    ingresarOperacion.descripcion = $input_operacion_descripcion.value;
    ingresarOperacion.monto = Number($input_operacion_monto.value);
    ingresarOperacion.tipo = $input_operacion_tipo.value;
    ingresarOperacion.categoria = $input_operacion_categoria.value;
    ingresarOperacion.fecha = $input_fecha_operacion.value;
    console.log('funciona');
    operacion_confirmada.push(ingresarOperacion);
    localStorage.setItem('operaciones_confirmadas', JSON.stringify(operacion_confirmada));

    generaVistaOperaciones(operacion_confirmada);
});

generaVistaOperaciones(operacion_confirmada);


//----------------------------------------FUNCIONES---------------------------------------------//
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function eliminarOperacion(id) {

    let operacionConfirmadaAux = operacion_confirmada.filter((operacion) => operacion.id !== id)
    operacion_confirmada = operacionConfirmadaAux;
    localStorage.setItem('operaciones_confirmadas', JSON.stringify(operacion_confirmada));
    generaVistaOperaciones(operacion_confirmada)
    generaTotalesBalance(operacion_confirmada)
    operacion_confirmada = [] && $vista_sin_operaciones.classList.remove("is-hidden") &
        $vista_con_operaciones.classList.add("is-hidden");

}

function editarOperacion(id) {
    vista_balance.classList.add("is-hidden");
    $seccion_editar_operacion.classList.remove("is-hidden");
    let operacionParaEditar = operacion_confirmada.find((op) => op.id === id);
    console.log(operacionParaEditar);
    $input_operacion_editar_descripcion.value = operacionParaEditar.descripcion;
    $input_operacion_editar_categoria.value = operacionParaEditar.categoria;
    $input_operacion_editar_tipo.value = operacionParaEditar.tipo;
    $input_operacion_editar_monto.value = operacionParaEditar.monto;
    $input_fecha_editar_operacion.value = operacionParaEditar.fecha;
    $btn_editar_operacion.addEventListener("click", () => {
        let nuevoObjeto = {
            descripcion: $input_operacion_editar_descripcion.value,
            monto: Number($input_operacion_editar_monto.value),
            tipo: $input_operacion_editar_tipo.value,
            categoria: $input_operacion_editar_categoria.value,
            fecha: $input_fecha_editar_operacion.value,
            id: id

        }
        let index = operacion_confirmada.findIndex((operacion) => operacion.id === id);
        operacion_confirmada[index] = nuevoObjeto;
        localStorage.setItem('operaciones_confirmadas', JSON.stringify(operacion_confirmada));
        generaVistaOperaciones(operacion_confirmada);
        generaTotalesBalance(operacion_confirmada);
        vista_balance.classList.remove("is-hidden");
        $seccion_editar_operacion.classList.add("is-hidden");
    })
}

// generar operacion //
const generaVistaOperaciones = (operacion_confirmada) => {
    $contenedor_operaciones.innerHTML = "";
    for (const operacion of operacion_confirmada) {
        $vista_sin_operaciones.classList.add("is-hidden");
        seccion_agregar_operacion.classList.add("is-hidden");
        vista_balance.classList.remove("is-hidden");
        $vista_con_operaciones.classList.remove("is-hidden");
        $contenedor_operaciones.innerHTML += `
        <div class="columns" id="${operacion.id}">
                <div class="column has-text-weight-semibold">${operacion.descripcion}</div>
                <div class="column has-text-weight-semibold">${operacion.categoria}</div>
                <div class="column has-text-weight-semibold">${operacion.fecha}</div>
                <div class="column has-text-weight-semibold">$ ${operacion.monto}</div>
                <div class="column has-text-weight-semibold"><a class="tag is-info is-light" onClick='editarOperacion("${operacion.id}")'>Editar</a>
                <a class="tag is-info is-light" onClick='eliminarOperacion("${operacion.id}")'>Eliminar</a></div>
              </div>
        `

    }
}
// ganancia, gasto y total en vista balance // 
const generaTotalesBalance = (operacion_confirmada) => {
    let gasto = 0
    let ganancia = 0
    if (operacion_confirmada.length === 0) {
        $balance_ganancias.innerText = '+$0'
        $balance_gastos.innerText = '-$0'
        $total_balance.innerText = '+$0'
    }
    for (const operacion of operacion_confirmada) {
        if (operacion.tipo === 'ganancia') {
            ganancia = ganancia + operacion.monto
        } else {
            gasto = gasto + operacion.monto
        }
        console.log("gasto:", gasto);
        let total = ganancia - gasto
        $balance_ganancias.innerText = `+$${ganancia}`
        $balance_gastos.innerText = `-$${gasto}`
        $total_balance.innerText = `$${total}`
    }

}

const crearCategorias = (nombreCategoria) => {
    return { id: self.crypto.randomUUID(), nombre: nombreCategoria }
}

const inicializarCategorias = () => {
    const categorias = [
        'Comida',
        'Servicios',
        'Salidas',
        'Educación',
        'Transporte',
        'Trabajo',
    ]
    let categoriasAux = categorias.map((categoria) => crearCategorias(categoria))
    localStorage.setItem('categorias_confirmadas', JSON.stringify(categoriasAux));
    return categoriasAux

}
inicializarCategorias();

const crearVistaCategorias = (categorias) => {
    $contenedor_categorias.innerHTML = "";
    for (const categoria of categorias) {
        $contenedor_categorias.innerHTML += `
        <div class="field is-grouped is-grouped-multiline">
        <div class="control">
            <div class="tags has-addons" id=${categoria.id}>
                <span class="tag is-primary is-light is-fullwidth">${categoria.nombre}</span>
                <a class="tag is-info is-light btn-editar-categoria">Editar</a>
                <a class="tag is-info is-light btn-eliminar-categoria">Eliminar</a>
            </div>
        </div>
    </div>`
    }


    /*<div class="field is-grouped is-grouped-multiline">
        <div class="control">
            <div class="tags has-addons">
                <span class="tag is-primary is-light is-fullwidth">Comida</span>
                <a class="tag is-info is-light btn-editar-categoria">Editar</a>
                <a class="tag is-info is-light">Eliminar</a>
            </div>
        </div>
    </div>*/
}

//---------------------------------------VARIABLES-----------------------------------------------//

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
let $balance_ganancias = $('#balance-ganancias');
let $balance_gastos = $('#balance-gastos');
let $total_balance = $('#total-balance');
let operacion_a_confirmar = {
    descripcion: "",
    monto: 0,
    tipo: "",
    categoria: "",
    fecha: "",
    id: ""
};
let datosEnLocalstorage = JSON.parse(localStorage.getItem('operaciones_confirmadas'));
let operacion_confirmada = datosEnLocalstorage ? datosEnLocalstorage : [];
let categoriasEnLocal = JSON.parse(localStorage.getItem('categorias_confirmadas'));
let categorias = categoriasEnLocal;
let $input_operacion_editar_descripcion = $('#input-operacion-editar-descripcion');
let $input_operacion_editar_monto = $('#input-operacion-editar-monto');
let $input_operacion_editar_tipo = $('#input-operacion-editar-tipo');
let $input_operacion_editar_categoria = $('#input-operacion-editar-categoria');
let $input_fecha_editar_operacion = $('#input-fecha-editar-operacion');
let $btn_cancelar_edicion_operacion = $('#btn-cancelar-edicion-operacion');
let $btn_editar_operacion = $('#btn-editar-operacion');
let $seccion_editar_operacion = $('#seccion-editar-operacion');
let $contenedor_categorias = $('#contenedor-categorias');

//llamar inicializaCategorias

//------------------------------------------------EVENTOS-------------------------------------------//

// botones vistas//

btn_vista_categorias.addEventListener("click", () => {
    vista_balance.classList.add("is-hidden");
    vista_reportes.classList.add("is-hidden");
    seccion_agregar_operacion.classList.add("is-hidden");
    vista_categorias.classList.remove("is-hidden");
    //agregar genera vista editar categorias
    crearVistaCategorias(categorias);
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

// agregar operaciones //

$btn_confirmar_operacion.addEventListener("click", () => {
    let ingresarOperacion = { ...operacion_a_confirmar };
    ingresarOperacion.descripcion = $input_operacion_descripcion.value;
    ingresarOperacion.monto = Number($input_operacion_monto.value);
    ingresarOperacion.tipo = $input_operacion_tipo.value;
    ingresarOperacion.categoria = $input_operacion_categoria.value;
    ingresarOperacion.fecha = $input_fecha_operacion.value;
    ingresarOperacion.id = self.crypto.randomUUID();

    operacion_confirmada.push(ingresarOperacion);
    localStorage.setItem('operaciones_confirmadas', JSON.stringify(operacion_confirmada));

    generaVistaOperaciones(operacion_confirmada);
    generaTotalesBalance(operacion_confirmada);
});

generaVistaOperaciones(operacion_confirmada);
generaTotalesBalance(operacion_confirmada);

// boton para cancelar edicion de operacion // 

$btn_cancelar_edicion_operacion.addEventListener("click", () => {
    vista_balance.classList.remove("is-hidden");
    $seccion_editar_operacion.classList.add("is-hidden");
});


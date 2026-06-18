// Menus
const desayuno = {
    primero: {
        nombre: "BEBIDAS",
        platos: [
            { nombre: "TE", precio: 1.2 },
            { nombre: "CAFE", precio: 1.5 },
            { nombre: "CHOCOLATE", precio: 1.4 },
        ],
    },
    segundo: {
        nombre: "DULCE",
        platos: [
            { nombre: "NAPOLITANA", precio: 1.5 },
            { nombre: "CROISSANT", precio: 1.2 },
            { nombre: "BOLLO", precio: 1.3 },
        ],
    },
    postre: {
        nombre: "SALADO",
        platos: [
            { nombre: "TOSTADA", precio: 1.1 },
            { nombre: "HUEVOS", precio: 1.5 },
            { nombre: "BACON", precio: 1.4 },
        ],
    },
};

const almuerzo = {
    primero: {
        nombre: "PRIMEROS PLATOS",
        platos: [
            { nombre: "MACARRONES", precio: 12.5 },
            { nombre: "ARROZ", precio: 13.6 },
            { nombre: "ENSALADA", precio: 10.9 },
        ],
    },
    segundo: {
        nombre: "SEGUNDOS PLATOS",
        platos: [
            { nombre: "CARNE", precio: 15.5 },
            { nombre: "PESCADO", precio: 16.9 },
            { nombre: "PIZZA", precio: 14.5 },
        ],
    },
    postre: {
        nombre: "POSTRES",
        platos: [
            { nombre: "TARTA", precio: 5.5 },
            { nombre: "NATILLAS", precio: 3.2 },
            { nombre: "FRUTA", precio: 2.5 },
        ],
    },
};

const cena = {
    primero: {
        nombre: "PRIMEROS PLATOS",
        platos: [
            { nombre: "SOPA", precio: 9.99 },
            { nombre: "ENSALADA", precio: 10.5 },
            { nombre: "ARROZ", precio: 14.6 },
        ],
    },
    segundo: {
        nombre: "SEGUNDOS PLATOS",
        platos: [
            { nombre: "PESCADO", precio: 13.6 },
            { nombre: "CARNE", precio: 15.8 },
            { nombre: "HAMBURGUESA", precio: 14.5 },
        ],
    },
    postre: {
        nombre: "POSTRES",
        platos: [
            { nombre: "FLAN", precio: 1.5 },
            { nombre: "YOGURT", precio: 0.9 },
            { nombre: "MACEDONIA", precio: 1.99 },
        ],
    },
};

const extras = [
    { nombre: "PATATAS", precio: 2.50 },
    { nombre: "NACHOS", precio: 3.50 },
    { nombre: "ALITAS", precio: 4.00 },
    { nombre: "REFRESCO", precio: 1.80 }
];

// Mensajes
const mensajes = [
    "Excelente elección",
    "Muy buena decisión",
    "Eso está delicioso",
];

// Funciones
function validarPlato(usuario, platos) {
    if (usuario === null) {
        return null;
    }

    usuario = usuario.trim().toUpperCase();

    const platoEncontrado = platos.find(
        plato => plato.nombre === usuario
    );

    if (!platoEncontrado) {
        alert("Ese plato no lo tenemos disponible, lo siento");
        return null;
    }

    const numeroRandom = Math.floor(
        Math.random() * mensajes.length
    );

    alert(mensajes[numeroRandom]);

    return platoEncontrado;
}

function hacerPedido(menu) {
    let importeTotal = 0;
    const pedido = [];

    const categorias = Object.values(menu);

    for (const categoria of categorias) {
        const eleccion = prompt(
            `Elige tu ${categoria.nombre}:

${mostrarPrecio(categoria.platos)}`
        );

        const platoElegido = validarPlato(
            eleccion,
            categoria.platos
        );

        if (platoElegido) {
            pedido.push(platoElegido);
            importeTotal += platoElegido.precio;
        }
    }

    while (
        confirm(
            `¿Quieres añadir algún extra?

${mostrarPrecio(extras)}`
        )
    ) {
        const extraElegido = prompt(
            `Escribe el nombre del extra:

${mostrarPrecio(extras)}`
        );

        const extra = validarPlato(extraElegido, extras);

        if (extra) {
            pedido.push(extra);
            importeTotal += extra.precio;
        }
    }

    return {
        total: importeTotal,
        pedido
    };
}

function mostrarPlatos(platos) {
    return platos.map(plato => plato.nombre).join(" - ");
}

function mostrarPrecio(precios) {
    return precios
        .map(
            ({ nombre, precio }) =>
                `- ${nombre} : ${precio.toFixed(2)}€`
        )
        .join("\n");
}

function mostrarMenu(menu, nombreMenu) {
    let mensaje = `Bienvenido al menú ${nombreMenu}:\n\n`;

    const categorias = Object.values(menu);

    for (const categoria of categorias) {
        mensaje += `${categoria.nombre}:\n`;
        mensaje += `${mostrarPlatos(categoria.platos)}\n\n`;
    }

    mensaje += "Ahora has de seleccionar la comida de tu elección";

    alert(mensaje);
}

function finalizarPedido(menu) {
    const resultado = hacerPedido(menu);

    if (resultado.pedido.length === 0) {
        alert("No has seleccionado ningún plato.");
        return;
    }

    alert(
        `Tu pedido es:

${resultado.pedido
            .map(plato => `- ${plato.nombre} (${plato.precio.toFixed(2)}€)`)
            .join("\n")}

Importe total: ${resultado.total.toFixed(2)}€`
    );

    if (confirm("¿Estás de acuerdo con tu pedido?")) {
        alert("Tu comida ya se está preparando");
    } else {
        alert("Pedido cancelado");
    }
}

// Donde empieza todo
let hora = prompt(
    "Bienvenido! Por favor, introduzca una hora con el formato hh:mm (24 horas)"
);

const formatoHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

while (hora !== null && !formatoHora.test(hora)) {
    alert("Vaya, el formato de hora es incorrecto. Pruebe de nuevo.");

    hora = prompt(
        "Bienvenido! Por favor, introduzca una hora con el formato hh:mm (24 horas)"
    );
}

if (hora === null) {
    alert("Hasta pronto");
} else {
    const horaNumero = parseInt(hora.split(":")[0], 10);

    let menu = null;
    let nombreMenu = "";

    if (horaNumero >= 6 && horaNumero <= 12) {
        menu = desayuno;
        nombreMenu = "DESAYUNO";

    } else if (horaNumero >= 13 && horaNumero <= 16) {
        menu = almuerzo;
        nombreMenu = "ALMUERZO";

    } else if (horaNumero >= 17 && horaNumero <= 23) {
        menu = cena;
        nombreMenu = "CENA";
    }

    if (menu) {
        mostrarMenu(menu, nombreMenu);
        finalizarPedido(menu);
    } else {
        alert("La cocina está cerrada");
    }
}
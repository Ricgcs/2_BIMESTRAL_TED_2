"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pacientes_1 = require("../lib/pacientes");
const functionsJorge_1 = require("../lib/functionsJorge");
const alas = [
    {
        nome: "Cardiologia",
        fila: (0, functionsJorge_1.create)(5)
    },
    {
        nome: "Ortopedia",
        fila: (0, functionsJorge_1.create)(5)
    },
    {
        nome: "Clínico geral",
        fila: (0, functionsJorge_1.create)(5)
    }
];
function triar(elemento) {
    switch (elemento) {
        case 1:
            return "comum";
        case 2:
            return "preferencial";
        case 3:
            return "urgente";
        case 4:
            return "emergencia";
        default:
            return undefined;
    }
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function definirGravidade() {
    for (let a = 0; a < pacientes_1.pacientes.length; a++) {
        const gravidade = random(1, 4);
        pacientes_1.pacientes[a].prioridade = triar(gravidade);
    }
}
function gravidadeValor(gravidade) {
    switch (gravidade) {
        case "comum":
            return 1;
        case "preferencial":
            return 2;
        case "urgente":
            return 3;
        case "emergencia":
            return 4;
        default:
            return 0;
    }
}
function secretaria() {
    definirGravidade();
    pacientes_1.pacientes.sort((a, b) => gravidadeValor(b.prioridade) - gravidadeValor(a.prioridade));
    for (let a = 0; a < pacientes_1.pacientes.length; a++) {
        switch (pacientes_1.pacientes[a].setor) {
            case 'cardiologista':
                (0, functionsJorge_1.enqueue)(alas[0].fila, pacientes_1.pacientes[a]);
                console.log("Adicionado à Cardiologia:", pacientes_1.pacientes[a]);
                break;
            case 'ortopedista':
                (0, functionsJorge_1.enqueue)(alas[1].fila, pacientes_1.pacientes[a]);
                console.log("Adicionado à Ortopedia:", pacientes_1.pacientes[a]);
                break;
            case 'clínico geral':
                (0, functionsJorge_1.enqueue)(alas[2].fila, pacientes_1.pacientes[a]);
                console.log("Adicionado ao Clínico Geral:", pacientes_1.pacientes[a]);
                break;
            default:
                console.log("Especialidade não encontrada:", pacientes_1.pacientes[a]);
                break;
        }
    }
    console.log("Estado final das filas nas alas:");
    for (const ala of alas) {
        console.log(`Ala: ${ala.nome}, Fila: `, ala.fila);
    }
}
secretaria();

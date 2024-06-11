"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pacientes_1 = require("./pacientes");
const lib_1 = require("../lib/");
const CG = [];
const CL = [];
const OP = [];
function gravidadeValor(gravidade) {
    switch (gravidade.toLowerCase()) {
        case 'emergencia':
            return 1;
        case 'urgente':
            return 2;
        case 'preferencial':
            return 3;
        case 'comum':
            return 4;
        default:
            return 0;
    }
}
function adicionar_cliente() {
    let tamanho = pacientes_1.cliente.length;
    pacientes_1.cliente.sort((a, b) => gravidadeValor(a.Gravidade) - gravidadeValor(b.Gravidade));
    for (let a = 0; a < tamanho; a++) {
        if (pacientes_1.cliente[a].Especialista.toLowerCase() == "clinico geral") {
            (0, lib_1.insert)(pacientes_1.cliente[a], CG);
        }
        else if (pacientes_1.cliente[a].Especialista.toLowerCase() == "cardiologia") {
            CL.push(pacientes_1.cliente[a]);
        }
        else if (pacientes_1.cliente[a].Especialista.toLowerCase() == "ortopedia") {
            OP.push(pacientes_1.cliente[a]);
        }
    }
}
adicionar_cliente();
console.log('Clínico Geral:', CG);
console.log('Cardiologia:', CL);
console.log('Ortopedia:', OP);

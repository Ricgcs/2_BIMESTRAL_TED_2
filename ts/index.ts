import { pacientes } from "../lib/pacientes";
import { create, enqueue } from "../lib/functionsJorge";

const alas: any[] = [
    {
        nome: "Cardiologia",
        fila: create(5)
    },
    {
        nome: "Ortopedia",
        fila: create(5)
    },
    {
        nome: "Clínico geral",
        fila: create(5)
    }
];

function triar(elemento: number): string | undefined {
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

function random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function definirGravidade(): void {
    for (let a = 0; a < pacientes.length; a++) {
        const gravidade = random(1, 4); // Define gravidade entre 1 e 4
        pacientes[a].prioridade = triar(gravidade);
    }
}

function gravidadeValor(gravidade: string | undefined): number {
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

function secretaria(): void {
    definirGravidade(); // Definir gravidade dos pacientes antes de triá-los

    // Ordena os pacientes pela prioridade antes de enfileirá-los
    pacientes.sort((a, b) => gravidadeValor(b.prioridade) - gravidadeValor(a.prioridade));

    for (let a = 0; a < pacientes.length; a++) {
        switch (pacientes[a].setor) {
            case 'cardiologista':
                enqueue(alas[0].fila, pacientes[a]);
                console.log("Adicionado à Cardiologia:", pacientes[a]);
                break;

            case 'ortopedista':
                enqueue(alas[1].fila, pacientes[a]);
                console.log("Adicionado à Ortopedia:", pacientes[a]);
                break;

            case 'clínico geral':
                enqueue(alas[2].fila, pacientes[a]);
                console.log("Adicionado ao Clínico Geral:", pacientes[a]);
                break;

            default:
                console.log("Especialidade não encontrada:", pacientes[a]);
                break;
        }
    }

    console.log("Estado final das filas nas alas:");
    for (const ala of alas) {
        console.log(`Ala: ${ala.nome}, Fila: `, ala.fila);
    }
}

// Chamada da função secretaria
secretaria();

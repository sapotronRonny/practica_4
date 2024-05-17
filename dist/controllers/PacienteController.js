"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaciente = exports.updatePaciente = exports.createPaciente = exports.getPacienteById = exports.getAllPacientes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todos los pacientes
const getAllPacientes = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pacientes = yield prisma.paciente.findMany({
            where: {
                estado: {
                    not: 'eliminado',
                },
            },
        });
        res.status(200).json(pacientes);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los pacientes', error: error.message });
    }
});
exports.getAllPacientes = getAllPacientes;
// Obtener un paciente por su ID
const getPacienteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const paciente = yield prisma.paciente.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!paciente || paciente.estado === 'eliminado') {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        res.status(200).json(paciente);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el paciente', error: error.message });
    }
});
exports.getPacienteById = getPacienteById;
// Crear un nuevo paciente
const createPaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, identificacion } = req.body;
    try {
        const nuevoPaciente = yield prisma.paciente.create({
            data: {
                nombre,
                identificacion,
            },
        });
        res.status(201).json(nuevoPaciente);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el paciente', error: error.message });
    }
});
exports.createPaciente = createPaciente;
// Actualizar un paciente existente
const updatePaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, identificacion } = req.body;
    try {
        const pacienteActualizado = yield prisma.paciente.update({
            where: {
                id: Number(id),
            },
            data: {
                nombre,
                identificacion,
            },
        });
        res.status(200).json(pacienteActualizado);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el paciente', error: error.message });
    }
});
exports.updatePaciente = updatePaciente;
// Eliminar un paciente
const deletePaciente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pacienteEliminado = yield prisma.paciente.update({
            where: { id: Number(id) },
            data: { estado: 'eliminado' },
        });
        res.status(200).json(pacienteEliminado);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el paciente', error: error.message });
    }
});
exports.deletePaciente = deletePaciente;

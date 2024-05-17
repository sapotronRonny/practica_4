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
exports.deleteControl = exports.updateControl = exports.createControl = exports.getControlById = exports.getAllControles = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todos los controles
const getAllControles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const controles = yield prisma.control.findMany({
            where: {
                estado: {
                    not: 'eliminado',
                },
            },
        });
        res.status(200).json(controles);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los controles', error: error.message });
    }
});
exports.getAllControles = getAllControles;
// Obtener un control por su ID
const getControlById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const control = yield prisma.control.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!control || control.estado === 'eliminado') {
            return res.status(404).json({ message: 'Control no encontrado' });
        }
        res.status(200).json(control);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el control', error: error.message });
    }
});
exports.getControlById = getControlById;
// Crear un nuevo control
const createControl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_paciente, id_signo_vital, fecha, hora, valor } = req.body;
    try {
        const nuevoControl = yield prisma.control.create({
            data: {
                paciente: { connect: { id: id_paciente } },
                signo_vital: { connect: { id: id_signo_vital } },
                fecha,
                hora,
                valor,
            },
        });
        res.status(201).json(nuevoControl);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el control', error: error.message });
    }
});
exports.createControl = createControl;
// Actualizar un control existente
const updateControl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id_paciente, id_signo_vital, fecha, hora, valor } = req.body;
    try {
        const controlActualizado = yield prisma.control.update({
            where: {
                id: Number(id),
            },
            data: {
                paciente: { connect: { id: id_paciente } },
                signo_vital: { connect: { id: id_signo_vital } },
                fecha,
                hora,
                valor,
            },
        });
        res.status(200).json(controlActualizado);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el control', error: error.message });
    }
});
exports.updateControl = updateControl;
// Eliminar un control
const deleteControl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const controlEliminado = yield prisma.control.update({
            where: { id: Number(id) },
            data: { estado: 'eliminado' },
        });
        res.status(200).json(controlEliminado);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el control', error: error.message });
    }
});
exports.deleteControl = deleteControl;

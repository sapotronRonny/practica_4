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
exports.deleteSignoVital = exports.updateSignoVital = exports.createSignoVital = exports.getSignoVitalById = exports.getAllSignosVitales = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllSignosVitales = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signosVitales = yield prisma.signo_vital.findMany({
            where: {
                estado: {
                    not: 'eliminado',
                },
            },
        });
        res.status(200).json(signosVitales);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los signos vitales', error: error.message });
    }
});
exports.getAllSignosVitales = getAllSignosVitales;
const getSignoVitalById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const signoVital = yield prisma.signo_vital.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (!signoVital || signoVital.estado === 'eliminado') {
            return res.status(404).json({ message: 'Signo vital no encontrado' });
        }
        res.status(200).json(signoVital);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el signo vital', error: error.message });
    }
});
exports.getSignoVitalById = getSignoVitalById;
const createSignoVital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { descripcion, minimo, maximo } = req.body;
    try {
        const nuevoSignoVital = yield prisma.signo_vital.create({
            data: {
                descripcion,
                minimo,
                maximo,
            },
        });
        res.status(201).json(nuevoSignoVital);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el signo vital', error: error.message });
    }
});
exports.createSignoVital = createSignoVital;
const updateSignoVital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { descripcion, minimo, maximo } = req.body;
    try {
        const updatedSignoVital = yield prisma.signo_vital.update({
            where: {
                id: Number(id),
            },
            data: {
                descripcion,
                minimo,
                maximo,
            },
        });
        res.status(200).json(updatedSignoVital);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el signo vital', error: error.message });
    }
});
exports.updateSignoVital = updateSignoVital;
const deleteSignoVital = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedSignoVital = yield prisma.signo_vital.update({
            where: { id: Number(id) },
            data: { estado: 'eliminado' },
        });
        res.status(200).json(deletedSignoVital);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el signo vital', error: error.message });
    }
});
exports.deleteSignoVital = deleteSignoVital;

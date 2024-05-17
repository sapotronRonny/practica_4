"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RouterPaciente_1 = __importDefault(require("./RouterPaciente"));
const routerSignoVital_1 = __importDefault(require("./routerSignoVital"));
const RouterControl_1 = __importDefault(require("./RouterControl"));
const router = (0, express_1.Router)();
router.use('/pacientes', RouterPaciente_1.default);
router.use('/controles', RouterControl_1.default);
router.use('/signos-vitales', routerSignoVital_1.default);
exports.default = router;

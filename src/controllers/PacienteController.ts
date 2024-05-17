import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Obtener todos los pacientes
export const getAllPacientes = async (_req: Request, res: Response) => {
  try {
    const pacientes = await prisma.paciente.findMany({
      where: {
        estado: {
          not: 'eliminado',
        },
      },
    });
    res.status(200).json(pacientes);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener los pacientes', error: error.message });
  }
};

// Obtener un paciente por su ID
export const getPacienteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const paciente = await prisma.paciente.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!paciente || paciente.estado === 'eliminado') {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }
    res.status(200).json(paciente);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener el paciente', error: error.message });
  }
};

// Crear un nuevo paciente
export const createPaciente = async (req: Request, res: Response) => {
  const { nombre, identificacion } = req.body;
  try {
    const nuevoPaciente = await prisma.paciente.create({
      data: {
        nombre,
        identificacion,
      },
    });
    res.status(201).json(nuevoPaciente);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al crear el paciente', error: error.message });
  }
};

// Actualizar un paciente existente
export const updatePaciente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, identificacion } = req.body;
  try {
    const pacienteActualizado = await prisma.paciente.update({
      where: {
        id: Number(id),
      },
      data: {
        nombre,
        identificacion,
      },
    });
    res.status(200).json(pacienteActualizado);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar el paciente', error: error.message });
  }
};

// Eliminar un paciente
export const deletePaciente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pacienteEliminado = await prisma.paciente.update({
      where: { id: Number(id) },
      data: { estado: 'eliminado' },
    });
    res.status(200).json(pacienteEliminado);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar el paciente', error: error.message });
  }
};
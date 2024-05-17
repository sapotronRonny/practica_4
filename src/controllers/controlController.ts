import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Obtener todos los controles
export const getAllControles = async (req: Request, res: Response) => {
  try {
    const controles = await prisma.control.findMany({
      where: {
        estado: {
          not: 'eliminado',
        },
      },
    });
    res.status(200).json(controles);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener los controles', error: error.message });
  }
};

// Obtener un control por su ID
export const getControlById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const control = await prisma.control.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!control || control.estado === 'eliminado') {
      return res.status(404).json({ message: 'Control no encontrado' });
    }
    res.status(200).json(control);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener el control', error: error.message });
  }
};

// Crear un nuevo control
export const createControl = async (req: Request, res: Response) => {
  const { id_paciente, id_signo_vital, fecha, hora, valor } = req.body;
  try {
    const nuevoControl = await prisma.control.create({
      data: {
        paciente: { connect: { id: id_paciente } },
        signo_vital: { connect: { id: id_signo_vital } },
        fecha,
        hora,
        valor,
      },
    });
    res.status(201).json(nuevoControl);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al crear el control', error: error.message });
  }
};

// Actualizar un control existente
export const updateControl = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id_paciente, id_signo_vital, fecha, hora, valor } = req.body;
  try {
    const controlActualizado = await prisma.control.update({
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
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar el control', error: error.message });
  }
};

// Eliminar un control
export const deleteControl = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const controlEliminado = await prisma.control.update({
      where: { id: Number(id) },
      data: { estado: 'eliminado' },
    });
    res.status(200).json(controlEliminado);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar el control', error: error.message });
  }
};
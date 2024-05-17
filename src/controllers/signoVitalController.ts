import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllSignosVitales = async (_req: Request, res: Response) => {
  try {
    const signosVitales = await prisma.signo_vital.findMany({
      where: {
        estado: {
          not: 'eliminado',
        },
      },
    });
    res.status(200).json(signosVitales);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener los signos vitales', error: error.message });
  }
};

export const getSignoVitalById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const signoVital = await prisma.signo_vital.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!signoVital || signoVital.estado === 'eliminado') {
      return res.status(404).json({ message: 'Signo vital no encontrado' });
    }
    res.status(200).json(signoVital);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener el signo vital', error: error.message });
  }
};

export const createSignoVital = async (req: Request, res: Response) => {
  const { descripcion, minimo, maximo } = req.body;
  try {
    const nuevoSignoVital = await prisma.signo_vital.create({
      data: {
        descripcion,
        minimo,
        maximo,
      },
    });
    res.status(201).json(nuevoSignoVital);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al crear el signo vital', error: error.message });
  }
};

export const updateSignoVital = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { descripcion, minimo, maximo } = req.body;
  try {
    const updatedSignoVital = await prisma.signo_vital.update({
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
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar el signo vital', error: error.message });
  }
};

export const deleteSignoVital = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedSignoVital = await prisma.signo_vital.update({
      where: { id: Number(id) },
      data: { estado: 'eliminado' },
    });
    res.status(200).json(deletedSignoVital);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar el signo vital', error: error.message });
  }
};
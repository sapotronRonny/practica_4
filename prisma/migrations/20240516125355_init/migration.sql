-- CreateEnum
CREATE TYPE "estado" AS ENUM ('activo', 'pendiente', 'eliminado');

-- AlterTable
ALTER TABLE "control" ADD COLUMN     "estado" "estado" NOT NULL DEFAULT 'activo';

-- AlterTable
ALTER TABLE "paciente" ADD COLUMN     "estado" "estado" NOT NULL DEFAULT 'activo';

-- AlterTable
ALTER TABLE "signo_vital" ADD COLUMN     "estado" "estado" NOT NULL DEFAULT 'activo';

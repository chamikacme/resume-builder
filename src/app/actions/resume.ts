'use server'

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getResumes() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return prisma.resume.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function getResume(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const resume = await prisma.resume.findUnique({
    where: { id },
  });

  if (!resume || resume.userId !== userId) {
    return null;
  }
  return resume;
}

export async function createResume(title: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const resume = await prisma.resume.create({
    data: {
      userId,
      title,
      content: {}, 
    },
  });

  revalidatePath('/dashboard');
  return resume;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateResume(id: string, data: { title?: string; content?: any; templateId?: string }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const existing = await prisma.resume.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) throw new Error("Unauthorized");

  const updated = await prisma.resume.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });

  revalidatePath('/dashboard');
  revalidatePath(`/editor/${id}`);
  return updated;
}

export async function deleteResume(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const existing = await prisma.resume.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) throw new Error("Unauthorized");

  await prisma.resume.delete({ where: { id } });
  revalidatePath('/dashboard');
}

export async function duplicateResume(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const existing = await prisma.resume.findUnique({ where: { id } });
  if (!existing || existing.userId !== userId) throw new Error("Unauthorized");

  const duplicated = await prisma.resume.create({
    data: {
      userId,
      title: `${existing.title} (Copy)`,
      content: existing.content ?? {},
      templateId: existing.templateId,
    },
  });

  revalidatePath('/dashboard');
  return duplicated;
}

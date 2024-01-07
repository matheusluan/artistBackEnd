import { prisma } from "../infra/prisma/connection";

interface CategoryProps {
  name: string;
  type: "artist" | "event";
}

interface FindAllProps {
  search?: string;
}

class CategoriesRepository {
  async create(category: CategoryProps) {
    const stored = await prisma.category.create({
      data: category,
    });

    return stored;
  }

  async findAll({ search }: FindAllProps) {
    const categories = await prisma.category.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });

    return categories;
  }

  async findById(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  }

  async update(id: string, category: CategoryProps) {
    const stored = await prisma.category.update({
      where: {
        id,
      },
      data: category,
    });

    return stored;
  }

  async delete(id: string, category: CategoryProps) {
    const stored = await prisma.category.delete({
      where: {
        id,
      }
    });

    return stored;
  }
}

export default new CategoriesRepository();

import { prisma } from "../infra/prisma/connection";

interface EventCategoryProps {
  event: string;
  category: string;
}

class EventCategoriesRepository {
  async create(event_category: EventCategoryProps) {
    const stored = await prisma.event_Category.create({
      data: {
        eventId: event_category.event,
        categoryId: event_category.category
      },
    });

    return stored;
  }
 
  async deleteMany(event: string) {
    const stored = await prisma.event_Category.deleteMany({
      where: {
        eventId: event,
      },
    });

    return stored;
  }
}

export default new EventCategoriesRepository();

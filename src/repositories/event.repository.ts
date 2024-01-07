import { prisma } from "../infra/prisma/connection";

interface EventProps {
  name: string;
  description: string;
  budget: string;
  people: string;
  dh_event: Date;
  dh_expiration: Date;
  userOwnerId?: string;
  addressId?: string;
}

interface FindAllProps {
  search?: string;
}

class EventRepository {
  async create(event: EventProps) {
    const stored = await prisma.event.create({
      data: {
        name: event.name,
        budget: event.budget,
        people: event.people,
        description: event.description,
        dh_event: event.dh_event,
        dh_expiration: event.dh_expiration,
        user: {
          connect: {
            id: event.userOwnerId
          }
        },
        address: {
          connect: {
            id: event.addressId
          }
        }
      },
    });

    return stored;
  }

  async findAll({ search }: FindAllProps) {
    const events = await prisma.event.findMany({
      where: {
        name: {
          contains: search,
        }
      },
      include: {
        category: {
          include: {
            category: true
          }
        },
        address: true
      }
    });

    return events;
  }

  async findById(id: string) {
    const event = await prisma.event.findUnique({
      where: {
        id,
      },
      include: {
        category: {
          include: {
            category: true
          }
        },
        address: true,
        event_artist: {
          include: {
            artist: true
          }
        }
      },
    });

    return event;
  }

  async findByUser(id: string) {
    const event = await prisma.event.findMany({
      where: {
        user: {
          id: id
        }
      },
      include: {
        category: {
          include: {
            category: true
          }
        },
        address: true
      },
    });

    return event;
  }

  async update(id: string, event: EventProps) {
    const stored = await prisma.event.update({
      where: {
        id,
      },
      data: event,
    });

    return stored;
  }

  async delete(id: string) {
    const stored = await prisma.event.delete({
      where: {
        id,
      }
    });

    return stored;
  }
}

export default new EventRepository();

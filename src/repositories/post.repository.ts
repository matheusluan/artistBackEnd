import { serialize } from "v8";
import { prisma } from "../infra/prisma/connection";

interface postProps {
  description: string;
  dh_create?: Date;
  userOwnerId?: string;
  eventId?: string;
}

interface FindAllProps {
  search?: string;
}

class PostRepository {
  async createEv(post: postProps) {
    const stored = await prisma.post.create({
      data: {
        description: post.description,
        user: {
          connect: {
            id: post.userOwnerId
          }
        },
        event: {
          connect: {
            id: post.eventId
          }
        }
      }
    });

    return stored;
  }

  async create(post: postProps) {
    const stored = await prisma.post.create({
      data: {
        description: post.description,
        user: {
          connect: {
            id: post.userOwnerId
          }
        }
      }
    });

    return stored;
  }

  async findAll({ search }: FindAllProps) {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { description: { contains: search } },
          { user: { name: { contains: search } } },
          { event: { name: { contains: search } } },
          { user: { categories: { some: { category: { name: { contains: search } } } } } },
          { event: { category: { some: { category: { name: { contains: search } } } } } }
        ]

      },
      include: {
        event: {
          include: {
            address: true,
            category: {
              include: {
                category: true
              }
            }
          }
        },
        medias: true,
        user: {
          include: {
            categories: {
              include: {
                category: true
              }
            },
            ratingsReceived: {
              include: {
                ratedByUser: true
              }
            },
          }
        }
      },
      orderBy: {
        dh_edit: 'desc'
      }
    });

    return posts;
  }

  async findById(id: string) {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        event: true,
        medias: true,
        user: {
          include: {
            categories: {
              include: {
                category: true
              }
            },
            ratingsReceived: {
              include: {
                ratedByUser: true
              }
            },
          }
        }
      }
    });

    return post;
  }

  async findByUser(id: string) {
    const post = await prisma.post.findMany({
      where: {
        user: {
          id: id
        }
      },
      include: {
        event: {
          include: {
            address: true,
            category: {
              include: {
                category: true
              }
            }
          }
        },
        medias: true,
        user: {
          include: {
            categories: {
              include: {
                category: true
              }
            },
            ratingsReceived: {
              include: {
                ratedByUser: true
              }
            },
          }
        }
      },
      orderBy: {
        dh_create: 'desc'
      }
    });

    return post;
  }

  async update(id: string, post: postProps) {
    const stored = await prisma.post.update({
      where: {
        id,
      },
      data: post,
    });

    return stored;
  }

  async delete(id: string) {
    const stored = await prisma.post.delete({
      where: {
        id,
      }
    });

    return stored;
  }
}

export default new PostRepository();

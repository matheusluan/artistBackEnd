import { prisma } from "../infra/prisma/connection";

interface RatingProps {
  value: number;
  userRate: string;
  user: string;
}

interface FindAllProps {
  search?: string;
}

class ratingRepository {
  async create(rating: RatingProps) {
    const stored = await prisma.rating.create({
      data: {
        value: rating.value,
        ratedUser: {
          connect: {
            id: rating.user
          }
        },
        ratedByUser: {
          connect: {
            id: rating.userRate
          }
        }

      }
    });

    return stored;
  }

  async findByUser(idRate: string, idUser: string) {
    const rating = await prisma.rating.findFirst({
      where: {
        ratedByUser: {
          id: idRate
        },
        ratedUser: {
          id: idUser
        }
      }
    });

    return rating;
  }

  async update(id: string, rating: number) {
    const stored = await prisma.rating.update({
      where: {
        id,
      },
      data: {
        value: rating
      },
    });

    return stored;
  }

}

export default new ratingRepository();

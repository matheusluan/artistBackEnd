import { prisma } from "../infra/prisma/connection";

interface EventArtist {
  event: string;
  artist: string;
  accept: boolean;
  dh_action?: Date;
}

class EventArtistRepository {
  async create(event_artist: EventArtist) {
    const stored = await prisma.event_Artist.create({
      data: {
        eventId: event_artist.event,
        artistId: event_artist.artist,
        accept: event_artist.accept
      },
    });

    return stored;
  }

  async findById(id: string) {
    const candidatura = await prisma.event_Artist.findUnique({
      where: {
        id,
      },
    });

    return candidatura;
  }

  async findByArtistEvent(artist: string, event: string) {
    const candidatura = await prisma.event_Artist.findFirst({
      where: {
        artistId: artist,
        eventId: event,
      }
    });

    return candidatura;
  }

  async findByEvent(id: string) {
    const candidaturas = await prisma.event_Artist.findMany({
      where: {
        event: {
          id: id
        }
      },
      orderBy: {
        dh_action: "desc"
      }
    });

    return candidaturas;
  }

  async findByUser(id: string) {
    const candidaturas = await prisma.event_Artist.findMany({
      where: {
        artist: {
          id: id
        }
      },
      orderBy: {
        dh_action: "desc"
      },
      include: {
        event: true
      }
    });

    return candidaturas;
  }

  async deleteMany(event: string) {
    const stored = await prisma.event_Artist.deleteMany({
      where: {
        eventId: event,
      },
    });

    return stored;
  }
  async update(id: string, candidatura: EventArtist) {
    const stored = await prisma.event_Artist.update({
      where: {
        id,
      },
      data: {
        accept: candidatura.accept,
        dh_action: candidatura.dh_action
      }
    });

    return stored;
  }

  async delete(id: string) {
    const stored = await prisma.event_Artist.delete({
      where: {
        id,
      }
    });

    return stored;
  }
}

export default new EventArtistRepository();

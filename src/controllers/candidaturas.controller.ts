import { Request, Response } from "express";
import { AppError } from "../handlers/errors.handler";
import event_artistsRepository from "../repositories/event_artists.repository";

class CandidaturasController {
  async create(request: Request, response: Response) {
    const { artist, event, accept } = request.body;

    console.log(request.body)

    if (!artist || !event) {
      const missingFields = [];

      if (!artist) missingFields.push("Artista");
      if (!event) missingFields.push("Evento");


      throw new AppError(`Um ou mais campos não enviados: ${missingFields.join(", ")}`);
    }
    
    const busca = await event_artistsRepository.findByArtistEvent(artist, event);

    if(busca){
      throw new AppError(`Artista já inscrito.`);
    }

    const candidatura = await event_artistsRepository.create({ accept, artist, event});

    return response.status(201).json(candidatura);
  }

  async findByUser(request: Request, response: Response) {
    const { id } = request.params;

    const candidaturas = await event_artistsRepository.findByUser(id);

    return response.json(candidaturas);
  }

  async findByEvent(request: Request, response: Response) {
    const { id } = request.params;

    const candidaturas = await event_artistsRepository.findByEvent(id);

    return response.json(candidaturas);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { artist, event, accept, dh_action } = request.body;

    const stored = await event_artistsRepository.findById(id);

    if (!stored) {
      throw new AppError("Candidatura não encontrada", 404);
    }

    let date = new Date();
    const candidatura = await event_artistsRepository.update(id, { artist, event, accept, dh_action: date });

    return response.json(candidatura);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const stored = await event_artistsRepository.findById(id);

    if (!stored) {
      throw new AppError("Candidatura não encontrada", 404);
    }

    const cand = await event_artistsRepository.delete(id);

    return response.json(cand);
  }
}

export default new CandidaturasController();

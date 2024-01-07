import { Request, Response } from "express";
import { AppError } from "../handlers/errors.handler";
import ratingRepository from "../repositories/rating.repository";
import userRepository from "../repositories/user.repository";

class RatingController {
  async create(request: Request, response: Response) {
    const { value, userRate, user } = request.body;


    if (!value || !userRate || !user) {
      const missingFields = [];

      if (!value) missingFields.push("value");
      if (!userRate) missingFields.push("userRate");
      if (!user) missingFields.push("user");

      throw new AppError(`Um ou mais campos não enviados: ${missingFields.join(", ")}`);
    }

    //Bloco pra verificar se o valor é valido 
    if (!Number.isInteger(value) || value < 0 || value > 5) {
      throw new AppError(`Valor ${value} invalido!`);
    }

    //Bloco pra verificar se o userRate existe 
    if (typeof userRate == "string") {

      const usRate = await userRepository.findById(userRate);

      if (usRate) {

        if(usRate.user_type != 'organizer'){
          throw new AppError('Usuario precisa ser Organizador.');
        }

        const rat = await ratingRepository.findByUser(usRate.id, user);

        if(rat){
         const editRating =  ratingRepository.update(rat.id, value);
        }else{
          const newRating = await ratingRepository.create({ value, userRate, user });
        }     

        let usuario = await userRepository.findById(user);

        let totalRating = 0;

        if (usuario?.ratingsReceived && usuario.ratingsReceived.length > 0) {
          const sumRatings = usuario.ratingsReceived.reduce((acc, rating) => acc + rating.value, 0);
          const userAverageRating = sumRatings / usuario.ratingsReceived.length;
          totalRating += userAverageRating;
        }

        return response.status(201).json(Math.floor(totalRating));

      } else {
        throw new AppError('User rate não encontrado.');
      }

    } else {
      throw new AppError(`User rate inválido.`);
    }

  }


}

export default new RatingController();

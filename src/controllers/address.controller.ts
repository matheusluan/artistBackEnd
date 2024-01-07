import { Request, Response } from "express";
import { AppError } from "../handlers/errors.handler";
import addressRepository from "../repositories/address.repository";

class AddressController {
  async create(request: Request, response: Response) {
    const { street, neighborhood, number, city,contry, lat, long, zip_code, user } = request.body;

    console.log(request.body)
                  
    if (!street || !neighborhood || !number || !city || !contry || !zip_code || !user ) {
      const missingFields = [];

      if (!street) missingFields.push("street");
      if (!neighborhood) missingFields.push("neighborhood");
      if (!number) missingFields.push("number");
      if (!contry) missingFields.push("contry");
      if (!city) missingFields.push("city");
      if (!zip_code) missingFields.push("zip_code");
      if (!user) missingFields.push("user");

      throw new AppError(`Um ou mais campos não enviados: ${missingFields.join(", ")}`);
    }

    const address = await addressRepository.createForUser({ street, neighborhood, number, city, contry, lat, long, zip_code, user });

    return response.status(201).json(address);
  } 

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const address = await addressRepository.findById(id);

    if (!address) {
      throw new AppError("Endereço não encontrado", 404);
    }

    return response.json(address);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { street, neighborhood, number, contry, city,lat, long, zip_code } = request.body;

    const stored = await addressRepository.findById(id);

    if (!stored) {
      throw new AppError("Endereço não encontrado", 404);
    }

    const address = await addressRepository.update(id, {street, neighborhood, number, city, contry, lat, long, zip_code });

    return response.json(address);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const stored = await addressRepository.findById(id);

    if (!stored) {
      throw new AppError("Endereço não encontrado", 404);
    }

    const address = await addressRepository.delete(id);

    return response.json(address);
  }
}

export default new AddressController();


import { prisma } from "../infra/prisma/connection";

interface AddressProps {
  street: string;
  neighborhood: string;
  number: string;
  contry: string;
  city: string;
  lat: string;
  long: string;
  zip_code: string;
  user?: string;
  event?: string;
}

class AddressRepository {
  async create(address: AddressProps) {
    const stored = await prisma.address.create({
      data: {
        city: address.city,
        street: address.street,
        neighborhood: address.neighborhood,
        number: address.number,
        contry: address.contry,      
        lat: address.lat,
        long:address.long,
        zip_code: address.zip_code,
        user : {
          connect :{
            id: address.user
          }
        },
        event:{
          connect:{
            id: address.event
          }
        }
      },
      
    });

    return stored;
  }

  async createForEvent(address: AddressProps) {
    const stored = await prisma.address.create({
      data: {
        city: address.city,
        street: address.street,
        neighborhood: address.neighborhood,
        number: address.number,
        contry: address.contry,      
        lat: address.lat,
        long:address.long,
        zip_code: address.zip_code
      },
      
    });

    return stored;
  }

  async createForUser(address: AddressProps) {
    const stored = await prisma.address.create({
      data: {
        city: address.city,
        street: address.street,
        neighborhood: address.neighborhood,
        number: address.number,
        contry: address.contry,      
        lat: address.lat,
        long:address.long,
        zip_code: address.zip_code,
        user : {
          connect :{
            id: address.user
          }
        }
      },
      
    });

    return stored;
  }


  async findById(id: string) {
    const address = await prisma.address.findUnique({
      where: {
        id,
      },
      include:{
        user :true
      }
    });

    return address;
  }

  async update(id: string, address: AddressProps) {
    const stored = await prisma.address.update({
      where: {
        id,
      },
      data: {
        street: address.street,
        neighborhood: address.neighborhood,
        number: address.number,
        contry: address.contry,
        lat: address.lat,
        long:address.long,
        zip_code: address.zip_code
      }
    });

    return stored;
  }

  async delete(id: string) {
    const stored = await prisma.address.delete({
      where: {
        id,
      }
    });

    return stored;
  }
}

export default new AddressRepository();

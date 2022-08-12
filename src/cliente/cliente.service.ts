import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @Inject('CLIENTE_REPOSITORY')
    private clienteRepository: Repository<Cliente>,
  ) {}

  create(createClienteDto: CreateClienteDto) {
    return this.clienteRepository.save(createClienteDto);
  }

  findAll() {
    return this.clienteRepository.find();
  }

  findOne(id: number) {
    return this.clienteRepository.findOne({ where: { id } });
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return this.clienteRepository.update(id, updateClienteDto);
  }

  remove(id: number) {
    return this.clienteRepository.delete(id);
  }
}

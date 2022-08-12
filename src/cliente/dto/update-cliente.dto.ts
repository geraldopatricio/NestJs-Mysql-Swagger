/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/swagger';
import { CreateClienteDto } from './create-cliente.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
    @IsString()
    nome: string;

    @IsString()
    email: string;

    @IsString()
    cpf: string;

    @IsString()
    fone: string;

    @IsString()
    celular: string;

    @IsBoolean()
    status: boolean;
}

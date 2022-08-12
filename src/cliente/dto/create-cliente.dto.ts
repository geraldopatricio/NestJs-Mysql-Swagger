/* eslint-disable prettier/prettier */
import { IsBoolean, IsString } from 'class-validator';

export class CreateClienteDto {

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

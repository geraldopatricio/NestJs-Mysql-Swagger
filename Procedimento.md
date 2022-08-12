## PROCEDIMENTO PARA CRIAR A API COM NESTJS E MYSQL

## pré-requisitos
```bash
npm install -g npm
npm insta```ll -g @nestjs/cli

## outros pré-requisitos
```bash
instale o postman ou insomnia e também um sgbd do mysql de sua escolha
```
## criando o projeto
```bash
nest new Projeto-API
```
## rodar em modo dev
```bash
npm run start:dev
```
## instalando container docker mysql
```bash
docker run --name nome_container -e MYSQL_ROOT_PASSWORD=senha_aqui -d mysql:latest
```
## ver o id do container: 
```bash
docker image list
```
## rodando o container
```bash
docker start id_container
```
## instalando typeorm para mysql
```bash
npm install --save typeorm mysql2
```
## fonte: https://docs.nestjs.com/recipes/sql-typeorm

## instalando o swagger
```bash
npm install --save @nestjs/swagger
```
## incluindo o swagger no main.ts
```bash
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
```
## fonte: https://docs.nestjs.com/openapi/introduction 

## gerando seu primeiro CRUD sem os arquivos de testes
```bash
nest g resource cliente --no-spec
```
## crie uma pasta database no src e inclua os arquivos com os seguintes conteúdos
```bash
file: database.module.ts
conteúdo:
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}

file: database.providers.ts
conteúdo:
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'test',
        entities: [__dirname + '/../**/*.entity{.ts,.js}',],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
```
## crie um provider no seu crud conforme abaixo:
```bash
file: cliente.providers.ts
conteúdo:
import { DataSource } from 'typeorm';
import { Cliente } from './entities/cliente.entity';

export const clienteProviders = [
  {
    provide: 'CLIENTE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cliente),
    inject: ['DATA_SOURCE'],
  },
];
```
## altere o service de seu crud conforme abaixo:
```bash
// inclua o construtor
constructor(
    @Inject('CLIENTE_REPOSITORY')
    private clienteRepository: Repository<Cliente>,
  ) {}

// no findAll altere:
return this.clienteRepository.find();

// no create altere:
return this.clienteRepository.save(createClienteDto);

// no findOne altere:
return this.clienteRepository.findOne({ where: { id } });

// no update altere:
return this.clienteRepository.update(id, updateClienteDto);

// no delete altere:
return this.clienteRepository.delete(id);

// obs: não esquecendo de alterar os imports conforme necessidade
```
## no module altere:
```bash
imports: [DatabaseModule],
providers: [...clienteProviders,ClienteService,]
```
## na entidade inclua os campos da tabela conforme abaixo:
```bash
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
@PrimaryGeneratedColumn()
id: number;

@Column({ length: 100 })
nome: string;

@Column({ length: 255 })
email: string;

@Column({ length: 11 })
cpf: string;

@Column({ length: 11 })
celular: string;

@Column()
status: boolean;
}
```
## no createdto e updatedto altere:
```bash
import { IsBoolean, IsString } from 'class-validator';

@IsString()
nome: string;

@IsString()
email: string;

@IsString()
cpf: string;

@IsString()
celular: string;

@IsBoolean()
status: boolean;
```
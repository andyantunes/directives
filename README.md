# Máscaras e Validações de Input Angular

## Install

Fazer download do diretório directives e colocar dentro de app

## Usage

```ts
impor { DirectivesModule } from './directives';

@NgModule({
  imports: [
    DirectivesModule
  ],
})
```

## HTML

```html
<form>
  <input [email]="{errColor: 'red'}" type="email" placeholder="E-mail" />
</form>
```

## Exemplo de máscara e validação para cep

- Máscara - 99999-999

```html
<input cep type="text" placeholder="cep" />
```

### Opções

Criar model para cep

## Exemplo de máscara e validação para Telefone

- Máscara de telefone com 8 dígitos - (99) 9999-9999
- Máscara de telefone com 9 dígitos - (99) 99999-9999

```html
<input phone type="text" placeholder="Phone" />
```

### Opções

- Adicionar errColor

```ts
PhoneOptions = {
  cellphone?: boolean;
  landline?: boolean;
}
```

| Name      | type    | required | info                   | default |
| --------- | ------- | -------- | ---------------------- | ------- |
| cellphone | boolean | Optional | Máscara para 9 dígitos | `false` |
| landline  | boolean | Optional | Máscara para 8 dígitos | `false` |

## Exemplo de validação para E-mail

- Validação - email@email.com

```html
<input [email]="{errColor: 'red'}" type="email" placeholder="E-mail" />
```

### Opções

```ts
EmailOptions = {
  errColor?: string;
}
```

| Name     | type   | required | info                           | default |
| -------- | ------ | -------- | ------------------------------ | ------- |
| errColor | string | Optional | Cor da borda do input inválido | `#f00`  |

## Exemplo validação para Nomes

- Validação para nome
- Validação para nome completo - Primeiro_Nome Último_Nome

```html
<input [name]="{errColor: 'red'}" type="email" placeholder="E-mail" />
```

### Opções

```ts
NameOptions = {
  name?: boolean;
  nameMinLength?: number;
  fullName?: boolean;
  errColor?: string;
}
```

| Name          | type    | required | info                             | default |
| ------------- | ------- | -------- | -------------------------------- | ------- |
| name          | boolean | Optional | -                                | `false` |
| nameMinLength | number  | Optional | Mínimo de caracteres para o nome | `3`     |
| fullName      | boolean | Optional | Validação para nome e sobre nome | `false` |
| errColor      | string  | Optional | Cor da borda do input inválido   | `#f00`  |

## Exemplo validação para Senhas

```html
<input [password]="{errColor: 'red'}" type="password" placeholder="Senha" />
```

### Opções

```ts
NameOptions = {
  minLength?: number;
  pattern?: string;
  errColor?: string;
}
```

| Name      | type   | required | info                                 | default |
| --------- | ------ | -------- | ------------------------------------ | ------- |
| minLength | number | Optional | Mínimo de caracteres para a senha    | `8`     |
| pattern   | string | Optional | Padrão Regex para validação de senha | `''`    |
| errColor  | string | Optional | Cor da borda do input inválido       | `#f00`  |

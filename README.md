# CLYVO VET — Sprint 4

Projeto acadêmico da disciplina **Disruptive Architectures: IoT, IoB & Generative IA**.

## Integrantes
- **Olavo Porto Neves** — RM 563558
- **Altamir Lima** — RM 562906
- **Felipe Conte** — RM 562248
- **Luiz Gustavo** — RM 564495
- **Pedro Henrique Dias França** — RM 561940

## 1. O que foi implementado nesta Sprint

A aplicação agora inclui uma integração real com uma API de IA generativa por meio de um backend Node.js. O tutor pode escrever uma mensagem em linguagem natural; o modelo interpreta a intenção e sugere uma categoria de acompanhamento. A categoria é validada e encaminhada ao motor de regras existente, que continua selecionando os protocolos, prazos, prioridades e justificativas de forma determinística.

A funcionalidade depende de uma chave válida, um modelo habilitado e uma API compatível com o formato Chat Completions. Sem configuração válida, o sistema exibe um erro explícito; não apresenta uma resposta falsa como se a IA tivesse funcionado.

## 2. Problema de negócio

Uma recomendação ou retorno pode ser identificado durante o cuidado, mas não necessariamente se transforma em uma ação acompanhada pelo tutor e pela clínica. O CLYVO VET busca reduzir essa lacuna, transformando o contexto do pet em protocolos explicáveis e ações que podem ser acompanhadas na jornada.

## 3. Fluxo da IA

1. O tutor escreve uma mensagem na seção **Demonstração IA**.
2. A interface envia a mensagem e o contexto mínimo do pet ao backend Node.js.
3. O backend chama a API de IA generativa usando a chave armazenada no arquivo local `.env`.
4. A resposta estruturada é validada; somente categorias permitidas são aceitas.
5. A categoria sugerida é encaminhada ao motor de regras.
6. O motor apresenta os protocolos aplicáveis com prazo, prioridade e justificativa.
7. Para um pet cadastrado, o usuário pode criar ações na Jornada do Cuidado.

**Separação de responsabilidades:** o LLM interpreta a linguagem natural; o motor determinístico decide quais protocolos cadastrados correspondem à categoria. A IA não inventa datas, protocolos ou prazos.

## 4. Funcionalidades do protótipo

- Dashboard e cadastro/consulta de pets.
- Demonstração do motor de regras e interpretação de mensagem via IA generativa.
- 10 protocolos parametrizados, com gatilhos corrigidos para odontologia, geriatria e check-up felino.
- Prioridade, prazo e justificativa por protocolo.
- Criação e acompanhamento de jornadas.
- Tratamento de erros da API, de configuração e de respostas inválidas.
- Guardrail clínico: a solução não diagnostica, não prescreve e encaminha questões clínicas ao veterinário.

## 5. Tecnologias

- HTML5, CSS3 e JavaScript.
- Node.js 18+ (backend sem dependências externas de pacote).
- API de IA compatível com Chat Completions.
- `localStorage` para persistência local das demonstrações.
- Mermaid para o diagrama arquitetural.

## 6. Como executar

1. Instale Node.js 18 ou superior.
2. Copie `.env.example` para um arquivo chamado `.env`.
3. Abra `.env` e configure `OPENAI_API_KEY` com sua chave. **Nunca publique ou envie esse arquivo ao GitHub.**
4. O padrão usa `OPENAI_BASE_URL=https://api.openai.com/v1` e `OPENAI_MODEL=gpt-4o-mini`. Se usar outro provedor, configure a URL-base e o modelo conforme a documentação dele; ele precisa ser compatível com Chat Completions e com resposta JSON.
5. No terminal, dentro da pasta do projeto, execute `npm start`.
6. Abra `http://localhost:3000`.
7. Entre em **Demonstração IA**, selecione ou cadastre um pet, escreva uma mensagem fictícia e clique em **Interpretar mensagem com IA generativa**.
8. Confira a intenção e a categoria sugerida; revise os protocolos e, se o pet estiver cadastrado, crie a ação na jornada.
9. Execute `npm test` para os testes automatizados básicos.

Abrir o arquivo `index.html` diretamente não ativa o backend nem a API. A demonstração real exige conexão com a internet e uma chave/modelo válidos.

## 7. Arquitetura e persistência

Consulte [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md) e [`docs/SPRINT4_IMPLEMENTACAO_IA.md`](docs/SPRINT4_IMPLEMENTACAO_IA.md).

O backend e a chamada externa à API de IA estão implementados. Pets, análises e jornadas continuam armazenados no `localStorage` do navegador. **Não existe banco de dados remoto nem integração com prontuário clínico real nesta versão**; não apresentamos esses componentes como implementados.

## 8. Segurança e limitações

- A chave fica no backend, no arquivo local `.env`; o servidor publica apenas `index.html` e os arquivos de `assets/`.
- O backend limita o tamanho da mensagem e valida categorias permitidas.
- Não use dados reais sensíveis de clientes na apresentação. Prefira exemplos fictícios.
- Respostas de IA podem conter erros e devem ser verificadas.
- O sistema não diagnostica, não prescreve e não substitui o médico-veterinário.
- A integração foi desenvolvida para provedores compatíveis com Chat Completions. Um provedor com formato diferente exige adaptação.

## 9. Estrutura do projeto

```text
CLYVO_VET_SPRINT4/
├── index.html
├── server.js
├── package.json
├── .env.example
├── .gitignore
├── LINKS.txt
├── assets/
│   ├── app.js
│   ├── logo.svg
│   └── style.css
├── docs/
│   ├── ARQUITETURA.md
│   ├── CHECKLIST_ENTREGA.md
│   ├── DADOS_E_IA.md
│   ├── DOCUMENTACAO_IA.md
│   ├── ROTEIRO_PITCH.md
│   ├── ROTEIRO_PITCH_SPRINT4.md
│   └── SPRINT4_IMPLEMENTACAO_IA.md
└── test/
    └── sprint4.test.js
```

## 10. Entrega

- **GitHub:** https://github.com/AltamirLima/clyvo-vet-sprint3
- **Vídeo Sprint 4:** ainda precisa ser gravado com a IA real configurada, publicado no YouTube como **Não listado**, e inserido no `LINKS.txt` e neste README.

Antes de entregar, configure a chave no ambiente de demonstração, execute os testes, teste cenários de sucesso e falha, grave o vídeo e valide a integridade do ZIP.

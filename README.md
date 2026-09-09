# CLYVO VET — Sprint 3

Projeto acadêmico da disciplina **Disruptive Architectures: IoT, IoB & Generative IA**.

## Integrantes

- **Olavo Porto Neves** — RM 563558
- **Altamir Lima** — RM 562906
- **Felipe Conte** — RM 562248
- **Luiz Gustavo** — RM 564495
- **Pedro Henrique Dias França** — RM 561940

## 1. Proposta

O CLYVO VET acompanha a jornada contínua de cuidado veterinário. O Motor Inteligente utiliza regras parametrizadas para identificar protocolos aplicáveis ao contexto de cada pet, priorizar ações e transformar recomendações em obrigações futuras acompanháveis.

O objetivo é aproximar a recomendação da execução: **dados → decisão explicável → ação → jornada de cuidado**.

> **Guardrail clínico:** o protótipo não realiza diagnóstico, prescrição ou opinião clínica. Questões clínicas devem ser direcionadas ao profissional veterinário.

## 2. Problema de negócio

Uma recomendação ou retorno pode ser identificado durante o cuidado, mas não necessariamente se transforma em uma ação concluída pelo tutor e pela clínica. Isso dificulta a continuidade do acompanhamento.

O componente inteligente reduz essa lacuna ao transformar critérios do pet e eventos de cuidado em uma recomendação com **protocolo, prioridade, prazo e justificativa**, que pode iniciar uma jornada individual.

## 3. Abordagem de IA

A solução utiliza um **motor de regras inteligentes / sistema baseado em regras parametrizadas**.

A abordagem foi escolhida por oferecer:

- explicabilidade e rastreabilidade;
- decisões previsíveis dentro dos critérios cadastrados;
- priorização por nível e prazo;
- possibilidade de parametrizar novos protocolos;
- limite claro de atuação, sem substituir a avaliação veterinária.

A documentação completa está em [`docs/DOCUMENTACAO_IA.md`](docs/DOCUMENTACAO_IA.md).

## 4. Funcionalidades

- Dashboard com indicadores e itens que precisam de atenção;
- cadastro, consulta, busca e filtros de pets;
- visualização do perfil e histórico de análises/jornadas;
- demonstração interativa do Motor Inteligente;
- cenários rápidos de análise;
- 10 protocolos parametrizados e explicáveis;
- prioridade e prazo por protocolo;
- criação de jornadas a partir das recomendações;
- arquitetura com fluxo entre aplicação, API, banco e IA;
- catálogo de dados, origem, estrutura e uso;
- jornada em 5 etapas: **Prevista → Notificada → Respondida → Agendada → Cumprida**;
- persistência local das demonstrações por `localStorage`.

## 5. Dados utilizados

O modelo considera perfil do pet, histórico clínico, vacinas, consultas, medicamentos, comportamento/interações e eventos registrados. No protótipo, parte desse contexto é representada por campos estruturados e eventos simulados.

Consulte [`docs/DADOS_E_IA.md`](docs/DADOS_E_IA.md) para o catálogo completo.

## 6. Arquitetura

```text
Tutor / Clínica
      ↓
Aplicação CLYVO VET
      ↓
API / Camada de aplicação
      ↕
Banco de dados
      ↓
Motor de regras inteligentes
      ↓
Protocolos parametrizados
      ↓
Recomendação → Jornada de cuidado
```

O diagrama detalhado está em [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md).

### Observação sobre o protótipo

Esta entrega é uma **demonstração funcional/simulada** do componente de IA. O front-end roda diretamente no navegador e usa `localStorage` como persistência local. API e banco aparecem na arquitetura como componentes da solução proposta, mas não são serviços remotos implementados nesta versão.

## 7. Tecnologias

- HTML5
- CSS3
- JavaScript
- LocalStorage
- SVG
- Mermaid (diagrama arquitetural na documentação)

## 8. Como executar

1. Clone ou baixe este repositório.
2. Abra a pasta no VS Code.
3. Abra `index.html` em um navegador moderno ou utilize a extensão Live Server.
4. Navegue pelos menus Dashboard, Pets, Demonstração da IA, Protocolos, Arquitetura, Dados & IA e Jornada.
5. Para demonstrar o fluxo completo: selecione um pet → **Analisar com IA** → execute a análise → **Criar ações de cuidado na jornada** → avance as etapas da jornada.

Não são necessárias dependências ou instalação de servidor para a demonstração front-end.

## 9. Estrutura

```text
CLYVO_VET_SPRINT3_FINAL_COMPLETO/
├── index.html
├── assets/
│   ├── app.js
│   ├── logo.svg
│   └── style.css
├── docs/
│   ├── ARQUITETURA.md
│   ├── CHECKLIST_ENTREGA.md
│   ├── DADOS_E_IA.md
│   ├── DOCUMENTACAO_IA.md
│   └── ROTEIRO_PITCH.md
├── .gitignore
├── LINKS.txt
└── README.md
```

## 10. Documentação da entrega

- [`docs/DOCUMENTACAO_IA.md`](docs/DOCUMENTACAO_IA.md) — problema, abordagem, dados, personalização, decisão e guardrail.
- [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md) — diagrama e fluxo de integração.
- [`docs/DADOS_E_IA.md`](docs/DADOS_E_IA.md) — catálogo de dados e estratégia de uso.
- [`docs/ROTEIRO_PITCH.md`](docs/ROTEIRO_PITCH.md) — roteiro para o vídeo de aproximadamente 5 minutos.
- [`docs/CHECKLIST_ENTREGA.md`](docs/CHECKLIST_ENTREGA.md) — conferência dos requisitos do Sprint 3.

## 11. Links para entrega

**GitHub:** https://github.com/AltamirLima/clyvo-vet-sprint3

**Vídeo YouTube não listado:** preencher após a gravação e publicação.

## 12. Resultado parcial

O protótipo permite demonstrar o ciclo completo da proposta: cadastro/contexto do pet, execução do motor, identificação de protocolos, explicação da decisão, criação de obrigações e acompanhamento da jornada.

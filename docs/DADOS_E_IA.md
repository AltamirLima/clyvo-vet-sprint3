# Dados e Inteligência — CLYVO VET

## Catálogo de dados

| Categoria | Origem | Exemplo de estrutura | Finalidade |
|---|---|---|---|
| Perfil | Cadastro do pet | nome, espécie, raça, porte, idade | Personalização |
| Histórico clínico | Atendimento | registros de consultas | Contexto |
| Vacinação | Atendimento | evento/data | Ações preventivas |
| Consultas | Agenda/atendimento | evento/data/status | Continuidade |
| Medicamentos | Atendimento | registro estruturado | Contexto |
| Comportamento | Interações | eventos de interação | Acompanhamento |
| Eventos | Aplicação | tipo/status/data | Acionamento de regras |
| Protocolos | Base de conhecimento | SE → ENTÃO + prazo + prioridade | Decisão |
| Jornadas | Aplicação | pet + protocolo + status + eventos | Execução |

## Estratégia

O motor não tenta inferir uma condição médica. Ele identifica **obrigações de acompanhamento** a partir de critérios configurados.

### Exemplo de regra

```text
SE idade >= 7 anos
ENTÃO recomendar Check-up geriátrico
     prioridade = ALTA
     prazo = 180 dias
     justificar a recomendação
```

### Rastreabilidade

Cada análise salva registra o contexto utilizado e os protocolos encontrados. Quando o usuário escolhe criar a ação de cuidado, a recomendação fica vinculada a uma jornada individual do pet.

## Benefícios

- Tutor: recebe próximos passos mais organizados.
- Clínica: acompanha pendências e oportunidades de continuidade.
- Pet: favorece a manutenção de cuidados preventivos e retornos.

# Roteiro de pitch — CLYVO VET Sprint 4 (~5 minutos)

> Grave a demonstração com o servidor iniciado e uma chave de API válida configurada. Use dados fictícios. Não mostre o arquivo .env nem a chave da API na gravação.

## 0:00–0:35 — Abertura e problema
“Olá, somos a equipe do CLYVO VET. Nosso projeto busca apoiar a continuidade do cuidado veterinário. Um problema comum é a informação ou recomendação não se transformar em uma ação acompanhada. Nesta Sprint 4, evoluímos o protótipo para incluir uma funcionalidade real de IA generativa integrada à aplicação.”

## 0:35–1:15 — O que a IA faz
“A IA recebe uma mensagem escrita em linguagem natural pelo tutor, interpreta a intenção e sugere uma categoria de acompanhamento, como vacinação, retorno, controle de peso ou acompanhamento preventivo. Ela não consulta prontuários externos e não inventa datas. A resposta é estruturada e validada pelo backend.”

## 1:15–2:00 — Demonstração real da IA
“Na seção Demonstração IA, selecionamos um pet e digitamos uma mensagem: ‘Não lembro quando foi a última vacina do meu cachorro. Pode me ajudar a organizar o acompanhamento?’. Agora clicamos em Interpretar mensagem com IA generativa. A aplicação envia a mensagem ao backend, que chama a API configurada. A resposta volta com a intenção e uma categoria sugerida.”

[Mostrar a mensagem, clicar no botão e aguardar a resposta real da API. Não simular o resultado.]

## 2:00–2:45 — Motor de regras e personalização
“A IA generativa não toma sozinha a decisão de protocolo. Ela interpreta a mensagem; em seguida, o motor de regras determinístico compara a categoria com os critérios cadastrados. Assim, o sistema apresenta protocolo, prioridade, prazo e justificativa de forma explicável. Também corrigimos os gatilhos dos protocolos odontológico, geriátrico e felino.”

## 2:45–3:30 — Integração e arquitetura
“O fluxo é: interface CLYVO VET, backend Node.js, API de IA generativa, validação da resposta, motor de regras, protocolos e jornada do cuidado. A chave da API fica no backend em uma variável de ambiente, nunca no JavaScript do navegador. Os pets, análises e jornadas continuam armazenados localmente no navegador, por localStorage; ainda não existe banco remoto nesta versão.”

## 3:30–4:20 — Jornada e valor
“Depois da análise, podemos criar ações de cuidado para um pet cadastrado e acompanhar a jornada. Isso aproxima a interpretação da mensagem de uma ação operacional. O tutor recebe apoio para organizar o acompanhamento e a clínica ganha uma forma mais clara de estruturar retornos e próximos passos.”

[Mostrar um pet cadastrado, executar a análise e criar a ação na jornada.]

## 4:20–5:00 — Segurança, testes e encerramento
“A IA é uma ferramenta de apoio, não substitui o veterinário. Não diagnostica, não prescreve e encaminha dúvidas clínicas ao profissional. Implementamos tratamento para falhas da API e testes automatizados básicos; antes da entrega, validamos a chave, o modelo e os cenários de uso. Essa é a evolução do CLYVO VET na Sprint 4: IA generativa integrada à aplicação, combinada com regras explicáveis para apoiar a continuidade do cuidado. Obrigado.”

## Checklist antes de gravar
- [ ] Chave configurada localmente em .env e não visível na tela.
- [ ] npm start executado e aplicação aberta em http://localhost:3000.
- [ ] API testada com sucesso antes de iniciar a gravação.
- [ ] Usar uma mensagem fictícia e aguardar a resposta real.
- [ ] Demonstrar criação da jornada.
- [ ] Duração final próxima de 5 minutos.

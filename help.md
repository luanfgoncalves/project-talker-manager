Testes:

Executando todos os testes
Para poder executar os testes, inicie sua aplicação com npm run dev, em seguida, basta executar o comando npm test e todos os seus testes serão executados.

Executando um teste específico
Para executar um teste expecífico, inicie sua aplicação com npm run dev, em seguida, basta executar o comando npm test nome-do-teste.

Colocamos o número do requisito como pré-fixo para facilitar, veja abaixo.

Ex: Para executar o teste referente ao 01-getAllTalkers, basta digitar npm test 01.

npm run dev
npm test 01
	.
	.
	.
npm test 08


npm run restore -> restaura talker.json

---------------

HTTP status:

200 - OK
201 - Created with sucess
403 - Forbidden
404 - Not Found
500 - Internal server Error

--------------

// ---- Requisições por requisito ----

// 1 - Crie o endpoint GET /talker
// 2 - Crie o endpoint GET /talker/:id
// 3 - Crie o endpoint POST /login
// 4 - Adicione as validações para o endpoint /login
// 5 - Crie o endpoint POST /talker
// 6 - Crie o endpoint PUT /talker/:id
// 7 - Crie o endpoint DELETE /talker/:id
// 8 - Crie o endpoint GET /talker/search?q=searchTerm

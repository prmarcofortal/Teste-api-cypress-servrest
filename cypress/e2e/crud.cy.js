

describe('Testes da Funcionalidade crud', () => {

    it('Deve listar todos os usuarios', () => {
        cy.api({
            method: 'GET',
            url: 'https://serverest.dev/usuarios'
        }).then((response) => {

            expect(response.status).to.equal(200)
        })
    });

    it('Deve cadastrar um usuario com sucesso', () => {
        // Função para gerar um nome aleatório
        function gerarNome() {
            const nomes = ["Fulano", "Ciclano", "Beltrano", "João", "Maria"];
            const sobrenomes = ["da Silva", "Pereira", "Oliveira", "Santos"];
            const nome = nomes[Math.floor(Math.random() * nomes.length)];
            const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
            return `${nome} ${sobrenome}`;
        }

        // Função para gerar um email aleatório
        function gerarEmail() {
            const prefixo = Math.random().toString(36).substring(2, 8);
            return `${prefixo}@qa.com.br`;
        }

        // Corpo da requisição com dados dinâmicos
        const usuario = {
            nome: gerarNome(),
            email: gerarEmail(),
            password: "teste",
            administrador: "true"
        };

        // Enviando requisição para cadastrar o usuário
        cy.api({
            method: 'POST',
            url: 'https://serverest.dev/usuarios', // Adicione a URL correta do seu endpoint
            body: usuario,
        }).then((response) => {
            // Validações de status code
            expect(response.status).to.equal(201); // Supondo que o status code de sucesso seja 201

            // Validações adicionais (ex: conteúdo da resposta)
            expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');

        });
    });

    it('Deve listar todos os usuarios', () => {
        cy.api({
            method: 'GET',
            url: 'https://serverest.dev/usuarios/FcxCq7KTZT0J1hNu'
        }).then((response) => {

            expect(response.status).to.equal(200)
           
        })
    });

    it('Deve editar um usuário já cadastrado', () => {
        // Função para gerar um ID aleatório de 16 caracteres
        function gerarIdAleatorio() {
            return Math.random().toString(36).substring(2, 18);
        }

        const idAleatorio = gerarIdAleatorio();

        cy.api({
            method: 'PUT',
            url: `https://serverest.dev/usuarios/${idAleatorio}`, // usa o ID aleatório aqui
            body: {
                "nome": "Fulano da Silva",
                "email": `beltrano${Math.floor(Math.random() * 10000)}@qa.com.br`, // gera um e-mail aleatório
                "password": "teste",
                "administrador": "true"
            }
        }).then(response => {
            expect(response.body.message).to.equal('Cadastro realizado com sucesso');
        });
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
        // Função para gerar um ID aleatório de 16 caracteres
        function gerarIdAleatorio() {
            return Math.random().toString(36).substring(2, 18);
        }
    
        const idAleatorio = gerarIdAleatorio();
    
        // Primeiro, cria um usuário dinamicamente
        cy.api({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            body: {
                "nome": "Fulano da Silva",
                "email": `beltrano${Math.floor(Math.random() * 10000)}@qa.com.br`,
                "password": "teste",
                "administrador": "true"
            }
        }).then((response) => {
            const idCriado = response.body._id; // Recupera o ID do usuário criado
    
            // Agora deleta o usuário criado
            cy.api({
                method: 'DELETE',
                url: `https://serverest.dev/usuarios/${idCriado}` // usa o ID recém-criado
            }).then(response => {
                expect(response.body.message).to.equal('Registro excluído com sucesso');
                expect(response.status).to.equal(200);
            });
        });
    });
    
});





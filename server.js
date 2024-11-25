import express from 'express';
import routes from './src/routes/postsRouters.js';

// Cria uma instância do aplicativo Express.
const app = express();

// Configura um middleware para servir arquivos estáticos da pasta 'uploads'.
// Isso permite que o servidor sirva imagens e outros arquivos armazenados nessa pasta.
app.use(express.static('uploads'));

// Chama a função 'routes' para registrar as rotas do aplicativo.  A função 'routes' provavelmente é exportada por './src/routes/postsRouters.js'
routes(app);

// Inicia o servidor na porta 3000 e imprime uma mensagem no console quando o servidor estiver ouvindo.
app.listen(3000, () => {
    console.log('Servidor escutando na porta 3000...');
});
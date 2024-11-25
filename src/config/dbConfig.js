import { MongoClient } from 'mongodb';

// Função assíncrona para conectar ao banco de dados MongoDB.
// Recebe a string de conexão como argumento.
export default async function conectarAoBanco(stringConexao) {
  let mongoClient;

  try {
    // Cria um novo cliente MongoClient com a string de conexão fornecida.
    mongoClient = new MongoClient(stringConexao);

    // Imprime uma mensagem no console indicando que a conexão está sendo estabelecida.
    console.log('Conectando ao cluster do banco de dados...');

    // Tenta estabelecer a conexão com o banco de dados.
    await mongoClient.connect();

    // Imprime uma mensagem de sucesso no console após a conexão.
    console.log('Conectado ao MongoDB Atlas com sucesso!');

    // Retorna o cliente MongoClient para uso posterior.
    return mongoClient;
  } catch (erro) {
    // Em caso de erro, imprime uma mensagem de erro no console e encerra o processo.
    console.error('Falha na conexão com o banco!', erro);
    process.exit(); // Encerra a aplicação se houver erro na conexão.
  }
}
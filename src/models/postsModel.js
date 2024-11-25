import 'dotenv/config';
import conectarAoBanco from '../config/dbConfig.js';
import { ObjectId } from "mongodb";

// Conecta ao banco de dados MongoDB usando a string de conexão do arquivo '.env'.
// Esta linha deve ser executada apenas uma vez na inicialização da aplicação.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função para obter todos os posts da coleção 'posts'.
// Conecta ao banco de dados e à coleção, e retorna todos os documentos como um array.
export async function getTodosPosts() {
    const db = conexao.db('imersao-instabytes'); // Seleciona o banco de dados
    const colecao = db.collection('posts');     // Seleciona a coleção
    return colecao.find().toArray();           // Retorna todos os documentos como um array
}

// Função para criar um novo post na coleção 'posts'.
// Recebe um objeto 'novoPost' contendo os dados do novo post.
// Insere o novo post na coleção e retorna o resultado da operação (incluindo o ID gerado).
export async function criarPost(novoPost) {
    const db = conexao.db('imersao-instabytes');
    const colecao = db.collection('posts');
    return colecao.insertOne(novoPost);          // Insere o novo documento
}

// Função para atualizar um post existente na coleção 'posts'.
// Recebe o ID do post (como string hexadecimal) e um objeto 'novoPost' com os dados atualizados.
// Converte o ID de string hexadecimal para um ObjectId do MongoDB.
// Atualiza o post com os novos dados usando o operador $set.
// Retorna o resultado da operação (afetando o número de documentos e status).
export async function atualizarPost(id, novoPost) {
    const db = conexao.db('imersao-instabytes');
    const colecao = db.collection('posts');
    const objID = ObjectId.createFromHexString(id); // Converte string hexadecimal para ObjectId
    return colecao.updateOne({_id: objID}, {$set: novoPost}); // Atualiza o documento
}
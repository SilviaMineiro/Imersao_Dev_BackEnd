import {getTodosPosts, criarPost, atualizarPost} from '../models/postsModel.js';
import fs from 'fs';
import gerarDescricaoComGemini from '../services/geminiService.js';

// Função para listar todos os posts.
// Utiliza o modelo 'postsModel' para obter todos os posts do banco de dados.
// Retorna um JSON com o status 200 (sucesso) e a lista de posts.
export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
}

// Função para criar um novo post.
// Recebe os dados do novo post no corpo da requisição (req.body).
// Utiliza o modelo 'postsModel' para criar o novo post no banco de dados.
// Retorna um JSON com o status 200 (sucesso) e o post criado.
// Trata erros com um bloco try...catch, retornando um JSON com status 500 (erro do servidor) em caso de falha.
export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try{
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message); // Loga a mensagem de erro no console
        res.status(500).json({'Erro':'Falha na requisição'});
    }
}

// Função para fazer upload de uma imagem e criar um novo post.
// Recebe a imagem através do objeto 'req.file' (provavelmente usando um middleware de upload de arquivos).
// Cria um novo post com a URL da imagem e uma descrição vazia inicialmente.
// Move a imagem para a pasta 'uploads' renomeando-a com o ID gerado pelo banco de dados.
// Retorna um JSON com o status 200 (sucesso) e o post criado.
// Trata erros com um bloco try...catch, retornando um JSON com status 500 (erro do servidor) em caso de falha.  Note o uso de `fs.renameSync`, que pode ser substituído por uma versão assíncrona para melhor performance em aplicações maiores.
export async function uploadImagem(req, res) {
    const novoPost = {
        descrição: '',
        imgUrl: req.file.originalname, // Nome original do arquivo
        alt: ''
    };
    try{
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`; // Usa o ID gerado como nome do arquivo
        fs.renameSync(req.file.path, imagemAtualizada); // Move e renomeia o arquivo
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({'Erro':'Falha na requisição'});
    }
}

// Função para atualizar um post existente.
// Recebe o ID do post como parâmetro de rota (req.params.id).
// Lê a imagem do arquivo, gera uma descrição usando o serviço Gemini.
// Atualiza o post com a URL da imagem, a descrição gerada e a tag ALT (recebida no corpo da requisição).
// Utiliza o modelo 'postsModel' para atualizar o post no banco de dados.
// Retorna um JSON com o status 200 (sucesso) e o post atualizado.
// Trata erros com um bloco try...catch, retornando um JSON com status 500 (erro do servidor) em caso de falha.
export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
        
    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`); // Lê o buffer da imagem
        const descricao = await gerarDescricaoComGemini(imgBuffer); // Gera a descrição usando o serviço Gemini

        const post = {
            imgUrl:urlImagem, 
            descricao: descricao,
            alt: req.body.alt
        };
       
        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({'Erro':'Falha na requisição'});
    }
}
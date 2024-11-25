import express from 'express';
import multer from 'multer';
import {listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from '../controlles/postsControllers.js';
import cors from 'cors';

const corsOptions = {
    origin:'http://localhost:8000', 
    optionsSuccessStatus: 200
}

// Configuração do Multer para armazenamento de arquivos.  Esta configuração define onde os arquivos serão salvos e como serão nomeados.
// Usando diskStorage para definir a pasta de destino e o nome do arquivo.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Define a pasta de destino para uploads
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Mantém o nome original do arquivo
    }
});

// Cria uma instância do Multer com a configuração de armazenamento.
// `dest` especifica a pasta de uploads (opcional se diskStorage for usado).
const upload = multer({ dest: "./uploads", storage });


const routes = (app) => {
    app.use(express.json()); // Habilita o middleware para processar corpos JSON nas requisições
    
    app.use(cors(corsOptions));

    // Rota GET para listar todos os posts.
    app.get('/posts', listarPosts);

    // Rota POST para criar um novo post.
    app.post('/posts', postarNovoPost);

    // Rota POST para upload de imagens.
    // O middleware `upload.single('imagem')` processa o upload de um único arquivo com o nome "imagem".
    app.post('/upload', upload.single('imagem'), uploadImagem);

    // Rota PUT para atualizar um post.  O parâmetro :id identifica o post a ser atualizado.
    app.put('/upload/:id', atualizarNovoPost);
};

export default routes;
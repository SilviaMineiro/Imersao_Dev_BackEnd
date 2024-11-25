import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializa a API do Google Generative AI com a chave API do ambiente.  **IMPORTANTE:** Nunca coloque chaves API diretamente no código!
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Seleciona o modelo Gemini 1.5 Flash.
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// Função assíncrona para gerar a descrição da imagem usando o modelo Gemini.
// Recebe o buffer da imagem como argumento.
export default async function gerarDescricaoComGemini(imageBuffer) {
  // Prompt para gerar a descrição.
  const prompt = "Gere uma descrição em português do brasil para a seguinte imagem";

  try {
    // Prepara os dados da imagem para envio à API. Converte o buffer para base64.
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };

    // Gera o conteúdo usando o modelo Gemini.
    const res = await model.generateContent([prompt, image]);

    // Retorna o texto gerado ou uma mensagem padrão caso não haja texto.
    return res.response.text() || "Alt-text não disponível.";
  } catch (erro) {
    // Registra o erro no console e lança uma exceção com uma mensagem mais amigável.
    console.error("Erro ao obter alt-text:", erro.message, erro);
    throw new Error("Erro ao obter o alt-text do Gemini.");
  }
}
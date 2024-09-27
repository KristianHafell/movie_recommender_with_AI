const OpenAI = require('openai');
const { config } = require('dotenv');
config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY_t,
  });

async function getEmbedding(representation) {

    try {
        const response = await openai.embeddings.create({
          model: "text-embedding-3-small",
          input: representation,
          encoding_format: "float",
        });

        const embeddingArray = response.data[0].embedding;

        // Convert the array to a Float32Array and reshape it
        const embedding = Array.isArray(embeddingArray) ? embeddingArray : [];
        
        return embedding;
    } catch (error) {
        console.error('Error fetching embedding:', error);
    }
} module.exports = { getEmbedding };

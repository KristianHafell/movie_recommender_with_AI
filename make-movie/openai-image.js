const { OpenAI } = require('openai');
const { config } = require('dotenv');
config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY_t,
  });

async function getPoster(systemQuery, userQuery) {
    try {
        console.log('start-image:', systemQuery);
        let image = await openai.images.generate({
            model: "dall-e-3",
            prompt: `${systemQuery} ${userQuery}`,
            size: '1024x1792',
        });
        console.log('end-image:', userQuery);

        return image.data[0].url;
    } catch (error) {
        console.error('Error fetching embedding:', error);
    }
} module.exports = { getPoster };
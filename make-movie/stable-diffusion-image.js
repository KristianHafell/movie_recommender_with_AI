const { HfInference } = require("@huggingface/inference");
const fs = require('fs');
const { config } = require('dotenv');
config();

const HF_ACCESS_TOKEN = process.env.HF_TOKEN;

const inference = new HfInference(HF_ACCESS_TOKEN);

async function getImage(title) {
    try {

        const data = {
            inputs: "a realistic poster with the centered small title " + title,
            parameters: {
                height: 900,
                width: 600,
            },
        };

        const result = await inference.textToImage({
            data: data,
            model: "black-forest-labs/FLUX.1-dev",
        });
        const arrayBuffer = await result.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        fs.writeFile('public/image.png', buffer, (err) => {if (err) {} else {}});
    } catch (error) {
        console.error('Error fetching embedding:', error);
    }
} module.exports = { getImage };

// getImage("a horse fly", "dragon");
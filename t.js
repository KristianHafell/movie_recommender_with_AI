const { HfInference } = require("@huggingface/inference");
const { config } = require('dotenv');
config();

const inference = new HfInference(process.env.HF_TOKEN);

async function main() {
    console.log("inference", inference);
    const result = await inference.textToImage({
        data: "a realistic poster with the centered small title " + "a horse fly",
        model: "stabilityai/stable-diffusion-2",
        parameters: {
            negative_prompt: "blurry image",
        },
    });
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFile('public/image.png', buffer, (err) => {if (err) {} else {}});
}
main();
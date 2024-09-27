const OpenAI = require('openai');
const { config } = require('dotenv');
config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY_t,
  });

async function getText(systemQuery, userQuery) {
    try {

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: systemQuery },
                {
                    role: "user",
                    content: userQuery,
                },
            ],
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching embedding:', error);
    }
} module.exports = { getText };
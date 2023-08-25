const express = require('express');
const fetch = require('node-fetch')

const API_KEY = "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";


const app = express()

const PORT = 3000 || 4000

app.use(express.json())


app.post("/chat/completions", async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: "user",
                    content: req.body.message
                }
            ]
        })
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data.choices[0].message.content)
    } catch (error) {
        console.error(error);
    }
})

app.post("/genrate/image", async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            prompt: req.body.message,
            n:4,
            size:"1024x1024"
        })
    }

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", options)
        const data =await response.json()
        res.send(data)
    } catch (error) {
        console.error(error);
    }
 
})


app.listen(PORT, () => {
    console.log(`Your server running on PORT ${PORT}`);
})
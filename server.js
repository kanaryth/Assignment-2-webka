import express from 'express';
import { getRandomUserData } from './core.js';

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/user', async (req, res) => {
    try {
    const user = await getRandomUserData();
    res.json(user);
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

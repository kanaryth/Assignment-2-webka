import express from 'express';
import dotenv from 'dotenv';
import { getFullUserData } from './core.js';

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/api/user', async (req, res) => {
    try {
    const userData = await getFullUserData();
    res.json(userData);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
}
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

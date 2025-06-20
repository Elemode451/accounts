import express from 'express';
import { addToUser, getDeepUserInfo, getUserInfo, loginUser, registerUser, USERS_TO_ACCOUNT } from './routes';

const app = express();
const PORT = process.env.PORT || 3000;
  
app.use(express.json());

app.get('/', (_req: any, res: any) => {
  res.send(JSON.stringify(Object.fromEntries(USERS_TO_ACCOUNT)));
});

app.post('/api/register', registerUser);
app.post('/api/addAccount', addToUser);
app.post('/api/login', loginUser);
app.get('/api/userInfo', getUserInfo);
app.get('/api/deepUserInfo', getDeepUserInfo);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

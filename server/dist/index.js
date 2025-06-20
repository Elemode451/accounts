"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send(JSON.stringify(Object.fromEntries(routes_1.USERS_TO_ACCOUNT)));
});
app.post('/api/register', routes_1.registerUser);
app.post('/api/addAccount', routes_1.addToUser);
app.post('/api/login', routes_1.loginUser);
app.get('/api/userInfo', routes_1.getUserInfo);
app.get('/api/deepUserInfo', routes_1.getDeepUserInfo);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBOEI7QUFDOUIscUNBQThHO0FBRTlHLE1BQU0sR0FBRyxHQUFHLElBQUEsaUJBQU8sR0FBRSxDQUFDO0FBQ3RCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUV0QyxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUV4QixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQVMsRUFBRSxHQUFRLEVBQUUsRUFBRTtJQUNuQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyx5QkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqRSxDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLHFCQUFZLENBQUMsQ0FBQztBQUN4QyxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLGtCQUFTLENBQUMsQ0FBQztBQUN2QyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxrQkFBUyxDQUFDLENBQUM7QUFDbEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsb0JBQVcsQ0FBQyxDQUFDO0FBQ3RDLEdBQUcsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsd0JBQWUsQ0FBQyxDQUFDO0FBRTlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQy9ELENBQUMsQ0FBQyxDQUFDIn0=
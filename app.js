import express from 'express';
import cors from 'cors';
import session from 'express-session';
import expressMySQLSession from 'express-mysql-session';
import pool from './src/config/database.js';

import EncierroRoutes from './src/routes/encierro.routes.js';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['X-Renewed-Token'],
}))

app.use(express.json());
app.use(express.static('public'));

const MySQLStore = expressMySQLSession(session);
const sessionStore = new MySQLStore({
    clearExpired: true,
    checkExpirationInterval: 900000, // 15 minutos
    expiration: 86400000
}, pool);

app.use(session({
    key: 'gestion_session',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
        maxAge: 86400000
    }
}));

app.use("/api/encierros", EncierroRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API del sistema avícola funcionando correctamente."
    });
});

export default app;
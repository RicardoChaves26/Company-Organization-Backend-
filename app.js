import express from 'express';
import cors from 'cors';

import EncierroRoutes from './src/routes/encierro.routes.js';
import LoteRoutes from './src/routes/lote.routes.js';
import InventarioRoutes from './src/routes/inventario.routes.js';
import AlimentacionRoutes from './src/routes/alimentacion.routes.js';
import MantenimientoRoutes from "./src/routes/mantenimiento.routes.js";
import VentaRoutes from "./src/routes/venta.routes.js";
import FleteRoutes from "./src/routes/flete.routes.js";
import UsuarioRoutes from "./src/routes/usuario.routes.js";
import AuthRoutes from "./src/routes/auth.routes.js";

import { validarSesion } from './src/middlewares/auth.middleware.js';

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

app.use('/api/auth', AuthRoutes);

app.use(validarSesion);

app.use("/api/encierros", EncierroRoutes);
app.use("/api/lotes", LoteRoutes);
app.use("/api/inventario", InventarioRoutes);
app.use("/api/alimentacion", AlimentacionRoutes);
app.use("/api/mantenimiento", MantenimientoRoutes);
app.use("/api/venta", VentaRoutes);
app.use("/api/flete", FleteRoutes);
app.use("/api/usuario", UsuarioRoutes);



app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API del sistema avícola funcionando correctamente."
    });
});

export default app;
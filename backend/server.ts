import express from "express";
import cors from "cors";
import resultRoutes from "./routes/result.route.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", resultRoutes);

app.get("/health", (req, res) => {
    res.json({ 
        status: "ok", 
        service: "Result Intelligence API",
        timestamp: new Date().toISOString()
    });
});

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
    console.log(`📡 Health check: http://localhost:${port}/health`);
});

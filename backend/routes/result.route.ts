import express from "express";
import multer from "multer";
import path from "path";
import { parsePDF } from "../services/parser.service.js";
import { extractData } from "../services/extractor.service.js";

const router = express.Router();

// Configure Multer for PDF uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"));
        }
    }
});

/**
 * Endpoint: POST /api/process-result
 * Logic: Save PDF -> Extract Text -> Parse JSON -> Return Results
 */
router.post("/process-result", upload.single("file"), async (req: any, res: any) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: "No file uploaded" });
        }

        // 1. Extract raw text from the uploaded PDF
        const rawText = await parsePDF(req.file.path);

        // 2. Transorm raw text into structured student objects
        const students = extractData(rawText);

        // 3. Send the structured data back to the frontend
        res.json({
            success: true,
            count: students.length,
            students: students
        });

    } catch (error: any) {
        console.error("Result Processing API Error:", error);
        res.status(500).json({ 
            success: false, 
            error: "Failed to process results", 
            message: error.message 
        });
    }
});

export default router;

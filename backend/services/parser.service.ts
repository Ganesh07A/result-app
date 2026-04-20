import fs from "fs";
import { PDFParse } from "pdf-parse";

/**
 * Reads a PDF file from the given path and extracts its raw text.
 * Automatically handles cleaning up the temporary file after extraction.
 * 
 * @param filePath Path to the PDF file in the uploads directory
 * @returns Promise resolving to the raw text content of the PDF
 */
export async function parsePDF(filePath: string): Promise<string> {
    try {
        const data = fs.readFileSync(filePath);
        const parser = new PDFParse({ data });
        const result = await parser.getText();
        
        // Clean up the temporary file from the uploads directory
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        // Explicitly destroy the parser instance to free up memory
        await parser.destroy();
        
        return result.text;
    } catch (error: any) {
        console.error("Error in parsePDF service:", error);
        throw new Error("Failed to extract text from PDF: " + error.message);
    }
}

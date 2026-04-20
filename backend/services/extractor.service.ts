export interface StudentResult {
    roll_no: string;
    name: string;
    sgpa: number | null;
    result: string | null;
    marks: number[];
    performance: string;
    failedSubjectsCount: number;
}

/**
 * Intelligent parsing service for university result PDFs.
 * Uses block-based splitting to handle complex/messy multi-line result formats.
 * 
 * @param text The raw text extracted from the PDF result document
 * @returns An array of structured StudentResult objects
 */
export function extractData(text: string): StudentResult[] {
    console.log("--- DEBUG: Extraction Started ---");
    console.log("Total Text Length:", text.length);
    console.log("Text Sample (First 500 chars):", text.substring(0, 500));

    // Handle both Windows (\r\n) and Unix (\n) newlines
    const normalizedText = text.replace(/\r\n/g, "\n");
    
    // Each student block starts with a 12-14 digit seat number/roll number
    // We use a more flexible split that accounts for varying seat number lengths
    const studentBlocks = normalizedText.split(/\n(?=\d{12,15})/);
    
    console.log("Total Blocks Detected:", studentBlocks.length);

    const students: StudentResult[] = [];

    studentBlocks.forEach((block, index) => {
        // 1. Extract Roll No (12-14 digits)
        const rollMatch = block.match(/(\d{12,15})/);
        if (!rollMatch) {
            if (index > 0) console.log(`Block ${index}: No roll number match found`);
            return;
        }

        const roll_no = rollMatch[1];

        // 2. Extract Name
        // Based on DBATU format: RollNo NAME CollegeCode...
        // We look for everything between the roll number and the next set of digits (College Code)
        const afterRoll = block.substring(block.indexOf(roll_no) + roll_no.length).trim();
        const headerParts = afterRoll.split(/\s{2,}/); // Names are usually separated by multiple spaces from the next section
        const name = headerParts[0] ? headerParts[0].replace(/[0-9]/g, '').trim() : "Unknown Student";

        // 3. Independent SGPA and Status Lookup
        const sgpaMatch = block.match(/(\d+\.\d{2})/);
        const resultMatch = block.match(/(PASS|FAIL|ATKT)/i);
        
        const sgpa = sgpaMatch ? parseFloat(sgpaMatch[1]) : null;
        const result = resultMatch ? resultMatch[1].toUpperCase() : null;

        // 4. Extract Marks
        // Capture 2-3 digit marks that aren't part of the roll number
        const marksMatches = block.match(/\b\d{2,3}\b/g);
        let marks: number[] = [];
        
        if (marksMatches) {
            marks = marksMatches
                .map(Number)
                .filter(val => val <= 100 && val >= 0); 
            
            // Heuristic for DBATU: Marks usually start after the student info line
            // We take a slice of middle values to avoid grabbing header/footer noise
            marks = marks.length > 5 ? marks.slice(0, 10) : marks;
        }

        // 5. Data Performance Enhancement
        const failedSubjectsCount = marks.filter(m => m < 40).length;
        
        let performance = "N/A";
        if (sgpa) {
            if (sgpa >= 8.0) performance = "Excellent";
            else if (sgpa >= 6.5) performance = "Good";
            else if (sgpa >= 5.0) performance = "Average";
            else performance = "Poor";
        }

        if (index === 0) {
            console.log("--- DEBUG: First Block Analysis ---");
            console.log("Roll:", roll_no, "| Name:", name);
            console.log("SGPA:", sgpa, "| Result:", result);
            console.log("Marks detected:", marks.length);
        }

        students.push({
            roll_no,
            name,
            sgpa,
            result,
            marks,
            performance,
            failedSubjectsCount
        });
    });

    console.log("Extraction Finished. Valid Students Found:", students.length);
    return students;
}

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
    // Each student block starts with a 12-digit seat number/roll number
    const studentBlocks = text.split(/\n(?=\d{12})/);

    const students: StudentResult[] = [];

    studentBlocks.forEach(block => {
        // 1. Extract Roll No (12-digit) and Name (following characters until newline or noise)
        const headerMatch = block.match(/^(\d{12})\s+([A-Z\s]+)/);
        if (!headerMatch) return;

        const roll_no = headerMatch[1];
        const name = headerMatch[2].trim();

        // 2. Extract SGPA and Status (e.g. "6.98 PASS" or "4.20 FAIL")
        const sgpaMatch = block.match(/(\d+\.\d{2})\s+(PASS|FAIL)/);
        const sgpa = sgpaMatch ? parseFloat(sgpaMatch[1]) : null;
        const result = sgpaMatch ? sgpaMatch[2] : null;

        // 3. Extract Marks (2-3 digit numbers located within the block)
        // We filter out common false positives like the seat number components
        const marksMatches = block.match(/\b\d{2,3}\b/g);
        let marks: number[] = [];
        
        if (marksMatches) {
            marks = marksMatches
                .map(Number)
                .filter(val => val <= 100 && val !== Number(roll_no.substring(0, 3))); 
        }

        // 4. Data Performance Enhancement
        const failedSubjectsCount = marks.filter(m => m < 40).length;
        
        let performance = "N/A";
        if (sgpa) {
            if (sgpa >= 8.0) performance = "Excellent";
            else if (sgpa >= 6.5) performance = "Good";
            else if (sgpa >= 5.0) performance = "Average";
            else performance = "Poor";
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

    return students;
}

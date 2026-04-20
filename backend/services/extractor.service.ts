export interface SubjectResult {
    code: string;
    name: string;
    ese: number | string;
    internal: number | string;
    mid: number | string;
    total: number | string;
    grade: string;
    grade_point: number | null;
    credit: number;
}

export interface StudentResult {
    roll_no: string;
    name: string;
    college: string;
    sgpa: number | null;
    result: string | null;
    total_marks: number | null;
    subjects: SubjectResult[];
    performance: string;
    failedSubjectsCount: number;
}

const SUBJECTS = [
    { code: "BTAIC501", name: "CNCC", credit: 4 },
    { code: "BTAIC502", name: "ML", credit: 3 },
    { code: "BTAIHM503B", name: "Business Comm", credit: 3 },
    { code: "BTAIL506", name: "ML Lab + CP Lab", credit: 2 },
    { code: "BTAIM507", name: "Mini Project", credit: 2 },
    { code: "BTAIOE505C", name: "Software Eng", credit: 4 },
    { code: "BTAIPE504A", name: "Advanced DBMS", credit: 4 },
];

export function extractData(text: string): StudentResult[] {
    console.log("--- DEBUG: Detailed Extraction Started ---");
    
    const normalizedText = text.replace(/\r\n/g, "\n");
    const studentBlocks = normalizedText.split(/\n(?=\d{12,15})/);
    const students: StudentResult[] = [];

    studentBlocks.forEach((block, index) => {
        const rollMatch = block.match(/(\d{12,15})/);
        if (!rollMatch) return;

        const roll_no = rollMatch[1];

        // 1. Name & College Extraction
        const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        let name = "Unknown Student";
        let college = "Unknown College";

        // Heuristic: Name is usually on the same line as the roll number, college is on the following line
        const headerIndex = lines.findIndex(l => l.includes(roll_no));
        if (headerIndex !== -1) {
            const headerLine = lines[headerIndex];
            const namePart = headerLine.substring(headerLine.indexOf(roll_no) + roll_no.length).trim();
            // Clean up name
            name = namePart.split(/\s{2,}/)[0].split("/")[0].replace(/[0-9]/g, '').replace(/[-_]/g, '').trim();
            
            if (headerIndex + 1 < lines.length) {
                 college = lines[headerIndex + 1].split("   ")[0].trim(); // Take first part
            }
        }

        // 2. Global Results
        const sgpaMatch = block.match(/(\d+\.\d{2})/);
        const resultMatch = block.match(/(PASS|FAIL|ATKT)/i);
        const totalMarksMatch = block.match(/\b([3-6]\d{2})\b/); // Marks out of 700 usually in 300-600 range
        
        const sgpa = sgpaMatch ? parseFloat(sgpaMatch[1]) : null;
        const result = resultMatch ? resultMatch[1].toUpperCase() : null;
        const total_marks = totalMarksMatch ? parseInt(totalMarksMatch[1]) : null;

        // 3. Subject & Grades Extraction
        const subjects: SubjectResult[] = [];
        const gradeMatches = [...block.matchAll(/(\d+\.?\d*)\/([A-Z]{2})\/(\d+\.?\d*)/g)];
        
        // Find numerical rows to attempt mapping ESE, Internal, MID, Total
        // Rows with numbers separated by spaces
        const numberRows = lines.filter(l => /^[\d\s]+$/.test(l.replace(/[|]/g, '').trim()));
        
        // Very basic mapping assumption based on typical DBATU structure (ese, internal, mid, total)
        // If it's too messy, we default to string or empty
        let eseRow: number[] = [];
        let intRow: number[] = [];
        let midRow: number[] = [];
        let totRow: number[] = [];

        if (numberRows.length >= 4) {
            // Take the last 4 number-only rows before the results string
            const relevantRows = numberRows.slice(-4).map(r => r.split(/\s+/).filter(n => n !== "").map(Number));
            eseRow = relevantRows[0];
            intRow = relevantRows[1];
            midRow = relevantRows[2];
            totRow = relevantRows[3];
        }

        let failedSubjectsCount = 0;

        for (let i = 0; i < SUBJECTS.length; i++) {
            const template = SUBJECTS[i];
            
            // Map Grades
            const gradeData = gradeMatches[i];
            const grade = gradeData ? gradeData[2] : "N/A";
            const grade_point = gradeData ? parseFloat(gradeData[1]) : null;
            
            if (grade === "FF") failedSubjectsCount++;

            // Map Marks loosely (allow "N/A" if misalignment happens due to missing columns)
            const ese = eseRow[i] !== undefined ? eseRow[i] : "N/A";
            const internal = intRow[i] !== undefined ? intRow[i] : "N/A";
            const mid = midRow[i] !== undefined ? midRow[i] : "N/A";
            
            // Total marks might be reliably the 4th row, or we can try to find them independently. 
            // Often, if totRow is full, we use it. Else fallback.
            const total = totRow[i] !== undefined ? totRow[i] : (grade_point ? "Pass" : "N/A");

            subjects.push({
                code: template.code,
                name: template.name,
                ese,
                internal,
                mid,
                total,
                grade,
                grade_point,
                credit: template.credit
            });
        }

        // 4. Performance String
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
            college,
            sgpa,
            result,
            total_marks,
            subjects,
            performance,
            failedSubjectsCount
        });
    });

    console.log(`Extraction Finished. Found ${students.length} students.`);
    return students;
}

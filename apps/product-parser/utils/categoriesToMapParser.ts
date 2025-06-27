import fs from 'fs';

function parseGPCFileToMap(filePath: string): Map<string, number> {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const lines = raw.split(/\r?\n/);

    const result = new Map<string, number>();

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const match = line.match(/^(\d+)\s*-\s*(.+)$/);
        if (!match) {
            console.warn(`Pominięto niepoprawną linię: ${line}`);
            continue;
        }

        const id = parseInt(match[1], 10);
        const name = match[2].trim();

        result.set(name, id);
    }

    return result;
}

function saveMapToJsonFile(map: Map<string, number>, outputPath: string): void {
    const obj: Record<string, number> = {};
    for (const [name, id] of map) {
        obj[name] = id;
    }

    fs.writeFileSync(outputPath, JSON.stringify(obj, null, 2), 'utf-8');
}

export const readCategoriesFileAndSafeAsMap = (inputPath: string, outputPath: string) => {
    const gpcMap = parseGPCFileToMap(inputPath);
    saveMapToJsonFile(gpcMap, outputPath);
}
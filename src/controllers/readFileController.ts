import fs from "fs";
import path from "path";

export const readFileSyncExample = (fileName: string): string | null => {
  try {
    if (!fs.existsSync(fileName)) {
      console.error("File not found:", fileName);
      return null;
    }
    return fs.readFileSync(fileName, "utf-8"); // Return a Buffer (binary data)
  } catch (err) {
    console.error("Error reading file:", err);
    return null;
  }
};

export const readFileASyncExample = (
  fileName: string
): Promise<Buffer | null> => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

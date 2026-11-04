import fs from "fs";
import path from "path";

const src1 = "C:/Users/Ayush/.gemini/antigravity/brain/ef956f95-1972-48a6-8fd4-6288d3f4ef79/.user_uploaded/media_1793721596278_9e19c6a8.jpg";
const src2 = "C:/Users/Ayush/.gemini/antigravity/brain/ef956f95-1972-48a6-8fd4-6288d3f4ef79/.user_uploaded/media_1793721758480_6c0c97b2.jpg";

const dest1 = path.resolve("./public/team/person1.jpg");
const dest2 = path.resolve("./public/team/person2.jpg");

fs.copyFileSync(src1, dest1);
console.log(`Copied Ayush photo to ${dest1}`);

fs.copyFileSync(src2, dest2);
console.log(`Copied Kishori photo to ${dest2}`);


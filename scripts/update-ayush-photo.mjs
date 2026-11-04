import fs from "fs";
import path from "path";

const src = "C:/Users/Ayush/.gemini/antigravity/brain/ef956f95-1972-48a6-8fd4-6288d3f4ef79/.user_uploaded/media_1793728513929_8553e91d.jpg";
const dest = path.resolve("./public/team/person1.jpg");

fs.copyFileSync(src, dest);
console.log(`Successfully updated Ayush's photo at ${dest}`);


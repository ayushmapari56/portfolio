import fs from "fs";
import path from "path";
import https from "https";

const projDir = path.resolve("./public/projects");

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed: ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => file.close(() => resolve(dest)));
    }).on("error", reject);
  });
}

const extra = [
  {
    url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
    dest: path.join(projDir, "project-7.jpg"),
  },
  {
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
    dest: path.join(projDir, "project-8.jpg"),
  },
];

for (const item of extra) {
  try {
    await downloadFile(item.url, item.dest);
    console.log(`Downloaded ${item.dest}`);
  } catch (e) {
    console.error(e);
  }
}


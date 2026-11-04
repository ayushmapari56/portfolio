import fs from "fs";
import path from "path";
import https from "https";

const teamDir = path.resolve("./public/team");
const projDir = path.resolve("./public/projects");

fs.mkdirSync(teamDir, { recursive: true });
fs.mkdirSync(projDir, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => {
        file.close(() => resolve(dest));
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
}

// Curated high quality neutral portraits & sleek technology mockups
const images = [
  {
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    dest: path.join(teamDir, "person1.jpg"),
  },
  {
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    dest: path.join(teamDir, "person2.jpg"),
  },
  {
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    dest: path.join(projDir, "project-1.jpg"),
  },
  {
    url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
    dest: path.join(projDir, "project-2.jpg"),
  },
  {
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    dest: path.join(projDir, "project-3.jpg"),
  },
  {
    url: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=1000&q=80",
    dest: path.join(projDir, "project-4.jpg"),
  },
  {
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    dest: path.join(projDir, "project-5.jpg"),
  },
  {
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    dest: path.join(projDir, "project-6.jpg"),
  },
];

async function main() {
  console.log("Downloading high-quality placeholder images...");
  for (const item of images) {
    try {
      await downloadFile(item.url, item.dest);
      console.log(`Saved: ${item.dest}`);
    } catch (err) {
      console.error(`Error saving ${item.dest}:`, err.message);
    }
  }
  console.log("Done!");
}

main();


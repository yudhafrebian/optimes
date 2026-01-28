import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/lib", "users.json");

export function readUsers() {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function writeUsers(users: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

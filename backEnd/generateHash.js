import bcrypt from "bcrypt";

async function generateHash() {
  const password = "3mo-eslam";
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log("Bcrypt Hash:", hash);
}

generateHash();

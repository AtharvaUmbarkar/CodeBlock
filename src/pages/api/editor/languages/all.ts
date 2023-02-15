import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const readLanguages = async (file: string) => {
  const languages = await fs.readFile(file, "utf8");
  return JSON.parse(languages);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const languagesDirectory = path.join(
    process.cwd(),
    "public/editor/languages/lannguages.json"
  );
  const response = await readLanguages(languagesDirectory).catch((e) =>
    console.log(e)
  );
  res.status(200).json(response);
};

export default handler;

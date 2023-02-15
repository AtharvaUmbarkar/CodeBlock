import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const readTheme = async (file: string) => {
  const theme = await fs.readFile(file + ".json", "utf8");
  return JSON.parse(theme);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { theme } = req.query;
  if (!theme) {
    return res.status(400).json("theme not found");
  }

  const themeFile = path.join(
    process.cwd(),
    "public/editor/themes",
    theme as string
  );
  const response = await readTheme(themeFile).catch((e) => console.log(e));
  res.status(200).json(response);
};

export default handler;

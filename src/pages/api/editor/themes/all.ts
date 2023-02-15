import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

interface ThemesInterface {
  [key: string]: object;
}

const readThemes = async (directory: string) => {
  let themeData: ThemesInterface = {};
  let themeNames: string[] = [];
  const files = await fs.opendir(directory);
  for await (const file of files) {
    const theme = await fs.readFile(directory + "/" + file.name, "utf8");
    let themeName = path.parse(file.name).name;
    themeNames.push(themeName);
    if (themeName === "themelist") continue;
    themeName = themeName.replaceAll(" ", "-");
    themeName = themeName.replaceAll("_", "-");
    themeName = themeName.replaceAll("(", "");
    themeName = themeName.replaceAll(")", "");
    themeData[themeName] = {
      data: JSON.parse(theme),
      name: path.parse(file.name).name,
    };
  }
  return themeData;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const themesDirectory = path.join(process.cwd(), "public/editor/themes");
  const response = await readThemes(themesDirectory).catch((e) =>
    console.log(e)
  );
  res.status(200).json(response);
};

export default handler;

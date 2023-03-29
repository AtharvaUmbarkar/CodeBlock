import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const reqUrl = process.env.BACKEND_URL + "/backend/user/get-user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(400).json({ success: false, message: "You must be logged in." });
    return;
  }
  try {
    let response = await fetch(reqUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authID: session.user.id,
      }),
    });
    response = await response.json();
    
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(error);
    return;
  }
};

export default handler;

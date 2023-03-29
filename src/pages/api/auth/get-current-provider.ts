import { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "src/lib/mongodb";
import { ObjectID } from "bson";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = new ObjectID(req.body.id);
  try {
    const db = (await clientPromise)
      .db("CodeBlock-Auth")
      .collection("accounts");
    const account = await db.findOne({
      userId: userId,
    });
    res.status(200).json({ success: true, provider: account?.provider });
    return;
  } catch (errors) {
    console.log(errors);
    res.status(400).json({ success: false, errors: errors });
    return;
  }
};

export default handler;

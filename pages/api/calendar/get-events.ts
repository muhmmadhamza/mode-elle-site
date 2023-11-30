import { NextApiHandler } from "next";
import axios from "axios";

const handler: NextApiHandler = async (req, res) => {
  const domain =
    process.env.NODE_ENV === "production"
      ? "https://www.example.com"
      : "http://localhost:3000";

  const { data } = await axios.get(`${domain}/api/my-mode-elle/calendar`);

  return res.json(data);
};

export default handler;

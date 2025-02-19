import express, { Request, Response } from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "dist")));

// Catch-all handler to serve index.html for any requests not matched by static files
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});

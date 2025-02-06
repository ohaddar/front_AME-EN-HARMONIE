interface Config {
  SECRET_KEY: string;
  BASE_URL: string;
}

const config: Config = {
  SECRET_KEY: import.meta.env.VITE_SECRET_KEY || "",
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "",
};

if (!config.SECRET_KEY) {
  throw new Error("❌ SECRET_KEY is not defined in environment variables!");
}
if (!config.BASE_URL) {
  throw new Error("❌ BASE_URL is not defined in environment variables!");
}

export default config;

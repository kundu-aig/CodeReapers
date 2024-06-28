module.exports = {
  apps: [
    {
      name: "backend",
      script: "npm",
      args: "start",
      cwd: "./backend",
      env: {
        PORT: 14002,
        NODE_ENV: "production",
        MONGO_URL:"mongodb+srv://kundu221997:kundu221997@cluster0.cgtx8qr.mongodb.net/",
        JWT_SECRET: "riteshnitincodeappears1234@"
      },
    },
    {
      name: "frontend",
      script: "npm",
      args: "start",
      cwd: "./frontend",
      env: {
        PORT: 14001,
        NODE_ENV: "production",
        NEXT_PUBLIC_API_BASE_URL: "http://15.207.5.235",
        NEXT_PUBLIC_WEBSITE_URL: "http://15.207.5.235",
      },
    },
  ],
};

type RequiredEnv = {
  token: string;
  clientId: string;
  guildId: string;
};

function readRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function loadEnv(): RequiredEnv {
  return {
    token: readRequiredEnv("DISCORD_TOKEN"),
    clientId: readRequiredEnv("CLIENT_ID"),
    guildId: readRequiredEnv("GUILD_ID"),
  };
}

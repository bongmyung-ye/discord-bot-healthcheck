export type AppEnv = {
  token: string;
  clientId: string;
  guildId: string;
};

function readEnv(name: string) {
  const value = process.env[name];

  if (!value?.trim()) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export function loadEnv(): AppEnv {
  return {
    token: readEnv("DISCORD_TOKEN"),
    clientId: readEnv("CLIENT_ID"),
    guildId: readEnv("GUILD_ID"),
  };
}
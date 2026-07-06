# Discord Bot Healthcheck

Discord 봇 운영 환경을 빠르게 점검하기 위한 작은 TypeScript 유틸 봇입니다.

서버에 올린 봇이 정상적으로 로그인되어 있는지, 지연 시간이나 업타임, 메모리 사용량이 어떤지 간단하게 확인할 수 있습니다.

## Features

- `/health` 명령어로 봇 상태 확인
- WebSocket ping 확인
- 업타임 확인
- 메모리 사용량 확인
- 서버 수 확인
- Node.js / discord.js 버전 확인
- `/about` 명령어로 봇 정보 확인
- TypeScript + discord.js v14 기반

## Tech Stack

- TypeScript
- Node.js
- discord.js
- dotenv

## Project Structure

```txt
src/
├─ commands/
│  ├─ about.ts
│  └─ health.ts
├─ utils/
│  ├─ env.ts
│  └─ format.ts
└─ index.ts
```

## Setup

```bash
npm install
```

`.env.example` 파일을 참고해서 `.env` 파일을 만듭니다.

```env
DISCORD_TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_application_id
GUILD_ID=your_test_guild_id
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Start

```bash
npm start
```

## Commands

### `/health`

현재 봇 상태를 private embed로 보여줍니다.

```txt
Status       Online
Ping         32ms
Uptime       2h 14m 8s
Memory       86.4 MB
Guilds       1
Node.js      v20.x
discord.js   14.x

서버 이전이나 재시작 후 봇 상태를 빠르게 확인할 때 사용할 수 있습니다.

### `/about`

봇의 목적과 사용 기술을 간단히 보여줍니다.

## Notes

이 프로젝트는 공개 저장소에 올려도 안전하도록 토큰이나 개인 설정값을 포함하지 않습니다.  
실제 운영 중인 Discord 봇에 healthcheck 명령어만 따로 옮겨서 사용할 수도 있습니다.

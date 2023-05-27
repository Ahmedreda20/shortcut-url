# Shortcut Links

## Setup

```CMD
npm install
```

To run application make sure that you changed database name, password, username, dialect and host from `src/config/config.json`

## Scripts

```JSON
...
{
    "start": "node dist/index.js",
    "dev": "nodemon --exec ts-node src/index.ts",
    "format": "prettier --write \"src/**/*.{ts,tsx}\"",
    "lint": "eslint \"src/**/*.{ts,tsx}\" --fix",
    "build": "rimraf dist && tsc",
    "tailwind:css": "npx tailwindcss -i ./src/public/styles/index.css -o ./src/public/styles/style.css --watch"
}
...
```

> You can add more pages as you want inside `src/views`, you should run `npm run tailwind:css` to watch new changes.

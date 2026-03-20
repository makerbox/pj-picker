# PJ Picker

React + Vite front end for `ersr.baby`. The app uses the Open-Meteo API to pull forecasts and recommend toddler pyjamas for the night ahead.

## Development

### Install

```bash
npm install
```

### Watch locally

```bash
npm run dev
```

Vite will start a local dev server with hot reload. Open the URL shown in the terminal, or use:

```bash
http://127.0.0.1:5173
```

If you want the app reachable on the local network:

```bash
npm run dev -- --host 0.0.0.0
```

### Run tests

```bash
npm run test:run
```

### Build production files

```bash
npm run build
```

The built front end is written to `dist/`.

## Project structure

This project follows the same high-level source layout used in the `launchcore-child` references:

- `src/index.jsx`
- `src/js/*`
- `src/scss/*`

The entry file imports the JS app entry and the layered SCSS index.

## Deploy to the VPS

Current live server:

- Host: `srv668708.hstgr.cloud`
- User: `root`
- Live domain: `ersr.baby`
- Web root: `/var/www/ersr`
- Nginx config: `/etc/nginx/conf.d/ersr.conf`

### 1. Build locally

```bash
npm run build
```

### 2. Upload the built files

From the project root:

```bash
scp -r dist/* root@srv668708.hstgr.cloud:/var/www/ersr/
```

### 3. Fix permissions on the VPS

```bash
ssh root@srv668708.hstgr.cloud "chmod -R a+rX /var/www/ersr"
```

This matters because unreadable asset files can cause the page to look blank.

### 4. Check and reload Nginx

```bash
ssh root@srv668708.hstgr.cloud "nginx -t && systemctl reload nginx"
```

### 5. Verify the deployed assets

```bash
ssh root@srv668708.hstgr.cloud "curl -k -I https://localhost/assets/index-*.js -H 'Host: ersr.baby'"
```

Or just open `https://ersr.baby`.

## Current Nginx behavior

The site is configured as a static single-page app:

- HTTP redirects to HTTPS
- HTTPS serves `/var/www/ersr`
- unknown routes fall back to `/index.html`

## Backups

Before the old live site was replaced, a backup was created on the VPS:

- `/root/backups/ersr-site-20260320-122926.tar.gz`
- `/root/backups/ersr.conf.20260320-122926`

## Notes

- The current TLS certificate for `ersr.baby` is expired and should be renewed separately.
- SCSS currently uses `@import` to match the requested reference architecture, so Sass will show deprecation warnings during builds.

# Setflow

Mobile-first web app prototype for prompt-led Spotify playlist creation.

## Current version

- Static PWA shell: `index.html`, `styles.css`, `app.js`
- Mock music library and playlist generation logic as a fallback
- Prompt parsing for duration, genre/mood tags, source preference, and rising energy arcs
- Spotify OAuth PKCE flow using the supplied public Client ID
- Live fetches for top tracks, liked tracks, playlist tracks, recently played tracks, and targeted catalog search
- Private playlist creation through Spotify when generated tracks have Spotify URIs
- Smart additions toggle to choose between strict selected-source generation and catalog expansion

## Hosting notes

- The app is fully static — host `index.html`, `callback.html`, `app.js`, `styles.css`, `manifest.json`, `icon.svg`, and `service-worker.js` on any HTTPS static host (GitHub Pages works, including project subpaths).
- The OAuth redirect URI is resolved relative to the app directory, so register `<host>/<path>/callback.html` in the Spotify developer dashboard for every origin/path you deploy to.
- Tokens are stored in `localStorage` on the client. That is acceptable for a PKCE-only prototype; a production backend should own token refresh and playlist writes.

## Real Spotify wiring

The backend should own token refresh and playlist writes. The client can stay almost unchanged.

1. Use Spotify Authorization Code with PKCE.
2. Request narrow scopes first: `user-top-read`, `user-library-read`, `user-read-recently-played`, `playlist-modify-private`, and `playlist-modify-public`.
3. Normalize tracks from:
   - `GET /me/top/tracks`
   - `GET /me/tracks`
   - `GET /me/player/recently-played`
   - `GET /me/playlists` and `GET /playlists/{id}/items`
   - targeted `GET /search` catalog lookups based on the prompt
4. Create playlists with `POST /me/playlists`.
5. Add items with `POST /playlists/{playlist_id}/items`.

## Product constraints

- Do not stream Spotify audio inside this app for the first launch path.
- Do not train AI models on Spotify content.
- Treat broad Spotify access as a business/platform approval risk, separate from the app build.

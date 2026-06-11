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

## AI prompt understanding (optional)

The built-in prompt parser is regex-based and only understands anticipated vibes. The sparkle button in the top bar lets you add an Anthropic API key to upgrade the pipeline:

- Claude parses any free-form prompt into the intent object (tags, energy bounds, era limits, exclude/require terms) and generates tailored Spotify search queries.
- After the heuristic scorer selects candidates, Claude re-judges the actual songs by name, drops vibe-breakers, and orders the set to the requested energy arc.
- Default model is `claude-opus-4-8` (best quality); `claude-haiku-4-5` is offered as a faster, cheaper option. Calls go directly from the browser to `api.anthropic.com` (CORS opt-in header), and the key is stored in `localStorage` only.
- Without a key, or if a call fails, everything falls back to the heuristic pipeline.

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

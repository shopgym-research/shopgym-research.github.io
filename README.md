# shopgym-research.github.io

Project page for **ShopGym: An Integrated Framework for Realistic Simulation and Scalable
Benchmarking of E-Commerce Web Agents** ([arXiv:2605.16116](https://arxiv.org/abs/2605.16116)).

A static, dependency-free single-page site (HTML + CSS + a small vanilla-JS file) served via
GitHub Pages.

- `index.html` — page markup (hero, overview, pipeline, skill catalog, live sandbox shops, results, code, citation).
- `styles.css` — modern light theme.
- `script.js` — copy-to-clipboard, mobile nav, active-section highlighting, figure lightbox.
- `assets/` — figures and screenshots extracted from the paper PDF plus the repo's pipeline diagram.

Code: <https://github.com/agentic-foundation-modeling-research/shop-gym>

## Sandbox shop demo videos

The three cards in the **Live sandbox shops** section play a YouTube demo on click
(click-to-load facade — no YouTube request until the user presses play, via
`youtube-nocookie.com`). To wire a video, paste its 11-character YouTube ID into the
matching card's `data-youtube-id="…"` attribute in `index.html`
(e.g. `https://youtu.be/dQw4w9WgXcQ` → `data-youtube-id="dQw4w9WgXcQ"`).
Until an ID is set, the poster screenshot shows the play button but does nothing.

## Local preview

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

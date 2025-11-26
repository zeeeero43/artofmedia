/**
 * Pre-Rendering Script für artofmedia-marketing.de
 * Generiert statische HTML-Dateien für alle Routen
 */

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { createServer } from 'http';
import handler from 'serve-handler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Alle Routen die pre-rendered werden sollen
const routes = [
  '/',
  '/webdesign-ecommerce',
  '/ki-automatisierungen',
  '/beratung-strategie',
  '/print-folie',
  '/licht-leuchttechnik',
  '/google-marketing',
  '/marketing-agentur-duisburg',
  '/impressum',
  '/datenschutz'
];

const PORT = 5555;
const DIST_DIR = join(__dirname, 'dist');

async function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      return handler(req, res, {
        public: DIST_DIR,
        rewrites: [{ source: '**', destination: '/index.html' }]
      });
    });
    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function prerender() {
  console.log('Starting pre-rendering...\n');

  // Start local server
  const server = await startServer();

  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (const route of routes) {
      console.log(`Pre-rendering: ${route}`);

      const page = await browser.newPage();

      // Navigate and wait for content
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Wait for React to render
      await page.waitForSelector('#root > *', { timeout: 10000 });

      // Additional wait for animations to settle
      await new Promise(r => setTimeout(r, 1000));

      // Get rendered HTML
      const html = await page.content();

      // Determine output path
      const outputPath = route === '/'
        ? join(DIST_DIR, 'index.html')
        : join(DIST_DIR, route, 'index.html');

      // Create directory if needed
      const outputDir = dirname(outputPath);
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
      }

      // Write HTML file
      writeFileSync(outputPath, html);
      console.log(`  ✓ Saved: ${outputPath}`);

      await page.close();
    }

    console.log('\n✅ Pre-rendering complete!');

  } finally {
    await browser.close();
    server.close();
  }
}

prerender().catch(console.error);

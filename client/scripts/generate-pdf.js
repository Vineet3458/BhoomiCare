import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDF() {
  console.log('Starting Puppeteer to generate PDF...');
  
  // Launch a headless browser
  const browser = await puppeteer.launch({
    headless: 'new'
  });
  
  const page = await browser.newPage();
  
  // Change to match your dev server URL
  const targetUrl = 'http://localhost:5173/';
  console.log(`Navigating to ${targetUrl}...`);
  
  try {
    // Wait until network is idle
    await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Wait for the main dashboard features to load completely 
    await page.waitForSelector('.hero-pattern', { timeout: 10000 });
    
    // You can customize the PDF options here
    // e.g., A4 format, keep background colors enabled, specify margins
    const outputPath = path.join(__dirname, '..', 'bhoomi-care-report.pdf');
    
    console.log('Generating PDF at:', outputPath);
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm'
      }
    });
    
    console.log('PDF generated successfully!');
  } catch (error) {
    console.error('Error generating PDF:', error.message);
    console.error('Make sure your Vite development server is running and accessible at', targetUrl);
  } finally {
    await browser.close();
  }
}

generatePDF();

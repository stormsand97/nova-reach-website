import puppeteer from 'puppeteer';
import { exec } from 'child_process';

(async () => {
    console.log('Starting dev server...');
    const child = exec('npm run dev');

    child.stdout.on('data', data => console.log(data.toString()));

    // Wait for the dev server to start
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
        console.log('Launching Puppeteer...');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // High resolution for crisp UI screenshots
        await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

        console.log('Navigating to app...');
        await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

        console.log('Waiting for elements to render...');
        await new Promise(resolve => setTimeout(resolve, 3000));

        const element = await page.$('.react-flow');
        if (element) {
            console.log('Taking screenshot of the flow diagram...');
            await element.screenshot({ path: '/Users/philippudaloy/Desktop/Novareach_Process_Flow.png' });
            console.log('Screenshot saved to Desktop/Novareach_Process_Flow.png');
        } else {
            console.log('Error: Could not find the .react-flow element on the page.');
        }

        await browser.close();
    } catch (error) {
        console.error('Error during capture:', error);
    } finally {
        child.kill();
        process.exit();
    }
})();

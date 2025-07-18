const puppeteer = require('puppeteer');

class VercelDeployment {
  constructor() {
    this.repoUrl = 'https://github.com/davidmindsheep/mindsheeplabs-website';
    this.projectName = 'mindsheeplabs-website';
  }

  async deployToVercel() {
    console.log('🚀 Starting Vercel deployment automation...\n');

    // Check if we're in a headless environment
    if (!process.env.DISPLAY && !process.env.WAYLAND_DISPLAY) {
      this.showManualInstructions();
      return;
    }

    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1280, height: 720 },
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ]
    });

    try {
      const page = await browser.newPage();
      
      // Navigate to Vercel
      console.log('🌐 Opening Vercel...');
      await page.goto('https://vercel.com/new', { waitUntil: 'networkidle0' });
      
      // Wait for potential login
      await page.waitForTimeout(3000);
      
      console.log('🔐 Please complete the following steps in the browser:');
      console.log('1. Sign in with GitHub if not already logged in');
      console.log('2. Look for "Import Git Repository" section');
      console.log('3. Find and import: davidmindsheep/mindsheeplabs-website');
      console.log('4. Click "Deploy"');
      console.log('');
      console.log('⏳ Browser will stay open for 5 minutes...');
      
      // Keep browser open for manual interaction
      await page.waitForTimeout(300000); // 5 minutes
      
    } catch (error) {
      console.error('❌ Browser automation failed:', error.message);
      this.showManualInstructions();
    } finally {
      await browser.close();
    }
  }

  showManualInstructions() {
    console.log('📋 Manual Vercel Deployment Instructions:\n');
    console.log('🎯 Your GitHub repository is ready!');
    console.log(`   📁 Repository: ${this.repoUrl}`);
    console.log('');
    console.log('🚀 Deploy to Vercel:');
    console.log('1. Open: https://vercel.com/new');
    console.log('2. Sign in with GitHub');
    console.log('3. Under "Import Git Repository", find:');
    console.log('   📦 davidmindsheep/mindsheeplabs-website');
    console.log('4. Click "Import"');
    console.log('5. Project settings:');
    console.log('   - Framework: Next.js (auto-detected)');
    console.log('   - Build Command: npm run build (auto-detected)');
    console.log('   - Output Directory: .next (auto-detected)');
    console.log('6. Click "Deploy"');
    console.log('');
    console.log('⏱️ Expected deployment time: 2-3 minutes');
    console.log('🌐 Your live URL will be: https://mindsheeplabs-website.vercel.app');
    console.log('');
    console.log('✨ Features you\'ll get:');
    console.log('├── 🔒 Automatic HTTPS/SSL');
    console.log('├── 🌍 Global CDN distribution');
    console.log('├── ⚡ Edge runtime optimization');
    console.log('├── 📱 Perfect mobile performance');
    console.log('└── 🔄 Automatic deployments on future pushes');
  }
}

// Run deployment
const deployment = new VercelDeployment();
deployment.deployToVercel().catch(console.error);
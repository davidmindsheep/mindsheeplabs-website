const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class GitHubVercelAutomator {
  constructor() {
    this.projectName = 'mindsheeplabs-website';
    this.description = 'MindsheepLabs AI-powered marketing website built with Next.js 15';
    this.repoUrl = '';
  }

  async automateDeployment() {
    console.log('🚀 Starting automated GitHub + Vercel deployment...\n');

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
        '--disable-gpu',
        '--remote-debugging-port=9222'
      ]
    });

    try {
      // Step 1: Create GitHub repository
      console.log('📋 Step 1: Creating GitHub repository...');
      await this.createGitHubRepo(browser);

      // Step 2: Push code to GitHub
      console.log('📋 Step 2: Pushing code to GitHub...');
      await this.pushToGitHub();

      // Step 3: Deploy to Vercel
      console.log('📋 Step 3: Deploying to Vercel...');
      await this.deployToVercel(browser);

      console.log('\n🎉 Automated deployment complete!');
      
    } catch (error) {
      console.error('❌ Error during automation:', error.message);
      console.log('\n📋 Manual steps to complete:');
      console.log('1. Create GitHub repository manually');
      console.log('2. Push code: git push -u origin main');
      console.log('3. Deploy to Vercel manually');
    } finally {
      // Keep browser open for review
      console.log('\n⏳ Browser will stay open for 2 minutes for review...');
      await new Promise(resolve => setTimeout(resolve, 120000));
      await browser.close();
    }
  }

  async createGitHubRepo(browser) {
    const page = await browser.newPage();
    
    try {
      // Navigate to GitHub
      await page.goto('https://github.com/new', { waitUntil: 'networkidle0' });
      
      // Check if logged in
      const loginCheck = await page.$('input[name="repository[name]"]');
      if (!loginCheck) {
        console.log('🔐 Please log in to GitHub in the browser...');
        await page.goto('https://github.com/login', { waitUntil: 'networkidle0' });
        
        // Wait for login to complete
        await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 120000 });
        
        // Navigate to new repository page
        await page.goto('https://github.com/new', { waitUntil: 'networkidle0' });
      }

      // Fill in repository details
      await page.type('input[name="repository[name]"]', this.projectName);
      await page.type('input[name="repository[description]"]', this.description);
      
      // Make repository public
      await page.click('input[value="public"]');
      
      // Add README, .gitignore, and license
      await page.click('input[name="repository[auto_init]"]');
      
      // Create repository
      await page.click('button[type="submit"]');
      
      // Wait for repository to be created
      await page.waitForNavigation({ waitUntil: 'networkidle0' });
      
      // Get repository URL
      this.repoUrl = page.url();
      console.log(`✅ Created GitHub repository: ${this.repoUrl}`);
      
    } catch (error) {
      console.log('⚠️ GitHub repository creation failed:', error.message);
      throw error;
    }
  }

  async pushToGitHub() {
    const { execSync } = require('child_process');
    
    try {
      // Add GitHub remote
      const remoteUrl = `https://github.com/YOUR_USERNAME/${this.projectName}.git`;
      execSync(`git remote add origin ${remoteUrl}`, { stdio: 'inherit' });
      
      // Push to GitHub
      execSync('git push -u origin main', { stdio: 'inherit' });
      
      console.log('✅ Code pushed to GitHub successfully');
      
    } catch (error) {
      console.log('⚠️ GitHub push failed:', error.message);
      console.log('📋 Manual push required:');
      console.log(`git remote add origin https://github.com/YOUR_USERNAME/${this.projectName}.git`);
      console.log('git push -u origin main');
    }
  }

  async deployToVercel(browser) {
    const page = await browser.newPage();
    
    try {
      // Navigate to Vercel
      await page.goto('https://vercel.com', { waitUntil: 'networkidle0' });
      
      // Look for login/signup
      const loginButton = await page.$('a[href*="login"]');
      if (loginButton) {
        await loginButton.click();
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
      }
      
      // Wait for potential login
      await page.waitForTimeout(5000);
      
      // Look for "New Project" button
      const newProjectButton = await page.$('button:contains("New Project"), a:contains("New Project")');
      if (newProjectButton) {
        await newProjectButton.click();
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
      } else {
        // Navigate directly to new project page
        await page.goto('https://vercel.com/new', { waitUntil: 'networkidle0' });
      }
      
      // Look for GitHub integration
      const githubButton = await page.$('button:contains("GitHub"), a:contains("GitHub")');
      if (githubButton) {
        await githubButton.click();
        await page.waitForTimeout(3000);
      }
      
      // Look for repository import
      const importButton = await page.$(`button:contains("${this.projectName}"), a:contains("${this.projectName}")`);
      if (importButton) {
        await importButton.click();
        await page.waitForTimeout(2000);
        
        // Click deploy
        const deployButton = await page.$('button:contains("Deploy")');
        if (deployButton) {
          await deployButton.click();
          console.log('✅ Deployment started on Vercel');
        }
      }
      
    } catch (error) {
      console.log('⚠️ Vercel deployment automation failed:', error.message);
      console.log('📋 Manual Vercel deployment required:');
      console.log('1. Go to vercel.com');
      console.log('2. Sign up with GitHub');
      console.log('3. Import your repository');
      console.log('4. Click Deploy');
    }
  }
}

// Create automation instance
const automator = new GitHubVercelAutomator();

// Check if running in headless environment
if (process.env.DISPLAY || process.env.WAYLAND_DISPLAY) {
  // Run full automation
  automator.automateDeployment().catch(console.error);
} else {
  // Headless environment - provide instructions
  console.log('🚀 MindsheepLabs Deployment - Headless Mode\n');
  console.log('Since we\'re in a headless environment, here are the manual steps:\n');
  
  console.log('1. 📂 Create GitHub repository:');
  console.log('   - Go to https://github.com/new');
  console.log('   - Name: mindsheeplabs-website');
  console.log('   - Description: MindsheepLabs AI-powered marketing website built with Next.js 15');
  console.log('   - Make it public');
  console.log('   - Click "Create repository"\n');
  
  console.log('2. 🔗 Push code to GitHub:');
  console.log('   git remote add origin https://github.com/YOUR_USERNAME/mindsheeplabs-website.git');
  console.log('   git push -u origin main\n');
  
  console.log('3. 🚀 Deploy to Vercel:');
  console.log('   - Go to https://vercel.com');
  console.log('   - Sign up with GitHub');
  console.log('   - Click "New Project"');
  console.log('   - Import your mindsheeplabs-website repository');
  console.log('   - Click "Deploy"\n');
  
  console.log('✨ Your website will be live in under 2 minutes!');
  console.log('📋 For detailed instructions, see DEPLOYMENT.md');
}
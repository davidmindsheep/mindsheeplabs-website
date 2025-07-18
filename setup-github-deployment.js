const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class GitHubDeploymentSetup {
  constructor() {
    this.projectName = 'mindsheeplabs-website';
    this.description = 'MindsheepLabs AI-powered marketing website built with Next.js 15';
  }

  async setupGitHubIntegration() {
    console.log('🚀 Setting up GitHub integration for MindsheepLabs website...\n');

    try {
      // Step 1: Clean up repository
      console.log('📋 Step 1: Preparing repository...');
      await this.cleanupRepository();
      
      // Step 2: Check git status
      console.log('📋 Step 2: Checking git status...');
      this.checkGitStatus();
      
      // Step 3: Create production-ready commit
      console.log('📋 Step 3: Creating production-ready commit...');
      await this.createProductionCommit();
      
      // Step 4: Generate deployment instructions
      console.log('📋 Step 4: Generating deployment instructions...');
      await this.generateInstructions();
      
      console.log('\n🎉 GitHub integration setup complete!\n');
      
      this.showNextSteps();
      
    } catch (error) {
      console.error('❌ Error setting up GitHub integration:', error.message);
      process.exit(1);
    }
  }

  async cleanupRepository() {
    // Remove deployment helper files that aren't needed for production
    const filesToRemove = [
      'deploy-to-vercel.js',
      'deployment-helper.html',
      'deployment-server.js',
      'prepare-deployment.js',
      'mindsheeplabs-website-deployment.tar.gz'
    ];

    filesToRemove.forEach(file => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`✅ Removed ${file}`);
      }
    });

    // Remove deployment-package directory
    if (fs.existsSync('deployment-package')) {
      fs.rmSync('deployment-package', { recursive: true, force: true });
      console.log('✅ Removed deployment-package directory');
    }

    // Update .gitignore
    const gitignoreContent = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# deployment helpers (development only)
deploy-to-vercel.js
deployment-helper.html
deployment-server.js
prepare-deployment.js
deployment-package/
*.tar.gz
`;

    fs.writeFileSync('.gitignore', gitignoreContent);
    console.log('✅ Updated .gitignore');
  }

  checkGitStatus() {
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      if (status.trim()) {
        console.log('📝 Uncommitted changes found:');
        console.log(status);
      } else {
        console.log('✅ Repository is clean');
      }
    } catch (error) {
      console.log('⚠️ Git status check failed:', error.message);
    }
  }

  async createProductionCommit() {
    try {
      // Add all production files
      execSync('git add .', { stdio: 'inherit' });
      
      // Create commit
      const commitMessage = `Production-ready deployment with GitHub Actions

✨ Features:
- GitHub Actions workflow for automated deployment
- Vercel integration with preview deployments
- Production and preview environment separation
- Automated testing and linting
- Comprehensive deployment documentation

🚀 Ready for:
- Instant deployment to Vercel
- Automated CI/CD pipeline
- Preview deployments for PRs
- Custom domain configuration

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>`;

      execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
      console.log('✅ Created production-ready commit');
      
    } catch (error) {
      if (error.message.includes('nothing to commit')) {
        console.log('✅ Repository is already up to date');
      } else {
        console.log('⚠️ Commit failed:', error.message);
      }
    }
  }

  async generateInstructions() {
    const instructions = `# 🚀 MindsheepLabs - Ready for GitHub Deployment!

## Current Status: ✅ READY FOR DEPLOYMENT

Your MindsheepLabs website is now configured for automated deployment with GitHub and Vercel.

### 📦 What's Included:
- ✅ Next.js 15 with TypeScript
- ✅ GitHub Actions workflow
- ✅ Vercel deployment configuration
- ✅ Automated testing and linting
- ✅ Preview deployments for PRs
- ✅ Production deployment automation

### 🎯 Next Steps:

#### Option 1: GitHub Integration (Recommended)
1. **Create GitHub Repository:**
   \`\`\`bash
   # Add your GitHub repository as remote
   git remote add origin https://github.com/YOUR_USERNAME/${this.projectName}.git
   git push -u origin main
   \`\`\`

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **🎉 Done!** Your site will be live at \`https://your-project-name.vercel.app\`

#### Option 2: GitHub Actions (Advanced)
1. **Set up GitHub Secrets** (after creating repository):
   - Go to repository Settings → Secrets and variables → Actions
   - Add these secrets:
     - \`VERCEL_TOKEN\` - Your Vercel API token
     - \`VERCEL_ORG_ID\` - Your Vercel organization ID
     - \`VERCEL_PROJECT_ID\` - Your Vercel project ID

2. **Automated Workflow:**
   - Push to \`main\` → Production deployment
   - Create PR → Preview deployment with comment
   - Automatic builds and tests

### 🔧 Project Structure:
- \`/.github/workflows/deploy.yml\` - GitHub Actions workflow
- \`/DEPLOYMENT.md\` - Comprehensive deployment guide
- \`/vercel.json\` - Vercel configuration
- \`/README.md\` - Project documentation

### 🎨 Features:
- **Responsive Design** - Works on all devices
- **Fast Performance** - Optimized for speed
- **SEO Ready** - Search engine optimized
- **Modern Stack** - Latest Next.js and React

### 📋 Commands:
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run lint\` - Run linting
- \`npm run start\` - Start production server

---

**Your website is production-ready! 🎉**

For detailed instructions, see \`DEPLOYMENT.md\`.
`;

    fs.writeFileSync('DEPLOYMENT_STATUS.md', instructions);
    console.log('✅ Generated deployment instructions');
  }

  showNextSteps() {
    console.log('🎯 NEXT STEPS:');
    console.log('');
    console.log('1. 📂 Create GitHub repository:');
    console.log('   - Go to github.com/new');
    console.log(`   - Name: ${this.projectName}`);
    console.log(`   - Description: ${this.description}`);
    console.log('   - Create repository');
    console.log('');
    console.log('2. 🔗 Connect this repository:');
    console.log('   git remote add origin https://github.com/YOUR_USERNAME/mindsheeplabs-website.git');
    console.log('   git push -u origin main');
    console.log('');
    console.log('3. 🚀 Deploy to Vercel:');
    console.log('   - Go to vercel.com');
    console.log('   - Sign up with GitHub');
    console.log('   - Import your repository');
    console.log('   - Click "Deploy"');
    console.log('');
    console.log('📋 For detailed instructions, see DEPLOYMENT.md');
    console.log('📋 For current status, see DEPLOYMENT_STATUS.md');
    console.log('');
    console.log('✨ Your website will be live in under 2 minutes!');
  }
}

// Run the setup
const setup = new GitHubDeploymentSetup();
setup.setupGitHubIntegration().catch(console.error);
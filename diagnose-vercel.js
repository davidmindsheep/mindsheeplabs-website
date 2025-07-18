const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class VercelDiagnostics {
  constructor() {
    this.issues = [];
    this.suggestions = [];
  }

  async runDiagnostics() {
    console.log('🔍 Running Vercel Deployment Diagnostics...\n');
    
    this.checkPackageJson();
    this.checkNextConfig();
    this.checkVercelConfig();
    this.checkDependencies();
    this.checkBuildFiles();
    this.checkEnvironment();
    
    this.showResults();
  }

  checkPackageJson() {
    console.log('📋 Checking package.json...');
    
    if (!fs.existsSync('package.json')) {
      this.issues.push('❌ package.json missing');
      return;
    }

    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Check scripts
    if (!pkg.scripts?.build) {
      this.issues.push('❌ Build script missing');
      this.suggestions.push('Add "build": "next build" to scripts');
    } else {
      console.log('✅ Build script found');
    }

    // Check Next.js version
    const nextVersion = pkg.dependencies?.next;
    if (!nextVersion) {
      this.issues.push('❌ Next.js not found in dependencies');
    } else {
      console.log(`✅ Next.js version: ${nextVersion}`);
    }

    // Check React version
    const reactVersion = pkg.dependencies?.react;
    if (reactVersion) {
      console.log(`✅ React version: ${reactVersion}`);
    }
  }

  checkNextConfig() {
    console.log('📋 Checking Next.js configuration...');
    
    const configFiles = ['next.config.js', 'next.config.ts', 'next.config.mjs'];
    const configExists = configFiles.some(file => fs.existsSync(file));
    
    if (configExists) {
      console.log('✅ Next.js config found');
    } else {
      console.log('ℹ️  No Next.js config (optional)');
    }
  }

  checkVercelConfig() {
    console.log('📋 Checking Vercel configuration...');
    
    if (fs.existsSync('vercel.json')) {
      const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
      console.log('✅ vercel.json found');
      
      if (config.builds) {
        console.log('✅ Build configuration present');
      }
    } else {
      console.log('ℹ️  No vercel.json (will use defaults)');
    }
  }

  checkDependencies() {
    console.log('📋 Checking dependencies...');
    
    try {
      execSync('npm ls --depth=0', { stdio: 'pipe' });
      console.log('✅ All dependencies installed');
    } catch (error) {
      this.issues.push('❌ Missing dependencies');
      this.suggestions.push('Run: npm install');
    }
  }

  checkBuildFiles() {
    console.log('📋 Checking build files...');
    
    const importantFiles = [
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'tsconfig.json',
      'package.json'
    ];

    importantFiles.forEach(file => {
      if (fs.existsSync(file)) {
        console.log(`✅ ${file} exists`);
      } else {
        this.issues.push(`❌ ${file} missing`);
      }
    });
  }

  checkEnvironment() {
    console.log('📋 Checking environment...');
    
    // Check for .env files
    const envFiles = ['.env', '.env.local', '.env.production'];
    const hasEnvFiles = envFiles.some(file => fs.existsSync(file));
    
    if (hasEnvFiles) {
      console.log('ℹ️  Environment files found');
      this.suggestions.push('Ensure environment variables are set in Vercel dashboard');
    }

    // Check for .env.example
    if (fs.existsSync('.env.example')) {
      console.log('✅ .env.example found');
    }
  }

  showResults() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 DIAGNOSTIC RESULTS');
    console.log('='.repeat(60));

    if (this.issues.length === 0) {
      console.log('🎉 No issues found! Your project should deploy successfully.');
    } else {
      console.log('🚨 Issues found:');
      this.issues.forEach(issue => console.log(`   ${issue}`));
    }

    if (this.suggestions.length > 0) {
      console.log('\n💡 Suggestions:');
      this.suggestions.forEach(suggestion => console.log(`   ${suggestion}`));
    }

    console.log('\n🔧 Common Vercel Deployment Steps:');
    console.log('1. Ensure your GitHub repository is up to date');
    console.log('2. Check Vercel build logs for specific errors');
    console.log('3. Verify build settings in Vercel dashboard:');
    console.log('   - Framework: Next.js');
    console.log('   - Build Command: npm run build');
    console.log('   - Output Directory: .next');
    console.log('   - Node.js Version: 18.x');
    console.log('4. Try redeploying with fresh cache');

    console.log('\n📞 Need help? Share the specific error message!');
  }
}

// Run diagnostics
const diagnostics = new VercelDiagnostics();
diagnostics.runDiagnostics().catch(console.error);
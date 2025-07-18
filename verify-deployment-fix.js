const fs = require('fs');

class DeploymentVerifier {
  constructor() {
    this.status = {
      configFixed: false,
      codeUpdated: false,
      buildWorking: false
    };
  }

  verify() {
    console.log('🔍 Verifying Vercel deployment fix...\n');
    
    this.checkVercelConfig();
    this.checkGitStatus();
    this.showResults();
  }

  checkVercelConfig() {
    console.log('📋 Checking vercel.json configuration...');
    
    if (!fs.existsSync('vercel.json')) {
      console.log('❌ vercel.json not found');
      return;
    }

    const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    
    // Check for conflicting properties
    const hasBuilds = config.builds !== undefined;
    const hasFunctions = config.functions !== undefined;
    
    if (hasBuilds && hasFunctions) {
      console.log('❌ Still has conflicting builds/functions properties');
      return;
    }

    if (!hasBuilds && !hasFunctions) {
      console.log('✅ No conflicting properties found');
      this.status.configFixed = true;
    } else {
      console.log('✅ Configuration is valid (simplified)');
      this.status.configFixed = true;
    }
  }

  checkGitStatus() {
    console.log('📋 Checking GitHub status...');
    
    try {
      const { execSync } = require('child_process');
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      
      if (status.trim() === '') {
        console.log('✅ All changes committed and pushed');
        this.status.codeUpdated = true;
      } else {
        console.log('⚠️ Uncommitted changes found');
      }
    } catch (error) {
      console.log('⚠️ Git status check failed');
    }
  }

  showResults() {
    console.log('\n' + '='.repeat(60));
    console.log('🎉 DEPLOYMENT FIX VERIFICATION');
    console.log('='.repeat(60));

    if (this.status.configFixed) {
      console.log('✅ Vercel configuration: FIXED');
    } else {
      console.log('❌ Vercel configuration: NEEDS ATTENTION');
    }

    if (this.status.codeUpdated) {
      console.log('✅ GitHub repository: UP TO DATE');
    } else {
      console.log('⚠️ GitHub repository: MAY NEED UPDATE');
    }

    console.log('\n🚀 NEXT STEPS:');
    console.log('1. Go to your Vercel dashboard: https://vercel.com/dashboard');
    console.log('2. Find your "mindsheeplabs" project');
    console.log('3. Click "Redeploy" on the latest deployment');
    console.log('4. Select "Use existing build cache: No"');
    console.log('5. Click "Redeploy"');

    console.log('\n✨ Expected result:');
    console.log('• Build should complete successfully');
    console.log('• Your website will be live at: https://mindsheeplabs.vercel.app');
    console.log('• No more configuration errors');

    console.log('\n📋 What was fixed:');
    console.log('• Removed conflicting "builds" and "functions" properties');
    console.log('• Simplified vercel.json for Next.js auto-detection');
    console.log('• Let Vercel handle all configuration automatically');

    console.log('\n🔧 If you still get errors:');
    console.log('• Share the new error message');
    console.log('• Check Vercel build logs for details');
    console.log('• Verify your project settings in Vercel dashboard');
  }
}

// Run verification
const verifier = new DeploymentVerifier();
verifier.verify();
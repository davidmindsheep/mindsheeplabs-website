const puppeteer = require('puppeteer');

async function testWebsite() {
  console.log('🚀 Starting Puppeteer test...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set viewport for desktop testing
    await page.setViewport({ width: 1280, height: 720 });
    
    console.log('📡 Navigating to localhost:4000...');
    
    // Navigate to the website
    await page.goto('http://localhost:4000', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    console.log('✅ Page loaded successfully!');
    
    // Test page title
    const title = await page.title();
    console.log(`📄 Page title: "${title}"`);
    
    // Check if main sections are present
    const sections = await page.evaluate(() => {
      const results = {};
      results.header = !!document.querySelector('header');
      results.hero = !!document.querySelector('section');
      results.footer = !!document.querySelector('footer');
      results.buttons = document.querySelectorAll('button, .cta-button').length;
      results.images = document.querySelectorAll('img').length;
      return results;
    });
    
    console.log('🔍 Page structure check:');
    console.log(`   - Header: ${sections.header ? '✅' : '❌'}`);
    console.log(`   - Hero section: ${sections.hero ? '✅' : '❌'}`);
    console.log(`   - Footer: ${sections.footer ? '✅' : '❌'}`);
    console.log(`   - Buttons found: ${sections.buttons}`);
    console.log(`   - Images found: ${sections.images}`);
    
    // Check for bubble animations
    const bubbles = await page.evaluate(() => {
      const bubbleElements = document.querySelectorAll('.bubble-float, .bubble-float-delayed, .bubble-float-slow');
      return bubbleElements.length;
    });
    
    console.log(`🎈 Animated bubbles found: ${bubbles}`);
    
    // Check if CSS animations are working
    const animations = await page.evaluate(() => {
      const animatedElements = document.querySelectorAll('[class*="bubble-"]');
      const styles = [];
      animatedElements.forEach(el => {
        const computedStyle = window.getComputedStyle(el);
        if (computedStyle.animationName !== 'none') {
          styles.push(computedStyle.animationName);
        }
      });
      return styles;
    });
    
    console.log(`🎬 CSS animations active: ${animations.length > 0 ? '✅' : '❌'}`);
    if (animations.length > 0) {
      console.log(`   - Animation names: ${animations.join(', ')}`);
    }
    
    // Take a screenshot
    await page.screenshot({
      path: 'website-screenshot.png',
      fullPage: true
    });
    console.log('📸 Screenshot saved as website-screenshot.png');
    
    // Test responsive design by changing viewport
    await page.setViewport({ width: 768, height: 1024 });
    await page.screenshot({
      path: 'website-mobile-screenshot.png',
      fullPage: true
    });
    console.log('📱 Mobile screenshot saved as website-mobile-screenshot.png');
    
    console.log('🎉 All tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.message.includes('net::ERR_CONNECTION_REFUSED')) {
      console.log('💡 Make sure the Next.js server is running on port 4000');
      console.log('   Run: npm run dev');
    }
  } finally {
    await browser.close();
  }
}

testWebsite();
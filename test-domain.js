const puppeteer = require('puppeteer');

async function testDomainAccess() {
  console.log('🌐 Testing pm.mindsheeplabs.com:4000 access...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Test domain access
    console.log('📡 Navigating to pm.mindsheeplabs.com:4000...');
    
    await page.goto('http://pm.mindsheeplabs.com:4000', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    console.log('✅ Domain access successful!');
    
    const title = await page.title();
    console.log(`📄 Page title: "${title}"`);
    
    // Verify bubbles are working
    const bubbles = await page.evaluate(() => {
      return document.querySelectorAll('.bubble-float, .bubble-float-delayed, .bubble-float-slow').length;
    });
    
    console.log(`🎈 Animated bubbles found: ${bubbles}`);
    
    // Take screenshot from domain
    await page.screenshot({
      path: 'domain-test-screenshot.png',
      fullPage: true
    });
    console.log('📸 Domain screenshot saved as domain-test-screenshot.png');
    
    console.log('🎉 Domain access test completed successfully!');
    
  } catch (error) {
    console.error('❌ Domain test failed:', error.message);
    
    if (error.message.includes('net::ERR_NAME_NOT_RESOLVED')) {
      console.log('💡 DNS issue: pm.mindsheeplabs.com cannot be resolved');
      console.log('   Make sure the domain points to this server IP');
    } else if (error.message.includes('net::ERR_CONNECTION_REFUSED')) {
      console.log('💡 Connection refused: Server not accessible from external domain');
      console.log('   Check firewall settings and port 4000 accessibility');
    }
  } finally {
    await browser.close();
  }
}

testDomainAccess();
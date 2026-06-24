import { chromium } from 'playwright';

const BASE = 'http://localhost:8082';

function log(tag, msg, detail) {
  console.log(tag + ' ' + msg + (detail ? ' -> ' + detail : ''));
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

const consoleErrors = [];
page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
page.on('pageerror', err => consoleErrors.push(err.message));

// ── CONTACT FORM ──────────────────────────────────────────────────────────────
log('', '=== CONTACT FORM ===');
await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'test-contact-initial.png' });

log('probe', 'Submit empty form');
await page.click('button[type="submit"]');
await page.waitForTimeout(500);
const nameErr  = await page.locator('#err-name').textContent().catch(() => null);
const orgErr   = await page.locator('#err-organisation').textContent().catch(() => null);
const emailErr = await page.locator('#err-email').textContent().catch(() => null);
const msgErr   = await page.locator('#err-message').textContent().catch(() => null);
log(nameErr  ? 'PASS' : 'FAIL', 'Name required',   nameErr  || 'MISSING');
log(orgErr   ? 'PASS' : 'FAIL', 'Org required',    orgErr   || 'MISSING');
log(emailErr ? 'PASS' : 'FAIL', 'Email required',  emailErr || 'MISSING');
log(msgErr   ? 'PASS' : 'FAIL', 'Msg required',    msgErr   || 'MISSING');
await page.screenshot({ path: 'test-contact-errors.png' });

log('probe', 'Bad email format');
await page.fill('#email', 'not-an-email');
await page.click('button[type="submit"]');
await page.waitForTimeout(300);
const badEmailErr = await page.locator('#err-email').textContent().catch(() => null);
log(badEmailErr && badEmailErr.includes('valid') ? 'PASS' : 'FAIL', 'Bad email msg', badEmailErr || 'MISSING');

log('probe', 'Message < 10 chars');
await page.fill('#message', 'Hi');
await page.click('button[type="submit"]');
await page.waitForTimeout(300);
const shortMsgErr = await page.locator('#err-message').textContent().catch(() => null);
log(shortMsgErr && shortMsgErr.includes('10') ? 'PASS' : 'FAIL', 'Short msg error', shortMsgErr || 'MISSING');

log('', 'Fill valid data and submit');
await page.fill('#name', 'Test User');
await page.fill('#organisation', 'Test Org');
await page.fill('#email', 'test@example.com');
await page.fill('#message', 'This is a test message from the verification run, long enough.');

let contactStatus = null;
page.on('response', res => { if (res.url().includes('/api/contact')) contactStatus = res.status(); });

await page.click('button[type="submit"]');
await page.waitForTimeout(400);
const loadingBtn = await page.locator('button[type="submit"]').textContent().catch(() => '');
log(loadingBtn.includes('Sending') ? 'PASS' : 'WARN', 'Loading state shown', loadingBtn.trim());
await page.screenshot({ path: 'test-contact-loading.png' });

await page.waitForTimeout(8000);
const contactSuccess = await page.locator('text=Enquiry received').isVisible().catch(() => false);
const contactError   = await page.locator('text=problem sending').isVisible().catch(() => false);
log(contactSuccess ? 'PASS' : contactError ? 'WARN' : 'FAIL', 'Post-submit state',
  contactSuccess ? 'SUCCESS' : contactError ? 'ERROR (check Resend)' : 'NEITHER');
log('INFO', 'Contact API status', String(contactStatus));
await page.screenshot({ path: 'test-contact-result.png' });

// ── MARKETPLACE FORM ──────────────────────────────────────────────────────────
log('', '');
log('', '=== MARKETPLACE FORM ===');
await page.goto(BASE + '/marketplace/cyber-threat-intelligence-portfolio-simulation', { waitUntil: 'networkidle' });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1500);

log('probe', 'Submit empty marketplace form');
await page.click('button[type="submit"]');
await page.waitForTimeout(500);
const mnameErr  = await page.locator('#err-fullName').textContent().catch(() => null);
const morgErr   = await page.locator('#err-organisation').textContent().catch(() => null);
const memailErr = await page.locator('#err-workEmail').textContent().catch(() => null);
const mOrgType  = await page.locator('#err-orgType').textContent().catch(() => null);
const mConsent  = await page.locator('#err-consent').textContent().catch(() => null);
log(mnameErr  ? 'PASS' : 'FAIL', 'fullName error',    mnameErr  || 'MISSING');
log(morgErr   ? 'PASS' : 'FAIL', 'org error',         morgErr   || 'MISSING');
log(memailErr ? 'PASS' : 'FAIL', 'workEmail error',   memailErr || 'MISSING');
log(mOrgType  ? 'PASS' : 'FAIL', 'orgType error',     mOrgType  || 'MISSING');
log(mConsent  ? 'PASS' : 'FAIL', 'consent error',     mConsent  || 'MISSING');
await page.screenshot({ path: 'test-marketplace-errors.png' });

log('probe', 'Phone required when ask_to_be_contacted');
// Fresh page: fill all required fields except phone, select ask_to_be_contacted, submit
await page.goto(BASE + '/marketplace/cyber-threat-intelligence-portfolio-simulation', { waitUntil: 'networkidle' });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1000);
await page.fill('#fullName', 'Test User');
await page.fill('#organisation', 'Test Org');
await page.selectOption('#orgType', 'government_department');
await page.fill('#role', 'Director');
await page.fill('#region', 'West Africa');
await page.fill('#workEmail', 'test@example.com');
await page.locator('#consent').check({ force: true });
// Select ask_to_be_contacted (phone becomes required)
await page.locator('input[value="ask_to_be_contacted"]').check({ force: true });
await page.waitForTimeout(200);
await page.click('button[type="submit"]');
await page.waitForTimeout(600);
const phoneErr = await page.locator('#err-phone').textContent().catch(() => null);
log(phoneErr ? 'PASS' : 'FAIL', 'Conditional phone error', phoneErr || 'MISSING');

log('', 'Fill valid marketplace form and submit');
await page.fill('#fullName', 'Test User');
await page.fill('#organisation', 'Test Org');
await page.selectOption('#orgType', 'government_department');
await page.fill('#role', 'Director');
await page.fill('#region', 'West Africa');
await page.fill('#workEmail', 'test@example.com');
await page.locator('input[type="radio"][value="detailed_information_pricing"]').check({ force: true });
await page.locator('#consent').check({ force: true });

let mktStatus = null;
page.on('response', res => { if (res.url().includes('/api/marketplace-enquiry')) mktStatus = res.status(); });

await page.click('button[type="submit"]');
await page.waitForTimeout(400);
const mktBtn = await page.locator('button[type="submit"]').textContent().catch(() => '');
log(mktBtn.includes('Submitting') ? 'PASS' : 'WARN', 'Loading state', mktBtn.trim());
await page.screenshot({ path: 'test-marketplace-loading.png' });

await page.waitForTimeout(8000);
const mktSuccess = await page.locator('text=Enquiry received').isVisible().catch(() => false);
const mktError   = await page.locator('text=problem submitting').isVisible().catch(() => false);
log(mktSuccess ? 'PASS' : mktError ? 'WARN' : 'FAIL', 'Post-submit state',
  mktSuccess ? 'SUCCESS' : mktError ? 'ERROR (check Resend)' : 'NEITHER');
log('INFO', 'Marketplace API status', String(mktStatus));
await page.screenshot({ path: 'test-marketplace-result.png' });

log('', '');
log(consoleErrors.length ? 'WARN' : 'PASS', 'JS console errors', consoleErrors.length ? consoleErrors.join(' | ') : 'none');

await browser.close();

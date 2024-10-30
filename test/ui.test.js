const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('WI. Testing using Selenium', function() {
  this.timeout(30000); // Set timeout untuk Mocha testing
  let driver;

  // Inisialisasi WebDriver sebelum menjalankan test case
  before(async function() {
    driver = await new Builder().forBrowser('chrome').build(); // Bisa diganti "firefox" untuk Firefox
  });

  // Tutup WebDriver setelah semua test selesai
  after(async function() {
    await driver.quit();
  });

  // Test 1: Memastikan halaman login berhasil dimuat
  it('should load the login page', async function() {
    await driver.get('D:/PERKULIAHAN/SEMESTER 5/Prak ppmpl/pratikum_4/login.html'); // Ubah path sesuai lokasi file login.html
    const title = await driver.getTitle();
    expect(title).to.equal('Login Page');
  });

  // Test 2: Memasukkan username dan password yang benar
  it('should input username and password', async function() {
    await driver.findElement(By.id('username')).sendKeys('testuser');
    await driver.findElement(By.id('password')).sendKeys('password123');

    const usernameValue = await driver.findElement(By.id('username')).getAttribute('value');
    const passwordValue = await driver.findElement(By.id('password')).getAttribute('value');

    expect(usernameValue).to.equal('testuser');
    expect(passwordValue).to.equal('password123');
  });

  // Test 3: Klik tombol login
  it('should click the login button', async function() {
    await driver.findElement(By.id('loginButton')).click();
  });

  // Latihan 1: Validasi login gagal
  it('should display error message on login failure', async function() {
    await driver.findElement(By.id('username')).clear();
    await driver.findElement(By.id('password')).clear();
    await driver.findElement(By.id('username')).sendKeys('wronguser'); // Username yang salah
    await driver.findElement(By.id('password')).sendKeys('wrongpassword'); // Password yang salah
    await driver.findElement(By.id('loginButton')).click();

    try {
      // Tunggu hingga alert muncul dan terima jika ada alert
      await driver.wait(until.alertIsPresent(), 5000);
      const alert = await driver.switchTo().alert();
      await alert.accept(); // Terima alert jika muncul
    } catch (e) {
      // Tidak ada alert, lanjutkan tes
    }

    // Tunggu hingga pesan error muncul
    const errorMessageElement = await driver.wait(until.elementLocated(By.css('.error-message')), 5000);
    const errorMessage = await errorMessageElement.getText();
    expect(errorMessage).to.equal('Invalid username or password'); // Sesuaikan dengan pesan error sebenarnya
  });

  // Latihan 2: Penggunaan CSS Selector dan XPath
  it('should input username and password using CSS Selector and XPath', async function() {
    await driver.findElement(By.css('#username')).clear(); // Bersihkan input sebelum memasukkan data
    await driver.findElement(By.xpath('//*[@id="password"]')).clear(); // Bersihkan input sebelum memasukkan data

    await driver.findElement(By.css('#username')).sendKeys('testuser');
    await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');

    const usernameValue = await driver.findElement(By.css('#username')).getAttribute('value');
    const passwordValue = await driver.findElement(By.xpath('//*[@id="password"]')).getAttribute('value');

    expect(usernameValue).to.equal('testuser');
    expect(passwordValue).to.equal('password123');
  });

  // Latihan 3: Validasi visual apakah tombol login tampil
  it('should validate that login button is visible', async function() {
    const isDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();
    expect(isDisplayed).to.be.true;
  });
});

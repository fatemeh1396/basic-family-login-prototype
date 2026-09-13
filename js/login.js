/* ============================================================
   LOGIN PAGE - JavaScript Logic
   ============================================================ */

/**
 * تنظیمات نمایش/پنهان کردن رمز عبور
 */
function initPasswordToggle() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.getElementById('togglePassword');
    const toggleIcon = toggleButton.querySelector('.toggle-icon');

    toggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        
        // تغییر آیکن
        if (isPassword) {
            toggleIcon.src = 'assets/icons/eye-off.svg';
            toggleButton.title = 'پنهان کردن رمز عبور';
        } else {
            toggleIcon.src = 'assets/icons/eye.svg';
            toggleButton.title = 'نمایش رمز عبور';
        }
    });
}

/**
 * تنظیمات فرم ورود
 */
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // جلوگیری از ارسال پیش‌فرض فرم
        
        // پاک کردن پیام خطا قبلی
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';

        const username = usernameInput.value.trim();
        const password = passwordInput.value;

        // اعتبارسنجی فرم
        if (!username || !password) {
            showError('لطفاً نام کاربری و رمز عبور را وارد کنید.');
            return;
        }

        // منطق احراز هویت نمونه‌ای
        authenticateUser(username, password);
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * منطق احراز هویت نمونه‌ای
 * @param {string} username - نام کاربری
 * @param {string} password - رمز عبور
 */
function authenticateUser(username, password) {
    // تعریف کاربر مالک
    const OWNER_USERNAME = 'owner';
    const OWNER_PASSWORD = 'BF-Owner-2026';

    // بررسی اگر کاربر، مالک باشد
    if (username === OWNER_USERNAME && password === OWNER_PASSWORD) {
        // ذخیره اطلاعات در sessionStorage
        sessionStorage.setItem('basicFamilyRole', 'owner');
        sessionStorage.setItem('basicFamilyUsername', username);

        // ریدایرکت به صفحه Admin
        setTimeout(() => {
            window.location.href = 'pages/admin.html';
        }, 100);
        return;
    }

    // اگر نام کاربری و رمز عبور خالی نیستند (و مالک نیستند)
    if (username && password) {
        // ذخیره اطلاعات برای کاربر معمولی
        sessionStorage.setItem('basicFamilyRole', 'user');
        sessionStorage.setItem('basicFamilyUsername', username);

        // ریدایرکت به صفحه کاربر
        setTimeout(() => {
            window.location.href = 'pages/user.html';
        }, 100);
        return;
    }

    // اگر هر دو خالی باشند
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = 'لطفاً نام کاربری و رمز عبور را وارد کنید.';
    errorMessage.style.display = 'block';
}

/**
 * تنظیم دکمه‌های غیرفعال (برای نسخه‌های بعد)
 */
function initDisabledButtons() {
    const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
    const registerBtn = document.getElementById('registerBtn');

    // این دکمه‌ها برای نسخه‌های بعد است
    forgotPasswordBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // فعلاً کاری نمی‌کند
    });

    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // فعلاً کاری نمی‌کند
    });
}

/**
 * تهیه‌کننده صفحه
 */
document.addEventListener('DOMContentLoaded', () => {
    // پاک کردن sessionStorage اگر کاربر بازگشت از صفحه محافظت شده است
    const role = sessionStorage.getItem('basicFamilyRole');
    const currentPage = window.location.pathname;
    
    // اگر روی صفحه‌ی ورود هستیم و نقشی در sessionStorage وجود دارد، آن را ذخیره کن
    // (احتمالاً کاربر از دکمه‌ی "بازگشت" استفاده کرد)
    
    initPasswordToggle();
    initLoginForm();
    initDisabledButtons();
    
    // فوکس روی فیلد نام کاربری
    document.getElementById('username').focus();
});

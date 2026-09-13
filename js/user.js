/* ============================================================
   USER PAGE - JavaScript Logic
   ============================================================ */

/**
 * بررسی حفاظت مسیر - فقط کاربران عادی می‌توانند به این صفحه دسترسی داشته باشند
 */
function protectUserRoute() {
    const role = sessionStorage.getItem('basicFamilyRole');
    
    if (role !== 'user') {
        // اگر کاربر عادی نیست، به صفحه ورود برگردان
        window.location.href = '../index.html';
        return false;
    }
    
    return true;
}

/**
 * بارگذاری اطلاعات کاربر از sessionStorage
 */
function loadUserInfo() {
    const username = sessionStorage.getItem('basicFamilyUsername');
    const usernameDisplay = document.getElementById('usernameDisplay');
    
    if (username && usernameDisplay) {
        usernameDisplay.textContent = username;
    }
}

/**
 * تنظیم رویدادهای منو Sidebar
 */
function initSidebarMenu() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // حذف کلاس active از تمام لینک‌ها
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // اضافه کردن کلاس active به لینک کلیک‌شده
            link.classList.add('active');
            
            // می‌تواند برای تغییر محتوای صفحه استفاده شود
            // const page = link.dataset.page;
            // loadPage(page);
        });
    });
}

/**
 * تنظیم دکمه خروج
 */
function initLogoutButton() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            performLogout();
        });
    }
}

/**
 * انجام عملیات خروج
 */
function performLogout() {
    // حذف اطلاعات جلسه از sessionStorage
    sessionStorage.removeItem('basicFamilyRole');
    sessionStorage.removeItem('basicFamilyUsername');
    
    // حذف اطلاعات جلسه از localStorage (در صورت استفاده fallback)
    localStorage.removeItem('basicFamilyRole');
    localStorage.removeItem('basicFamilyUsername');
    
    // ریدایرکت به صفحه ورود
    window.location.href = '../index.html';
}

/**
 * تهیه‌کننده صفحه
 */
document.addEventListener('DOMContentLoaded', () => {
    // اول بررسی حفاظت مسیر
    if (!protectUserRoute()) {
        return;
    }
    
    // بارگذاری اطلاعات کاربر
    loadUserInfo();
    
    // تنظیم رویدادهای Sidebar
    initSidebarMenu();
    
    // تنظیم دکمه خروج
    initLogoutButton();
});

var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("expandedImg");
var captionText = document.getElementById("modalCaption");

// Lấy tất cả ảnh bên trong khung img-wrapper
var imgs = document.querySelectorAll(".img-wrapper img");

imgs.forEach(function(img) {
    img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        
        // Lấy nội dung ghi chú bên dưới ảnh để đưa vào modal
        var caption = this.nextElementSibling;
        if(caption && caption.classList.contains("img-caption")) {
            captionText.innerHTML = caption.innerHTML;
        } else {
            captionText.innerHTML = this.alt;
        }
    }
});

// Tắt modal khi bấm nút X
var span = document.getElementsByClassName("close-modal")[0];
span.onclick = function() { 
    modal.style.display = "none";
}

// Tắt modal khi bấm ra ngoài khoảng đen
modal.onclick = function(e) {
    if (e.target !== modalImg) {
        modal.style.display = "none";
    }
}

// --- SCRIPT CHO POPUP MUA VPS ---
function openVpsModal(event) {
    event.preventDefault(); // Ngăn trình duyệt nhảy trang
    document.getElementById("vpsModal").style.display = "block";
}

function closeVpsModal() {
    document.getElementById("vpsModal").style.display = "none";
}


// --- SCRIPT CHẶN COPY VÀ F12 ---
// Chặn chuột phải
document.addEventListener('contextmenu', event => event.preventDefault());

// // Chặn F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
// document.onkeydown = function(e) {
//     if(e.keyCode == 123) { return false; } // F12
//     if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) { return false; }
//     if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) { return false; }
//     if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) { return false; }
//     if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) { return false; } // Ctrl+U
// }
// --- SCRIPT HOA MAI RƠI ---
function createHoaMai() {
    const petal = document.createElement('div');
    petal.classList.add('mai-petal');
    
    // Random kích thước cánh hoa từ 8px đến 16px
    const size = Math.random() * 8 + 8; 
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    
    // Random vị trí xuất hiện trên màn hình (từ 0 đến 100% chiều ngang)
    petal.style.left = `${Math.random() * 100}vw`;
    
    // Random thời gian rơi (tốc độ rơi từ 4 giây đến 9 giây)
    const fallDuration = Math.random() * 5 + 4; 
    petal.style.animation = `fall ${fallDuration}s linear forwards`;
    
    // Thêm cánh hoa vào trang web
    document.body.appendChild(petal);
    
    // Xóa cánh hoa khỏi HTML sau khi rơi xong để không làm nặng RAM VPS/máy tính
    setTimeout(() => {
        petal.remove();
    }, fallDuration * 1000);
}

// Tạo ra một cánh hoa mới mỗi 300 mili-giây (Có thể tăng số 300 lên 500 nếu thấy hoa rơi quá dày)
setInterval(createHoaMai, 300);
// --- SCRIPT CHUYỂN ĐỔI SÁNG/TỐI (MẶC ĐỊNH TỐI) ---
const toggleSwitch = document.getElementById('checkbox');
const currentTheme = localStorage.getItem('theme');

// Kiểm tra xem người dùng đã từng chọn giao diện chưa
if (currentTheme) {
    // Nếu có chọn rồi (Lần thứ 2 vào web) thì áp dụng theo lựa chọn cũ
    document.body.className = currentTheme === 'light-theme' ? '' : 'dark-theme';
    toggleSwitch.checked = currentTheme === 'dark-theme';
} else {
    // Nếu là LẦN ĐẦU TIÊN vào web -> Ép mặc định là Dark Mode
    document.body.className = 'dark-theme';
    toggleSwitch.checked = true;
    localStorage.setItem('theme', 'dark-theme');
}

// Hàm kích hoạt khi bấm nút công tắc
function toggleTheme() {
    if (toggleSwitch.checked) {
        document.body.className = 'dark-theme';
        localStorage.setItem('theme', 'dark-theme'); 
    } else {
        document.body.className = ''; // Xóa class dark-theme để về lại màu trắng
        localStorage.setItem('theme', 'light-theme');
    }
}
// --- SCRIPT CHUYỂN TAB (TÁCH PAGE) ---
document.addEventListener("DOMContentLoaded", function() {
    // Lấy tất cả các nút menu và các thẻ nội dung (card)
    const navLinks = document.querySelectorAll('.in-page-nav a');
    const cards = document.querySelectorAll('.card');

    // Nếu không có menu nào thì dừng lại
    if(navLinks.length === 0) return;

    // Hàm thực hiện chuyển tab
    function openTab(tabId, clickedLink) {
        // 1. Ẩn tất cả các nội dung (card)
        cards.forEach(card => card.classList.remove('active'));
        
        // 2. Bỏ highlight (màu cam) ở tất cả các nút menu
        navLinks.forEach(link => link.classList.remove('active-nav'));
        
        // 3. Tìm thẻ nội dung có ID tương ứng và cho hiển thị lên
        const targetCard = document.getElementById(tabId);
        if(targetCard) {
            targetCard.classList.add('active');
        }
        
        // 4. Highlight (tô màu cam) nút menu vừa được bấm
        if(clickedLink) {
            clickedLink.classList.add('active-nav');
        }
    }

    // Gắn sự kiện "Click" cho từng nút menu
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Ngăn hành vi cuộn trang mặc định của thẻ <a>
            
            // Lấy ID của tab (ví dụ href="#tab-giaodien" -> lấy "tab-giaodien")
            const tabId = this.getAttribute('href').substring(1); 
            
            // Gọi hàm chuyển tab
            openTab(tabId, this);
            
            // Tùy chọn: Cuộn nhẹ lên đầu trang sau khi chuyển tab (nếu màn hình nhỏ)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Tự động kích hoạt (Mở) tab đầu tiên khi vừa vào web
    const firstTabId = navLinks[0].getAttribute('href').substring(1);
    openTab(firstTabId, navLinks[0]);
});
// --- SCRIPT CHUYỂN TAB VÀ CUỘN ĐẾN ĐÚNG VIDEO ---
function xemVideoChiTiet(event, videoId) {
    event.preventDefault(); // Ngăn trình duyệt nhảy trang

    // 1. Tìm nút "Setting" và chuyển tab
    const nutSetting = document.querySelector('.in-page-nav a[href="#tab-setting"]');
    if (nutSetting) {
        nutSetting.click(); // Mở tab Setting
    }

    // 2. Đợi 100ms để tab Setting kịp mở ra, sau đó cuộn tới video
    setTimeout(() => {
        const targetVideoBlock = document.getElementById(videoId);
        if (targetVideoBlock) {
            // Cuộn màn hình để video nằm ở giữa
            targetVideoBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Làm nổi bật video đó lên bằng viền màu cam trong 2 giây để người dùng dễ nhìn
            targetVideoBlock.style.transition = "box-shadow 0.5s, transform 0.5s";
            targetVideoBlock.style.boxShadow = "0 0 25px var(--primary)";
            targetVideoBlock.style.transform = "scale(1.02)";
            
            setTimeout(() => {
                targetVideoBlock.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.05)";
                targetVideoBlock.style.transform = "scale(1)";
            }, 2000); // Sau 2s trở lại bình thường
        }
    }, 100);
}
// --- SCRIPT CHO POPUP THÔNG BÁO KHI VÀO WEB ---

// 1. Tự động bật thông báo khi web tải xong
document.addEventListener("DOMContentLoaded", function() {
    // Dùng sessionStorage: Chỉ hiện 1 lần trong suốt quá trình mở tab. F5 không bị hiện lại.
    if (!sessionStorage.getItem('daXemThongBao')) {
        document.getElementById('welcomeModal').style.display = 'block';
    }
});

// 2. Hàm nút tắt thông báo
function closeWelcomeModal() {
    document.getElementById('welcomeModal').style.display = 'none';
    sessionStorage.setItem('daXemThongBao', 'true'); // Đánh dấu là đã xem
}

// 3. Tự đóng TẤT CẢ popup (Mua VPS & Thông Báo) khi click ra khoảng đen bên ngoài
window.addEventListener('click', function(event) {
    let vpsModal = document.getElementById("vpsModal");
    let welcomeModal = document.getElementById("welcomeModal");
    
    if (event.target == vpsModal) {
        vpsModal.style.display = "none";
    }
    if (event.target == welcomeModal) {
        welcomeModal.style.display = "none";
        sessionStorage.setItem('daXemThongBao', 'true'); // Bấm ra ngoài cũng tính là đã xem
    }
});
// --- SCRIPT COPY CONFIG ---
function copyConfig(btnElement) {
    // Lấy nội dung text trong thẻ pre
    const content = document.getElementById('bossConfig').innerText;
    
    // Copy vào clipboard
    navigator.clipboard.writeText(content).then(() => {
        // Lưu lại nội dung gốc của nút
        const originalHTML = btnElement.innerHTML;
        const originalBg = btnElement.style.backgroundColor;

        // Đổi nút sang trạng thái "Đã copy"
        btnElement.innerHTML = '<i class="fa-solid fa-check"></i> Đã Copy!';
        btnElement.style.backgroundColor = '#22c55e'; // Màu xanh lá
        
        // Sau 2 giây trả về trạng thái cũ
        setTimeout(() => {
            btnElement.innerHTML = originalHTML;
            btnElement.style.backgroundColor = originalBg;
        }, 2000);
    }).catch(err => {
        alert('Lỗi khi copy: ' + err);
    });
}

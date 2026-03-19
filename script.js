var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("expandedImg");
var captionText = document.getElementById("modalCaption");

// Biến để nhớ danh sách ảnh đang xem và vị trí hiện tại
var currentImageList = [];
var currentImageIndex = 0;

var imgs = document.querySelectorAll(".img-wrapper img");

imgs.forEach(function (img) {
    img.onclick = function () {
        modal.style.display = "block";

        // GOM NHÓM: Tìm tất cả các ảnh nằm chung 1 khung (img-wrapper) để tạo thành 1 album
        var wrapper = this.closest(".img-wrapper");
        if (wrapper) {
            currentImageList = Array.from(wrapper.querySelectorAll("img"));
        } else {
            currentImageList = [this];
        }

        // Xác định vị trí của ảnh vừa bấm trong album đó
        currentImageIndex = currentImageList.indexOf(this);

        // Gọi hàm hiển thị
        showImage(currentImageIndex);
    }
});

// Hàm hiển thị ảnh
function showImage(index) {
    // Nếu bấm Next ở ảnh cuối cùng -> Quay lại ảnh đầu tiên
    if (index >= currentImageList.length) { currentImageIndex = 0; }
    // Nếu bấm Prev ở ảnh đầu tiên -> Nhảy tới ảnh cuối cùng
    if (index < 0) { currentImageIndex = currentImageList.length - 1; }

    var targetImg = currentImageList[currentImageIndex];
    modalImg.src = targetImg.src;

    // Hiển thị chú thích kèm số trang (Ví dụ: Chú thích ảnh (2/5))
    var wrapper = targetImg.closest(".img-wrapper");
    var caption = wrapper ? wrapper.querySelector(".img-caption") : null;

    // Nếu album có nhiều hơn 1 ảnh thì hiển thị số trang
    var pageInfo = currentImageList.length > 1 ? " (" + (currentImageIndex + 1) + "/" + currentImageList.length + ")" : "";

    if (caption) {
        captionText.innerHTML = caption.innerHTML + pageInfo;
    } else {
        captionText.innerHTML = targetImg.alt + pageInfo;
    }
}

// Hàm được gọi khi bấm nút mũi tên trên màn hình
function changeImage(n) {
    currentImageIndex += n;
    showImage(currentImageIndex);
}

// Tắt modal khi bấm nút X
var span = document.getElementsByClassName("close-modal")[0];
if (span) {
    span.onclick = function () {
        modal.style.display = "none";
    }
}

// Tắt modal khi bấm ra ngoài vùng đen (Lưu ý: Bấm trúng nút mũi tên thì không tắt)
modal.onclick = function (e) {
    if (e.target === modal || e.target.classList.contains('close-modal')) {
        modal.style.display = "none";
    }
}

// TÍNH NĂNG PRO: Sử dụng phím mũi tên Trái/Phải và phím ESC trên bàn phím
document.addEventListener('keydown', function (event) {
    if (modal.style.display === "block") {
        if (event.key === "ArrowLeft") {
            changeImage(-1);
        } else if (event.key === "ArrowRight") {
            changeImage(1);
        } else if (event.key === "Escape") {
            modal.style.display = "none";
        }
    }
});

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
//document.addEventListener('contextmenu', event => event.preventDefault());

// // Chặn F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
// document.onkeydown = function(e) {
//     if(e.keyCode == 123) { return false; } // F12
//     if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) { return false; }
//     if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) { return false; }
//     if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) { return false; }
//     if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) { return false; } // Ctrl+U
// }
// --- SCRIPT HOA MAI RƠI ---
// function createHoaMai() {
//     const petal = document.createElement('div');
//     petal.classList.add('mai-petal');

//     // Random kích thước cánh hoa từ 8px đến 16px
//     const size = Math.random() * 8 + 8;
//     petal.style.width = `${size}px`;
//     petal.style.height = `${size}px`;

//     // Random vị trí xuất hiện trên màn hình (từ 0 đến 100% chiều ngang)
//     petal.style.left = `${Math.random() * 100}vw`;

//     // Random thời gian rơi (tốc độ rơi từ 4 giây đến 9 giây)
//     const fallDuration = Math.random() * 5 + 4;
//     petal.style.animation = `fall ${fallDuration}s linear forwards`;

//     // Thêm cánh hoa vào trang web
//     document.body.appendChild(petal);

//     // Xóa cánh hoa khỏi HTML sau khi rơi xong để không làm nặng RAM VPS/máy tính
//     setTimeout(() => {
//         petal.remove();
//     }, fallDuration * 1000);
// }

// // Tạo ra một cánh hoa mới mỗi 300 mili-giây (Có thể tăng số 300 lên 500 nếu thấy hoa rơi quá dày)
// setInterval(createHoaMai, 300);

// --- SCRIPT CHUYỂN TAB (TÁCH PAGE) ---
document.addEventListener("DOMContentLoaded", function () {
    // Lấy tất cả các nút menu và các thẻ nội dung (card)
    const navLinks = document.querySelectorAll('.in-page-nav a');
    const cards = document.querySelectorAll('.card');

    // Nếu không có menu nào thì dừng lại
    if (navLinks.length === 0) return;

    // Hàm thực hiện chuyển tab
    function openTab(tabId, clickedLink) {
        // 1. Ẩn tất cả các nội dung (card)
        cards.forEach(card => card.classList.remove('active'));

        // 2. Bỏ highlight (màu cam) ở tất cả các nút menu
        navLinks.forEach(link => link.classList.remove('active-nav'));

        // 3. Tìm thẻ nội dung có ID tương ứng và cho hiển thị lên
        const targetCard = document.getElementById(tabId);
        if (targetCard) {
            targetCard.classList.add('active');
        }

        // 4. Highlight (tô màu cam) nút menu vừa được bấm
        if (clickedLink) {
            clickedLink.classList.add('active-nav');
        }
    }

    // Gắn sự kiện "Click" cho từng nút menu
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
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
document.addEventListener("DOMContentLoaded", function () {
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
window.addEventListener('click', function (event) {
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
// --- SCRIPT CHO MENU 3 GẠCH TRÊN MOBILE ---
document.addEventListener("DOMContentLoaded", function () {
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = mobileMenu.querySelectorAll('a');

    // Bật/tắt menu khi bấm nút 3 gạch
    if (menuToggleBtn && mobileMenu) {
        menuToggleBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('show-mobile-nav');

            // Đổi icon từ 3 gạch sang dấu X
            const icon = menuToggleBtn.querySelector('i');
            if (mobileMenu.classList.contains('show-mobile-nav')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Tự động đóng menu khi bấm vào 1 mục bất kỳ
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('show-mobile-nav');
                // Trả lại icon 3 gạch
                const icon = menuToggleBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }
});
// ================================================= //
// --- SCRIPT CHO THANH TÌM KIẾM TÍNH NĂNG --- //
// ================================================= //
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('searchInput');
    const suggestionsBox = document.getElementById('searchSuggestions');
    let searchIndex = [];

    // 1. Quét toàn bộ HTML để lấy dữ liệu làm từ điển tìm kiếm
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const tabId = card.id;
        const tabTitleEl = card.querySelector('.section-title');
        if (!tabTitleEl) return;
        const tabName = tabTitleEl.innerText.trim();

        const featureBlocks = card.querySelectorAll('.feature-block');
        featureBlocks.forEach((block, index) => {
            // Tự động cấp ID cho block nếu chưa có để cuộn tới
            if (!block.id) {
                block.id = `auto-feature-${tabId}-${index}`;
            }

            const headerEl = block.querySelector('.feature-header');
            const contentEl = block.querySelector('.text-content');

            if (headerEl) {
                searchIndex.push({
                    id: block.id,
                    tabId: tabId,
                    tabName: tabName,
                    title: headerEl.innerText.replace(/^\d+\.\s*/, '').trim(), // Bỏ số thứ tự 1. 2. ở đầu
                    content: contentEl ? contentEl.innerText.toLowerCase() : ""
                });
            }
        });
    });

    // 2. Lắng nghe sự kiện người dùng gõ phím
    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase().trim();
        suggestionsBox.innerHTML = '';

        if (!query) {
            suggestionsBox.style.display = 'none';
            return;
        }

        // Lọc dữ liệu: Khớp với Tiêu đề, Tên Tab hoặc Nội dung bên trong
        const matches = searchIndex.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.content.includes(query) ||
            item.tabName.toLowerCase().includes(query)
        ).slice(0, 7); // Chỉ hiển thị tối đa 7 kết quả gợi ý

        // 3. Hiển thị gợi ý ra HTML
        if (matches.length > 0) {
            suggestionsBox.style.display = 'block';
            matches.forEach(match => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${match.title}</strong><small><i class="fa-solid fa-folder-open"></i> Tab: ${match.tabName}</small>`;

                // Sự kiện khi bấm vào 1 gợi ý
                li.onclick = function () {
                    suggestionsBox.style.display = 'none';
                    searchInput.value = ''; // Reset thanh tìm kiếm

                    // 3.1 Bấm nút giả lập để chuyển Tab
                    const navLink = document.querySelector(`.in-page-nav a[href="#${match.tabId}"]`);
                    if (navLink) navLink.click();

                    // 3.2 Cuộn đến đúng vị trí và highlight
                    setTimeout(() => {
                        const targetBlock = document.getElementById(match.id);
                        if (targetBlock) {
                            targetBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });

                            // Tạo hiệu ứng highlight sáng lên 2 giây
                            targetBlock.style.transition = "box-shadow 0.5s, transform 0.5s";
                            targetBlock.style.boxShadow = "0 0 25px var(--primary)";
                            targetBlock.style.transform = "scale(1.02)";
                            targetBlock.style.borderRadius = "8px";

                            setTimeout(() => {
                                targetBlock.style.boxShadow = "none";
                                targetBlock.style.transform = "scale(1)";
                            }, 2000);
                        }
                    }, 100); // Đợi tab mở xong 100ms
                };
                suggestionsBox.appendChild(li);
            });
        } else {
            // Trường hợp không tìm thấy kết quả
            suggestionsBox.style.display = 'block';
            suggestionsBox.innerHTML = `<li style="color: var(--danger); text-align: center;"><i class="fa-solid fa-triangle-exclamation"></i> Không tìm thấy tính năng này</li>`;
        }
    });

    // 4. Bấm ra ngoài khoảng trống thì tự đóng thanh gợi ý
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.search-container')) {
            suggestionsBox.style.display = 'none';
        }
    });
});
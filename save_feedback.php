<?php
// save_feedback.php
header('Content-Type: application/json; charset=utf-8');

// Đọc dữ liệu JSON gửi lên
$rawData = file_get_contents("php://input");
$newData = json_decode($rawData, true);

if ($newData) {
    $file_path = 'report_logs.json'; // File sẽ được tạo/lưu trên hosting
    $all_reports = [];

    // Nếu file đã tồn tại, lấy dữ liệu cũ ra để nối thêm vào
    if (file_exists($file_path)) {
        $json_content = file_get_contents($file_path);
        $all_reports = json_decode($json_content, true) ?: [];
    }

    // Thêm report mới vào danh sách
    array_push($all_reports, $newData);

    // Lưu lại vào file JSON (định dạng đẹp, hỗ trợ tiếng Việt)
    if (file_put_contents($file_path, json_encode($all_reports, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        echo json_encode(['status' => 'success', 'message' => 'Report đã được ghi lại.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Lỗi ghi file trên Hosting. Hãy kiểm tra quyền ghi (CHMOD).']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Dữ liệu gửi lên không hợp lệ.']);
}
?>
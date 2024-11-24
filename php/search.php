<?php
include('../php/connection.php'); // Đảm bảo kết nối đến cơ sở dữ liệu

header("Access-Control-Allow-Origin: *"); // Hoặc bạn có thể chỉ định miền cụ thể thay vì '*'
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
// Kiểm tra xem biến GET có giá trị hay không
if (isset($_GET['loaidat'])) {
    $ma_loai = trim($_GET['loaidat']);

    // Chuyển đổi giá trị thành chữ thường để so sánh
    $name = strtolower($ma_loai);

    // Kiểm tra độ dài của giá trị nhập vào
    if (strlen($name) < 2) {
        echo "Vui lòng nhập ít nhất 2 ký tự.";
        exit;
    }

    // Chuẩn bị truy vấn SQL an toàn
    $query = "SELECT *, ST_X(ST_Centroid(geom)) AS x, ST_Y(ST_Centroid(geom)) AS y 
              FROM public.thuadatdaydu 
              WHERE LOWER(loaidat) LIKE '%' || $1 || '%'";

    // Sử dụng pg_prepare và pg_execute để thực hiện truy vấn an toàn
    $result = pg_prepare($conn, "my_query", $query);
    if (!$result) {
        echo "Lỗi chuẩn bị truy vấn: " . pg_last_error($conn);
        exit;
    }

    $result = pg_execute($conn, "my_query", array($name));
    if (!$result) {
        echo "Lỗi thực hiện truy vấn: " . pg_last_error($conn);
        exit;
    }

    $tong_so_ket_qua = pg_num_rows($result);

    // Kiểm tra kết quả truy vấn
    if ($tong_so_ket_qua > 0) {
        while ($dong = pg_fetch_array($result, null, PGSQL_ASSOC)) {
            // Tạo liên kết với hàm JavaScript để điều hướng đến điểm
            $link = "<a href=\"#map\" onclick=\"di_den_diem(" . htmlspecialchars($dong['x']) . ", " . htmlspecialchars($dong['y']) . ")\">Xem ngay</a>";

            // Hiển thị thông tin
            echo "Loại đất: " . htmlspecialchars($dong['loaidat']) . " | Diện tích: " . htmlspecialchars($dong['dientich']) . " | Số thửa: " . htmlspecialchars($dong['sothua']) . " " . $link . "<br>";
        }
    } else {
        echo "Không tìm thấy kết quả!";
    }
} else {
    echo "Không có loại đất được nhập!";
}
?>

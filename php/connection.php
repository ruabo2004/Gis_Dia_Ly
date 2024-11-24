<?php
define('PG_DB', 'CSDL_DC');
define('PG_HOST', 'localhost');
define('PG_USER', 'postgres');
define('PG_PORT', '5432');
define('PG_PASS', '19022004');

// Sử dụng cú pháp đúng để kết nối đến PostgreSQL
$conn = pg_connect("host=".PG_HOST." port=".PG_PORT." dbname=".PG_DB." user=".PG_USER." password=".PG_PASS);

if (!$conn) {
    die("Không thể kết nối đến PostgreSQL: " . pg_last_error());
}
?>

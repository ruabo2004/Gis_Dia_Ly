function showResult(str) {
    if (str.length == 0) {
        document.getElementById("livesearch").innerHTML = "";
        document.getElementById("livesearch").style.border = "0px";
        return;
    }
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("livesearch").innerHTML = this.responseText;
            document.getElementById("livesearch").style.border = "1px solid #A5ACB2";
        }
    };
    
    // Gửi yêu cầu tìm kiếm theo loại đất
    xmlhttp.open("GET", "http://localhost:8000/search.php?loaidat=" + encodeURIComponent(str), true); // Thay đổi tên biến cho đúng
    xmlhttp.send();
}


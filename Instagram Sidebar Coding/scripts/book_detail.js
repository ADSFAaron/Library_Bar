// 取得按鈕元素和浮動頁面元素
var btn_read_book = document.getElementById("btn-read_book");
var book_detail_page = document.getElementById("book_detail-page");
var btn_close_reading_page = document.getElementById("btn-close-reading_page");
// 當按鈕被點擊時，顯示浮動頁面
btn_read_book.addEventListener("click", function() {
    book_detail_page.style.display = "block";
});
// 當關閉按鈕被點擊時，隱藏浮動頁面
btn_close_reading_page.addEventListener("click", function() {
    book_detail_page.style.display = "none";
});


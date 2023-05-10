// 取得按鈕元素和浮動頁面元素
var btn_reading_book_detail = document.getElementById("btn_reading_book_detail");
var page_book_detail = document.getElementById("page_book_detail");
var btn_close_book_detail = document.getElementById("btn_close_book_detail");
// 當按鈕被點擊時，顯示浮動頁面
btn_reading_book_detail.addEventListener("click", function() {
    page_book_detail.style.display = "block";
});
// 當關閉按鈕被點擊時，隱藏浮動頁面
btn_close_book_detail.addEventListener("click", function() {
    page_book_detail.style.display = "none";
});


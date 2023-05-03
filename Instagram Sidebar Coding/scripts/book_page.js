// 取得按鈕元素和浮動頁面元素
var btn_reading_local_book = document.getElementById("btn_reading_local_book");
var page_local_book = document.getElementById("page_local_book");
var btn_close_local_book = document.getElementById("btn_close_local_book");
// 當按鈕被點擊時，顯示浮動頁面
btn_reading_local_book.addEventListener("click", function() {
    page_local_book.style.display = "block";
});
// 當關閉按鈕被點擊時，隱藏浮動頁面
btn_close_local_book.addEventListener("click", function() {
    page_local_book.style.display = "none";
});
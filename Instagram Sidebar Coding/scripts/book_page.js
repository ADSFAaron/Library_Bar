// 取得按鈕元素和浮動頁面元素
var btn_open_book_page = document.getElementById("btn-open_book_page");
var book_page = document.getElementById("book_page");
var btn_close_book_page = document.getElementById("btn-close_book_page");
// 當按鈕被點擊時，顯示浮動頁面
btn_open_book_page.addEventListener("click", function() {
    book_page.style.display = "block";
});
// 當關閉按鈕被點擊時，隱藏浮動頁面
btn_close_book_page.addEventListener("click", function() {
    book_page.style.display = "none";
});
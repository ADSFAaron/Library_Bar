// // 取得按鈕元素和浮動頁面元素
// var btn_reading_local_book = document.getElementById("btn_reading_local_book");
// var page_local_book = document.getElementById("page_local_book");
// var btn_close_local_book = document.getElementById("btn_close_local_book");
// // 當按鈕被點擊時，顯示浮動頁面
// btn_reading_local_book.addEventListener("click", function() {
//     page_local_book.style.display = "block";
// });
// // 當關閉按鈕被點擊時，隱藏浮動頁面
// btn_close_local_book.addEventListener("click", function() {
//     page_local_book.style.display = "none";
// });

var pages = document.getElementsByClassName('page');
for(var i = 0; i < pages.length; i++)
{
    var page = pages[i];
    if (i % 2 === 0)
    {
        page.style.zIndex = (pages.length - i);
    }
}

document.addEventListener('DOMContentLoaded', function(){
  for(var i = 0; i < pages.length; i++)
    {
      //Or var page = pages[i];
      pages[i].pageNum = i + 1;
      pages[i].onclick=function()
        {
          if (this.pageNum % 2 === 0)
            {
              this.classList.remove('flipped');
              this.previousElementSibling.classList.remove('flipped');
            }
          else
            {
              this.classList.add('flipped');
              this.nextElementSibling.classList.add('flipped');
            }
         }
      }
})
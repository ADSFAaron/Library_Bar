// ----------------------取firebase------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyCVj-HTDHOy1UrFDP18kaXMPeCmAUxmZBI",
    authDomain: "librarybar-56ac7.firebaseapp.com",
    databaseURL: "https://librarybar-56ac7-default-rtdb.firebaseio.com",
    projectId: "librarybar-56ac7",
    storageBucket: "librarybar-56ac7.appspot.com",
    messagingSenderId: "1036473997162",
    appId: "1:1036473997162:web:29d782c89ce63d6971f713",
    measurementId: "G-JK670ND3P7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function getAllBooks() {
    return new Promise((resolve, reject) => {
        const book_array = [];
        firebase.firestore()
            .collection("books")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const books = {
                        id: doc.id,
                        content: doc.data(),
                    };
                    book_array.push(books);
                });
                resolve(book_array);
            })
            .catch((error) => {
                console.error("Error getting documents: ", error);
                reject(error);
            });
        console.log("2");
        
    });
}


// --------------------------計時器----------------------------------------

//const expirationTime = 43200 * 1000; // 毫秒
const expirationTime = 9999999 * 1000; // 毫秒
const bookStoredTime = localStorage.getItem("bookStoredTime");
const currentTime = new Date().getTime();

if (bookStoredTime === null) {
    console.log("設置");
    localStorage.setItem("bookStoredTime", new Date().getTime());

    getAllBooks()
        .then((book_array) => {
            localStorage.setItem("allbooks", JSON.stringify(book_array));
            loadData();
        })
        .catch((error) => {
            console.error("Error getting all books: ", error);
        });

}
else {
    if ((currentTime - bookStoredTime > expirationTime)) {
        console.log("over")
        localStorage.setItem("bookStoredTime", new Date().getTime());

        getAllBooks()
            .then((book_array) => {
                localStorage.setItem("allbooks", JSON.stringify(book_array));
                loadData();
            })
            .catch((error) => {
                console.error("Error getting all books: ", error);
            });
    }
    else
        loadData();
}





function loadData() {
    const allbooks = JSON.parse(localStorage.getItem("allbooks"));

        
    window.addEventListener('load', (event) => {
        // --------------------------新增分類按鈕----------------------------
        console.log(allbooks.length);

        
        const store_class_div = document.getElementById('store_class');
        console.log(allbooks.length);
        console.log(store_class_div);

        if (store_class_div) {
            const classSet = new Set();
            const class_num = 12;   //選擇出現幾個分類的按鈕

            // 取分類到不重複集合裡面，並轉成array
            for (let i = 0; i < allbooks.length; i++) {
                classSet.add(allbooks[i]["content"]["classification"]);
            }
            const class_array = Array.from(classSet);    //轉成陣列
            const randomNumbers = generateRandomNumbers(class_num, 0, class_array.length - 1);   //隨機取亂數不重複


            let div_str = "";

            for (let i = 0; i < class_num; i++) {
                div_str += '<div class="col">' +
                    '<button class="button bg-button">' + class_array[randomNumbers[i]] + '</button>' +
                    '</div>';
            }

            store_class_div.innerHTML = div_str;
        }

        // --------------------------推薦書----------------------------

        const store_recommend_div = document.getElementById('recommend_book');
        if (store_recommend_div) {
            const store_recommend_num = Math.floor(Math.random() * 10) + 3;   //推薦幾個
            const randomNumbers = generateRandomNumbers(store_recommend_num, 0, allbooks.length - 1);   //隨機取亂數不重複
            let div_str = "";

            for (let i = 0; i < store_recommend_num; i++) {
                div_str += `
                    <div class="recommend-carousel-item active">
                        <div class="recommend-carousel-item-content-head">
                            <div class="recommend-carousel-item-content-img w-fit h-fit">
                                <img src="${allbooks[randomNumbers[i]]["content"]["cover"]}">
                            </div>
                            <div class="recommend-carousel-item-content-title">
                                <p>推薦書籍</p>
                            </div>
                            <div class="recommend-carousel-item-content">
                                <p1>${allbooks[randomNumbers[i]]["content"]["name"]}</p1>
                                <br>
                                <u>${allbooks[randomNumbers[i]]["content"]["author"]}</u>
                                <br>
                                <div class="material-symbols-outlined">
                                    <button onclick="location.href='../readbook/'" class="button white-button">閱讀</button>
                                    <button>bookmark</button>
                                    <button onclick=" window.open('https://www.instagram.com/','_blank')">share </button>
                                </div>
                                <br>
                                <div class="h-40 bg-gradient-to-b from-gray-500 to-[#D8CCAE] inline-block text-transparent bg-clip-text text-justify">
                                    <p>${allbooks[randomNumbers[i]]["content"]["summary"]}</p>
                                </div>

                            </div>
                        </div>
                    </div>`;
            }

            store_recommend_div.innerHTML = div_str;
        }


        const store_ranking_div = document.getElementById('store_ranking');
        const page_book_detail_div = [];
        if(store_ranking_div){
            const store_rank_num = 6;   //排幾個
            const randomNumbers = generateRandomNumbers(store_rank_num, 0, allbooks.length - 1);   //隨機取亂數不重複
            let div_str = "";

            for (let i = 0; i < store_rank_num; i++) {
                div_str += `
                <div class="col">
                    <div id="btn_reading_book_detail${i}" class="store-ranking-content w-fit h-fit">
                        <img src="${allbooks[randomNumbers[i]]["content"]["cover"]}">
                    </div>
                    <span class="store-ranking-conten-span">${allbooks[randomNumbers[i]]["content"]["name"]}</span>
                    <p>${allbooks[randomNumbers[i]]["content"]["author"]}</p>
                </div>
                `;
            }
            store_ranking_div.innerHTML = div_str;
            
            for (let i = 0; i < store_rank_num; i++) {
                page_book_detail_div[i] = document.getElementById('page_book_detail' + i);
                div_str = `
                <!-- load css -->
                <link href="../../src/style/book_detail.css" rel="stylesheet">
                <!-- button關閉按鈕 -->
                <button class="material-symbols-outlined" id="btn_close_book_detail${i}">close</button>
                <!-- load script -->
                <!-- <script type="module" src="../../src/scripts/book_detail.js"></script> -->
                
                <div class="flex flex-col relative w-fit">
                    <div class="basis-[50px]"></div>
                    <div class="flex flex-col relative basis-[800px] mt-[1px] mx-8 mb-0">
            
                        <div class="flex items-center relative">
                            <div class="flex flex-col relative basis-[300px]">
                                <img src="${allbooks[randomNumbers[i]]["content"]["cover"]}"
                                    alt="alt text"
                                    class="rounded-3xl"/>
                            </div>
                            <div class="basis-[100px]"></div>
                            <div class="flex flex-col relative mx-0 mb-0">
                                <div class="flex flex-col relative mx-0 mb-0">
                                    <div class="flex flex-col relative mt-1 mx-0.5 mb-0">
                                        <h2 class="lg:text-[32px] lg:text-left sm:text-[16px] flex items-center font-medium text-[24px] leading-[1.37] font-NotoSans text-[rgb(13,5,5)] tracking-[0px] relative grow">
                                            ${allbooks[randomNumbers[i]]["content"]["name"]}
                                        </h2>
                                    </div>
                                    <p class="flex items-center relative">
                                        <span class="font-normal font-NotoSans text-[rgb(13,5,5)] tracking-[0px]">
                                            <span class="not-italic text-[16px] leading-[1.33] font-NotoSans text-[rgb(13,5,5)] tracking-[0px]">
                                                作者：${allbooks[randomNumbers[i]]["content"]["author"]}<br/>
                                                出版社：${allbooks[randomNumbers[i]]["content"]["publishing_house"]}<br/>    
                                                出版日期：${allbooks[randomNumbers[i]]["content"]["date"]["year"]}/${allbooks[randomNumbers[i]]["content"]["date"]["month"]}/${allbooks[randomNumbers[i]]["content"]["date"]["day"]}<br/>
                                                ISBN：${allbooks[randomNumbers[i]]["content"]["ISBN"]}<br/>
                                                定價：${allbooks[randomNumbers[i]]["content"]["price"]}元<br/>
                                                分類：${allbooks[randomNumbers[i]]["content"]["classification"]}
                                            </span>
                                        </span>
                                    </p>
                                </div>
                                <div class="flex flex-col relative mt-[3px] mx-0 mb-0">
                                    <div class="flex items-center gap-x-[17px] relative">
                                        <div class="flex flex-col rounded-xl outline outline-[rgb(136,185,41)] outline-1 outline-offset-[-1px] relative basis-[140px]">
                                            <div class="lg:mt-[3px] lg:mr-px lg:mb-[3px] lg:ml-2 xs:mt-[3px] xs:mr-px xs:mb-[3px] xs:ml-1 flex items-center gap-x-[18px] relative grow mt-[3px] mr-px mb-[3px] ml-[13px]">
                                                <div class="flex flex-col relative basis-[38px]">
                                                    <img src="https://www.sdc.org.tw/wp-content/uploads/2022/05/3-70476915-681-logo.png"
                                                        alt="alt text"
                                                        class="w-[38px] h-auto aspect-[1.19] align-top object-cover object-[center_center] relative min-w-[38px] my-[5px] mx-0"/>
                                                </div>
                                                <p type='button'
                                                class="flex items-center font-normal text-xs font-NotoSans text-black tracking-[0px] relative grow basis-[70px] min-h-[42px]"
                                                onclick="window.open('${allbooks[randomNumbers[i]]["content"]["url"]}','_blank')">
                                                    hami書城
                                                </p>
                                            </div>
                                        </div>
                                        <div class="flex flex-col rounded-xl outline outline-[rgb(49,90,146)] outline-1 outline-offset-[-1px] relative basis-[140px]">
                                            <div class="lg:mt-[3px] lg:mr-px lg:mb-[3px] lg:ml-2 xs:mt-[3px] xs:mr-px xs:mb-[3px] xs:ml-1 flex items-center gap-x-[18px] relative grow mt-[3px] mr-px mb-[3px] ml-[13px]">
                                                <div class="flex flex-col relative basis-[38px]">
                                                    <img src="https://svgsilh.com/svg/2379396.svg" alt="alt text"
                                                        class="w-[38px] h-auto aspect-[1.19] align-top object-cover object-[center_center] relative min-w-[38px] my-[5px] mx-0"/>
                                                </div>
                                                <button type='button'
                                                        class="flex items-center font-normal text-xs font-NotoSans text-black tracking-[0px] relative grow basis-[70px] min-h-[42px]" onclick="location.href='../Bookshelf/'">
                                                    Bookshelf
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            
                        <h2 class="lg:text-[20px] lg:text-left lg:my-0 lg:mx-2 sm:text-[16px] xs:my-0 xs:mx-1 flex items-center font-normal text-[24px] leading-[1.37] font-NotoSans text-[rgb(180,100,25)] tracking-[0px] relative my-0 mx-[13px]">
                            內容簡介
                        </h2>
                        <hr size="1" class="bg-[rgb(180,100,25)] h-px relative mt-2 mx-2 mb-2"/>
                        <br/>
                        <h2 class="lg:text-[20px] lg:text-left sm:text-[16px] flex items-center font-normal text-[24px] leading-[1.37] font-NotoSans text-black tracking-[0px] w-[70%] relative mt-[35px] mr-[32%] mb-0 mx-auto text-justify">
                            ${allbooks[randomNumbers[i]]["content"]["summary"]}
                        </h2>
                    </div>
                </div>
                `;
                page_book_detail_div[i].innerHTML = div_str;
            }
            // const bookimg_div = document.getElementById('bookimg');
            // if(bookimg_div){
            //     let div_str = "";

            //     for (let i = 0; i < store_rank_num; i++) {
            //         div_str = `
            //         <img src="${allbooks[randomNumbers[i]]["content"]["cover"]}"
            //                     alt="alt text"
            //                     class="rounded-3xl w-full h-auto aspect-[0.69] align-top object-cover object-[center_center] relative mt-0 mx-0 mb-3"/>
            //         `;
            //         bookimg_div.innerHTML = div_str;
            //     }
            // }

            // 取得按鈕元素和浮動頁面元素
            var btn_reading_book_detail = []
            for (let i=0; i< store_rank_num; i++){
                btn_reading_book_detail[i] = document.getElementById("btn_reading_book_detail" + i);
            }
            var page_book_detail = []
            for (let i=0; i< store_rank_num; i++){
                page_book_detail[i] = document.getElementById("page_book_detail" + i);
            }
            // var page_book_detail = document.getElementById("page_book_detail");
            var btn_close_book_detail = []
            for (let i=0; i< store_rank_num; i++){
                btn_close_book_detail[i] = document.getElementById("btn_close_book_detail" + i);
            }
            // var btn_close_book_detail = document.getElementById("btn_close_book_detail");

            // 當按鈕被點擊時，顯示浮動頁面
            for (let i=0; i< store_rank_num; i++){
                btn_reading_book_detail[i].addEventListener("click", function() {
                    page_book_detail[i].style.display = "block";
                });
            }
            // 當關閉按鈕被點擊時，隱藏浮動頁面
            for (let i=0; i< store_rank_num; i++){
                btn_close_book_detail[i].addEventListener("click", function() {
                    page_book_detail[i].style.display = "none";
                });
            }
        }
    });


}




// ----------------------- 取亂數不重複----------------------
function generateRandomNumbers(amount, min, max) {
    const numbers = new Set();

    while (numbers.size < amount) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.add(randomNumber);
    }

    return Array.from(numbers);
}

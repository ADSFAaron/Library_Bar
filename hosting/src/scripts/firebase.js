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
                                    <button onclick="location.href='../readbook/index.html'" class="button white-button">閱讀</button>
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
        if(store_ranking_div){
            const store_rank_num = 6;   //排幾個
            const randomNumbers = generateRandomNumbers(store_rank_num, 0, allbooks.length - 1);   //隨機取亂數不重複
            let div_str = "";

            for (let i = 0; i < store_rank_num; i++) {
                div_str += `
                <div class="col">
                    <div id="btn_reading_book_detail" class="store-ranking-content w-fit h-fit">
                        <img src="${allbooks[randomNumbers[i]]["content"]["cover"]}">
                    </div>
                    <span class="store-ranking-conten-span">${allbooks[randomNumbers[i]]["content"]["name"]}</span>
                    <p>${allbooks[randomNumbers[i]]["content"]["author"]}</p>
                </div>`;
            }

            store_ranking_div.innerHTML = div_str;
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

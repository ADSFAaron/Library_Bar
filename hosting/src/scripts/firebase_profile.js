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

function getAllusers() {
    return new Promise((resolve, reject) => {
        const users_array = [];
        firebase.firestore()
            .collection("users")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const users = {
                        id: doc.id,
                        content: doc.data(),
                    };
                    users_array.push(users);
                });
                resolve(users_array);
            })
            .catch((error) => {
                console.error("Error getting documents: ", error);
                reject(error);
            });
        
        
    });
}

// --------------------------計時器----------------------------------------

//const expirationTime = 43200 * 1000; // 毫秒
const expirationTime1 = 9999999 * 1000; // 毫秒
const usersStoredTime = localStorage.getItem("usersStoredTime");
const currentTime1 = new Date().getTime();

if (usersStoredTime === null) {
    console.log("設置");
    localStorage.setItem("usersStoredTime", new Date().getTime());

    getAllusers()
        .then((users_array) => {
            localStorage.setItem("allusers", JSON.stringify(users_array));
            loadData();
        })
        .catch((error) => {
            console.error("Error getting all users: ", error);
        });

}
else {
    if ((currentTime1 - usersStoredTime > expirationTime1)) {
        console.log("over")
        localStorage.setItem("usersStoredTime", new Date().getTime());

        getAllusers()
            .then((users_array) => {
                localStorage.setItem("allusers", JSON.stringify(users_array));
                loadData();
            })
            .catch((error) => {
                console.error("Error getting all users: ", error);
            });
    }
    else
        loadData();
}

function loadData() {
    const allusers = JSON.parse(localStorage.getItem("allusers"));
    const allbooks = JSON.parse(localStorage.getItem("allbooks"));
    let user_index = null;
    for(let i = 0; i < allusers.length; i++){
        if(window.location.href.split('?')[1] == allusers[i]["id"]){
            user_index = i;
            break;
        }
    } 
    window.addEventListener('load', (event) => {
        const profile_picture_div = document.getElementById('profile_picture');
        const profile_name_div = document.getElementById('profile_name');
        const profile_watchtime_div = document.getElementById('profile_watchtime');
        const profile_watchbook_div = document.getElementById('profile_watchtbook');
        const profile_Achievement_div = document.getElementById('profile_achievement');
        const reading_book_progress_profile_name_div = document.getElementById('reading_book_progress_profile_name');
        const reading_book_progress_profile_picture_div = document.getElementById('reading_book_progress_profile_picture');
        const reading_book_progress_profile_content_div = document.getElementById('reading_book_progress_profile_content');
        let temp = "";

        // --------------------------個人資料 閱讀書籍進度 個人名字--------------------------
        temp = `
        <h3 class="flex items-center font-normal text-[21px] leading-[1.38] font-NotoSans text-black tracking-[0px] relative">
            ${allusers[user_index]["content"]["name"]}
        </h3>
        `;
        reading_book_progress_profile_name_div.innerHTML = temp;

        // --------------------------個人資料 閱讀書籍進度 個人頭像--------------------------
        temp = `
        <div class="flex flex-col relative basis-12">
            <img
            alt="alt text"
            class="w-12 h-auto aspect-[1] align-top object-cover rounded-full object-[center_center] relative min-w-[48px] mt-[3.5px] mx-0 mb-0"
            src="https://api.multiavatar.com/${allusers[user_index]["id"]}.svg"
            />
        </div>
        `;
        reading_book_progress_profile_picture_div.innerHTML = temp;
    
        // --------------------------個人資料 閱讀書籍進度 個人消息內容--------------------------        
        temp = `
        <h3 class="flex items-center justify-start font-normal text-[21px] leading-[1.38] font-NotoSans text-black text-right tracking-[0px] relative mt-[23px] mx-0 mb-0">
            ${allusers[user_index]["content"]["name"]} 看了 鈴芽之旅 已觀看 46 %
        </h3>
        `; 
        reading_book_progress_profile_content_div.innerHTML = temp;

        // --------------------------個人頭像-------------------------------
        temp = `
        <img
            alt="alt text"
            class="w-[calc(100%_-_12px)] h-auto aspect-[1] align-top rounded-full object-cover object-[center_center] relative mt-0 mr-3 mb-0 ml-0"
            src="https://api.multiavatar.com/${allusers[user_index]["id"]}.svg"
        />
        `;
        profile_picture_div.innerHTML = temp;
        
        // --------------------------個人資料 name--------------------------
        temp = `
        <div class="flex items-center justify-center font-normal text-[24px] leading-[1.37] font-NotoSans text-black text-center tracking-[0px] relative min-h-[49px] mt-0 mr-[39px] mb-0 ml-2">
            <p>${allusers[user_index]["content"]["name"]}</p>
        </div>`;
        profile_name_div.innerHTML = temp;

        // --------------------------個人資料 觀看時間--------------------------
        temp = `
        <div class="flex items-center font-normal text-[24px] leading-[1.37] font-NotoSans text-white tracking-[0px] relative grow basis-[136px] min-h-[57px]">
            <p>${allusers[user_index]["content"]["totalReadtime"]} 分</p>
        </div>`;
        profile_watchtime_div.innerHTML = temp;

        // --------------------------個人資料 觀看書籍--------------------------
        temp = `
        <div class="flex items-center font-normal text-[24px] leading-[1.37] font-NotoSans text-[rgb(70,70,70)] tracking-[0px] relative grow basis-[136px] min-h-[57px]">
            <p>${allusers[user_index]["content"]["totalReadbooks"]} / ${allbooks.length} 本</p>
        </div>`;            
        profile_watchbook_div.innerHTML = temp;

        // --------------------------個人資料 成就--------------------------        
        temp = `
        <div class="flex items-center font-normal text-[24px] leading-[1.37] font-NotoSans text-[rgb(70,70,70)] tracking-[0px] relative grow basis-[136px] min-h-[57px]">
            <p>${allusers[user_index]["content"]["achievement"].length} / 10 個</p>
        </div>`;
        console.log(allusers[user_index]["content"]["achievement"].length); 
        profile_Achievement_div.innerHTML = temp;
    });
}

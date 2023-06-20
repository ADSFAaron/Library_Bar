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
    });
}

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
    console.log(allusers);
    window.addEventListener('load', (event) => {
        // --------------------------個人頭像-------------------------------
        const profile_picture_div = document.getElementById('profile_picture');
        let profile_picture_name = "";
    

        if(profile_picture_div){
            for(let i = 0; i < allusers.length; i++){
                if(window.location.href.split('?')[1] == allusers[i]["id"]){
                    profile_picture_name += `
                    <img
                    alt="alt text"
                    class="w-[calc(100%_-_12px)] h-auto aspect-[1] align-top rounded-full object-cover object-[center_center] relative mt-0 mr-3 mb-0 ml-0"
                    src="https://api.multiavatar.com/${allusers[i]["id"]}.svg"
                    />
                    `;
                    console.log(allusers[i]["id"]); 
                    break;
                }
            }
            
        } 
        profile_picture_div.innerHTML = profile_picture_name;
        // --------------------------個人資料 name--------------------------
        const profile_name_div = document.getElementById('profile_name');
        let div_name = "";
    

        if(profile_name_div){
            for(let i = 0; i < allusers.length; i++){
                if(window.location.href.split('?')[1] == allusers[i]["id"]){
                    div_name += `
                    <div
                    class="flex items-center justify-center font-normal text-[24px] leading-[1.37] font-NotoSans text-black text-center tracking-[0px] relative min-h-[49px] mt-0 mr-[39px] mb-0 ml-2"
                    >
                        <p>${allusers[i]["content"]["name"]}</p>
                    </div>`;
                    console.log(allusers[i]["content"]["name"]); 
                    break;
                }
            }
            
        } 
        profile_name_div.innerHTML = div_name;
        // --------------------------個人資料 觀看時間--------------------------
        const profile_watchtime_div = document.getElementById('profile_watchtime');
        let div_watchtime = "";

        if(profile_watchtime_div){
            for(let i = 0; i < allusers.length; i++){
                if(window.location.href.split('?')[1] == allusers[i]["id"]){
                    div_watchtime += `
                    <div
                    class="flex items-center font-normal text-[24px] leading-[1.37] font-NotoSans text-white tracking-[0px] relative grow basis-[136px] min-h-[57px]"
                    >
                        <p>${allusers[i]["content"]["totalReadtime"]} 分</p>
                    </div>`;
                    console.log(allusers[i]["content"]["totalReadtime"]); 
                    break;
                }
            }
            
        } 
        profile_watchtime_div.innerHTML = div_watchtime;

        // --------------------------個人資料 觀看書籍--------------------------
        const profile_watchbook_div = document.getElementById('profile_watchtbook');
        let div_watchbook = "";

        if(profile_watchbook_div){
            for(let i = 0; i < allusers.length; i++){
                if(window.location.href.split('?')[1] == allusers[i]["id"]){
                    div_watchbook += `
                    <div
                    class="flex items-center font-normal text-[24px] leading-[1.37] font-NotoSans text-[rgb(70,70,70)] tracking-[0px] relative grow basis-[136px] min-h-[57px]"
                    >
                        <p>${allusers[i]["content"]["totalReadbooks"]} / ${allbooks.length} 本</p>
                    </div>`;
                    console.log(allusers[i]["content"]["totalReadbooks"]); 
                    break;
                }
            }
            
        } 
        profile_watchbook_div.innerHTML = div_watchbook;

        // --------------------------個人資料 成就--------------------------
        const profile_Achievement_div = document.getElementById('profile_achievement');
        let div_Achievement = "";
        

        if(profile_Achievement_div){
            for(let i = 0; i < allusers.length; i++){
                if(window.location.href.split('?')[1] == allusers[i]["id"]){
                    div_Achievement += `
                    <div
                    class="flex items-center font-normal text-[24px] leading-[1.37] font-NotoSans text-[rgb(70,70,70)] tracking-[0px] relative grow basis-[136px] min-h-[57px]"
                    >
                        <p>${allusers[i]["content"]["achievement"].length} / 10 個</p>
                    </div>`;
                    console.log(allusers[i]["content"]["achievement"].length); 
                    break;
                }
            }
            
        } 
        profile_Achievement_div.innerHTML = div_Achievement;

        // --------------------------個人資料 閱讀書籍進度--------------------------
        const reading_book_progress_profile_name_div = document.getElementById('reading_book_progress_profile_name');
        let div_reading_book_progress_profile_name = "";
        

        if(reading_book_progress_profile_name_div){
            for(let i = 0; i < allusers.length; i++){
                if(window.location.href.split('?')[1] == allusers[i]["id"]){
                    div_reading_book_progress_profile_name += `
                    ${allusers[i]["content"]["name"]}
                    `;
                    break;
                }
            }
            
        } 
        reading_book_progress_profile_name_div.innerHTML = div_reading_book_progress_profile_name;

        // --------------------------個人資料 閱讀書籍進度--------------------------
        const reading_book_progress_profile_picture_div = document.getElementById('reading_book_progress_profile_picture');
        let div_reading_book_progress_profile_picture = "";
        

        if(reading_book_progress_profile_picture_div){
            for(let i = 0; i < allusers.length; i++){
                if(window.location.href.split('?')[1] == allusers[i]["id"]){
                    div_reading_book_progress_profile_picture += `
                    <img
                    alt="alt text"
                    class="w-12 h-auto aspect-[1] align-top object-cover rounded-full object-[center_center] relative min-w-[48px] mt-[3.5px] mx-0 mb-0"
                    src="https://api.multiavatar.com/${allusers[i]["id"]}.svg"
                    />
                    `;
                    break;
                }
            }
            
        } 
        reading_book_progress_profile_picture_div.innerHTML = div_reading_book_progress_profile_picture;
    
        // --------------------------個人資料 閱讀書籍進度--------------------------
        const reading_book_progress_profile_content_div = document.getElementById('reading_book_progress_profile_content');
        let div_reading_book_progress_profile_content = "";
        

        if(reading_book_progress_profile_content_div){
            for(let i = 0; i < allusers.length; i++){
                if(window.location.href.split('?')[1] == allusers[i]["id"]){
                    div_reading_book_progress_profile_content += `
                    ${allusers[i]["content"]["name"]} 看了 鈴芽之旅 已觀看 46 %
                    `;
                    break;
                }
            }
            
        } 
        reading_book_progress_profile_content_div.innerHTML = div_reading_book_progress_profile_content;
    });
}

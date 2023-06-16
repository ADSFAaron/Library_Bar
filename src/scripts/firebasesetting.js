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


function getAllsetting(url) {
    return new Promise((resolve, reject) => {
        const setting_array = [];
        firebase.firestore()
            .collection("users").doc(url).collection("Settings")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const setting = {
                        id: doc.id,
                        content: doc.data(),
                    };
                    setting_array.push(setting);
                });
                resolve(setting_array);
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

// --------------------------計時器----------------------------------------

//const expirationTime = 43200 * 1000; // 毫秒
const expirationTime = 9999999 * 1000; // 毫秒
const settingStoredTime = localStorage.getItem("settingStoredTime");
const currentTime = new Date().getTime();

const url = window.location.href.split('?')[1]
console.log(url);

if (settingStoredTime === null) {
    console.log("設置");
    localStorage.setItem("settingtStoredTime", new Date().getTime());

    getAllsetting(url)
        .then((setting_array) => {
            localStorage.setItem("allsetting", JSON.stringify(setting_array));
            loadData();
        })
        .catch((error) => {
            console.error("Error getting all setting: ", error);
        });

}
else {
    if ((currentTime - settingStoredTime > expirationTime)) {
        console.log("over")
        localStorage.setItem("settingStoredTime", new Date().getTime());

        getAllsetting(url)
            .then((setting_array) => {
                localStorage.setItem("allusers", JSON.stringify(users_array));
                loadData();
            })
            .catch((error) => {
                console.error("Error getting all setting: ", error);
            });
    }
    else
        loadData();
}

function setting(){
    if (settingStoredTime === null) {
        localStorage.setItem("settingtStoredTime", new Date().getTime());
        getAllsetting(url)
            .then((setting_array) => {
                localStorage.setItem("allsetting", JSON.stringify(setting_array));
                loadData();
            })
            .catch((error) => {
                console.error("Error getting all setting: ", error);
            });
    
    }
    else {
        if ((currentTime - settingStoredTime > expirationTime)) {
            localStorage.setItem("settingStoredTime", new Date().getTime());
            getAllsetting(url)
                .then((setting_array) => {
                    localStorage.setItem("allusers", JSON.stringify(users_array));
                    loadData();
                })
                .catch((error) => {
                    console.error("Error getting all setting: ", error);
                });
        }
        else
            loadData();
    }
}


function getspeed() {
    console.log(document.getElementById('speed').value);
    var setspeed = {
        speed: document.getElementById('speed').value
    }
    firebase.firestore()
            .collection("users").doc(url).collection("Settings").doc("readingSet")
            .update(setspeed)
            .then(function() {
                setting();
            })
            .catch((error) => {
                console.error("Error getting all setting: ", error);
            });
}

function getfontfamily() {
    console.log(document.getElementById('fontfamily').value);
    var setfontfamily = {
        fontfamily: document.getElementById('fontfamily').value
    }
    firebase.firestore()
            .collection("users").doc(url).collection("Settings").doc("readingSet")
            .update(setfontfamily)
            .then(function() {
                setting();
            })
            .catch((error) => {
                console.error("Error getting all setting: ", error);
            });
}

function getfont() {
    console.log(document.getElementById('font').value);
    var setfont = {
        font: document.getElementById('font').value
    }
    firebase.firestore()
            .collection("users").doc(url).collection("Settings").doc("readingSet")
            .update(setfont)
            .then(function() {
                setting();
            })
            .catch((error) => {
                console.error("Error getting all setting: ", error);
            });
}

function getbackground() {
    console.log(document.getElementById('background').value);
    var setbackground = {
        background: document.getElementById('background').value
    }
    firebase.firestore()
            .collection("users").doc(url).collection("Settings").doc("readingSet")
            .update(setbackground)
            .then(function() {
                setting();
            })
            .catch((error) => {
                console.error("Error getting all setting: ", error);
            });
}

function loadData() {
    const allsetting = JSON.parse(localStorage.getItem("allsetting"));
    // console.log(allsetting);
    const allusers = JSON.parse(localStorage.getItem("allusers"));
    const allbooks = JSON.parse(localStorage.getItem("allbooks"));
    window.addEventListener('load', (event) => {
        // --------------------------setting_speed--------------------------
        const setting_speed_div = document.getElementById('setting_speed');
        let div_speed = "";
    

        if(setting_speed_div){
            // --------------------------setting_speed == 1 --------------------------
            if(allsetting[0]["content"]["speed"]==1){
                div_speed += `
                <div class="mt-[10px]">
                    <span>閱讀速度</span>
                    <span style="font-size: 20px;">(判斷有效閱讀時間用)</span>
                    <select id="speed" onchange="getspeed()" style="float: right;">
                        <option value="3">快</option>
                        <option value="2">中</option>
                        <option value="1" selected>慢</option>
                    </select>
                </div>`;
                console.log(allsetting[0]["content"]["speed"]); 
            }
            // --------------------------setting_speed == 2 --------------------------
            else if(allsetting[0]["content"]["speed"]==2){
                div_speed += `
                <div class="mt-[10px]">
                    <span>閱讀速度</span>
                    <span style="font-size: 20px;">(判斷有效閱讀時間用)</span>
                    <select id="speed" onchange="getspeed()" style="float: right;">
                        <option value="3">快</option>
                        <option value="2" selected>中</option>
                        <option value="1">慢</option>
                    </select>
                </div>`;
                console.log(allsetting[0]["content"]["speed"]); 
            }
            // --------------------------setting_speed == 3 --------------------------
            else if(allsetting[0]["content"]["speed"]==3){
                div_speed += `
                <div class="mt-[10px]">
                    <span>閱讀速度</span>
                    <span style="font-size: 20px;">(判斷有效閱讀時間用)</span>
                    <select id="speed" onchange="getspeed()" style="float: right;">
                        <option value="3" selected>快</option>
                        <option value="2">中</option>
                        <option value="1">慢</option>
                    </select>
                </div>`;
                console.log(allsetting[0]["content"]["speed"]); 
            }

        }
        setting_speed_div.innerHTML = div_speed;
        
        // --------------------------setting_fontfamily--------------------------
        const setting_fontfamily_div = document.getElementById('setting_fontfamily');
        let div_fontfamily = "";
    

        if(setting_fontfamily_div){
            // --------------------------setting_fontfamily == serif --------------------------
            if(allsetting[0]["content"]["fontfamily"]=="serif"){
                div_fontfamily += `
                <div class="mt-[10px]">
                    <span>字型</span>
                    <select id="fontfamily" onchange="getfontfamily()" style="float: right;">
                        <option value="標楷體">標楷體</option>
                        <option value="新細明體">新細明體</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="serif" selected>serif</option>
                    </select>
                </div>`;
                console.log(allsetting[0]["content"]["fontfamily"]); 
            }
            // --------------------------setting_fontfamily == 標楷體 --------------------------
            else if(allsetting[0]["content"]["fontfamily"]=="標楷體"){
                div_fontfamily += `
                <div class="mt-[10px]">
                    <span>字型</span>
                    <select id="fontfamily" onchange="getfontfamily()" style="float: right;">
                        <option value="標楷體" selected>標楷體</option>
                        <option value="新細明體">新細明體</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="serif">serif</option>
                    </select>
                </div>`;
                console.log(allsetting[0]["content"]["fontfamily"]); 
            }
            // --------------------------setting_fontfamily == 新細明體 --------------------------
            else if(allsetting[0]["content"]["fontfamily"]=="新細明體"){
                div_fontfamily += `
                <div class="mt-[10px]">
                    <span>字型</span>
                    <select id="fontfamily" onchange="getfontfamily()" style="float: right;">
                        <option value="標楷體">標楷體</option>
                        <option value="新細明體" selected>新細明體</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="serif">serif</option>
                    </select>
                </div>`;
                console.log(allsetting[0]["content"]["fontfamily"]); 
            }
            // --------------------------setting_fontfamily == Times New Roman --------------------------
            else if(allsetting[0]["content"]["fontfamily"]=="Times New Roman"){
                div_fontfamily += `
                <div class="mt-[10px]">
                    <span>字型</span>
                    <select id="fontfamily" onchange="getfontfamily()" style="float: right;">
                        <option value="標楷體">標楷體</option>
                        <option value="新細明體">新細明體</option>
                        <option value="Times New Roman" selected>Times New Roman</option>
                        <option value="serif">serif</option>
                    </select>
                </div>`;
                console.log(allsetting[0]["content"]["fontfamily"]); 
            }

        }
        setting_fontfamily_div.innerHTML = div_fontfamily;

        // --------------------------setting_font--------------------------
        const setting_font_div = document.getElementById('setting_font');
        let div_font = "";
    

        if(setting_font_div){
            // --------------------------setting_font == 白 --------------------------
            if(allsetting[0]["content"]["font"]=="ffffff"){
                div_font += `
                <div class="mt-[10px]">
                    <span>字體顏色</span>
                    <select id="font" onchange="getfont()" style="float: right;">
                        <option value="000000">黑</option>
                        <option value="ffffff"  selected>白</option>
                    </select>
                </div>`;
                console.log(allsetting[0]["content"]["font"]); 
            }
            // --------------------------setting_font == 黑 --------------------------
            else if(allsetting[0]["content"]["font"]=="000000"){
                div_font += `
                <div class="mt-[10px]">
                    <span>字體顏色</span>
                    <select id="font" onchange="getfont()" style="float: right;">
                        <option value="000000"  selected>黑</option>
                        <option value="ffffff">白</option>
                    </select>
                </div>`;
                console.log(allsetting[0]["content"]["font"]); 
            }

        }
        setting_font_div.innerHTML = div_font;

        // --------------------------background--------------------------
        const setting_background_div = document.getElementById('setting_background');
        let div_background = "";
    

        if(setting_background_div){
            // --------------------------background == 亮色 --------------------------
            if(allsetting[0]["content"]["background"]=="ffffff"){
                div_background += `
                <div class="mt-[10px]">
                    <span>字體顏色</span>
                    <select id="background" onchange="getbackground()" style="float: right;">
                        <option value="000000">暗色</option>
                        <option  selected>亮色</option>
                    </select>
                </div>`;
                console.log(allsetting[0]["content"]["background"]); 
            }
            // --------------------------background == 暗色 --------------------------
            else if(allsetting[0]["content"]["background"]=="000000"){
                div_background += `
                <div class="mt-[10px]">
                    <span>字體顏色</span>
                    <select id="background" onchange="getbackground()" style="float: right;">
                        <option value="000000"  selected>暗色</option>
                        <option value="ffffff">亮色</option>
                    </select>
                </div>`;
                console.log(allsetting[0]["content"]["background"]); 
            }

        }
        setting_background_div.innerHTML = div_background;
        
    });
}

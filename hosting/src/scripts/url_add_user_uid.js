function loadData() {  
    window.addEventListener('load', (event) => {
        // ------------button_Search------------
        let url = window.location.href.split('?')[1]
        const button1 = document.getElementById('button_Search');
        let div_button1 = "";
        if(button1){
            div_button1 += `
                <span>
                    <img class="logo-img" src="../../img/search_FILL0_wght400_GRAD0_opsz48.svg" alt="Search Logo"/>
                        <span>Search</span>
                </span>`;
        }
        button1.innerHTML = div_button1;
        button1.addEventListener("click", function(e){
            e.preventDefault();
            location.href=('../Search/?' + url);
        });
        // ------------button_Feed------------
        const button2 = document.getElementById('button_Feed');
        let div_button2 = "";
        if(button2){
            div_button2 += `
                <span>
                    <img class="logo-img" src="../../img/feed_FILL0_wght400_GRAD0_opsz48.svg" alt="Feed Logo"/>
                        <span>Feed</span>
                </span>`;
        }
        button2.innerHTML = div_button2;
        button2.addEventListener("click", function(e){
            e.preventDefault();
            location.href=('../feed/?' + url);
        });
        // ------------button_Store------------
        const button3 = document.getElementById('button_Store');
        let div_button3 = "";
        if(button3){
            div_button3 += `
                <span>
                    <img class="logo-img" src="../../img/store_FILL0_wght400_GRAD0_opsz48.svg" alt="Store Logo"/>
                        <span>Store</span>
                </span>`;
        }
        button3.innerHTML = div_button3;
        button3.addEventListener("click", function(e){
            e.preventDefault();
            location.href=('../store/?' + url);
        });
        // ------------button_Profile------------
        const button4 = document.getElementById('button_Profile');
        let div_button4 = "";
        if(button4){
            div_button4 += `
                <span>
                    <img class="logo-img" src="../../img/face_5_FILL0_wght400_GRAD0_opsz48.svg" alt="Profile Logo"/>
                        <span>Profile</span>
                </span>`;
        }
        button4.innerHTML = div_button4;
        button4.addEventListener("click", function(e){
            e.preventDefault();
            location.href=('../Profile/?' + url);
        });
        // ------------button_Bookshelf------------
        const button5 = document.getElementById('button_Bookshelf');
        let div_button5 = "";
        if(button5){
            div_button5 += `
                <span>
                    <img class="logo-img" src="../../img/book_FILL0_wght400_GRAD0_opsz48.svg" alt="Bookshelf Logo"/>
                        <span>Bookshelf</span>
                </span>`;
        }
        button5.innerHTML = div_button5;
        button5.addEventListener("click", function(e){
            e.preventDefault();
            location.href=('../Bookshelf/?' + url);
        });
        // ------------button_Setting------------
        const button6 = document.getElementById('button_Seeting');
        let div_button6 = "";
        if(button6){
            div_button6 += `
                <span>
                    <img class="logo-img" src="../../img/tune_FILL0_wght400_GRAD0_opsz48.svg" alt="Settings Logo"/>
                        <span>Settings</span>
                </span>`;
        }
        button6.innerHTML = div_button6;
        button6.addEventListener("click", function(e){
            e.preventDefault();
            location.href=('../Settings/?' + url);
        });
    });
}
loadData();
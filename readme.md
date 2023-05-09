# Library Bar

> 原先資料說明在[Hackmd](https://hackmd.io/@sGEp9JWcRCW0QY1r-j9kRg/H1Axjeckh)，這邊只是說明如何執行
> 
## 檔案位置(在`hosting`資料夾)
* `dist`資料夾是放編譯完檔案
* `img`資料夾是放圖片檔
* `pages`資料夾是放網頁檔案的所在處
  * 每一個網頁需要建立一個資料夾
* `script`資料夾是放JS
* `style`資料夾是放CSS
* `vite.condfig.ts`檔案是放網頁路徑修改


-----
### :warning::warning::warning: 以下執行的路徑，都要切到`hosting`資料夾路徑底下 :warning::warning::warning:

> 使用`PowerShell`或`cmd(命令提示字元)`進行`npm`指令，如果`npm`指令不能跑，請安裝[node.js](https://nodejs.org/zh-tw/download)
> 
> 如果`npm`套件有跳遺失，記得安裝



## 基本步驟
#### 安裝依賴項
```
npm i
```

#### 執行測試
```
npm run dev
``` 
按下`o`鍵查看首頁有沒有正常顯示，確認完網頁都正常值後按下按下`q`鍵離開
  * press r to restart the server
  * press u to show server url
  * press o to open in browser
  * press c to clear console
  * press q to quit

#### 重新編譯測試檔
```
npm run build
```

#### 測試編譯完檔案
```
npm run preview
``` 
查看網頁路徑，其他頁面也是
* [http://localhost:4173/pages/feed](http://localhost:4173/pages/feed)
* [http://localhost:4173/pages/readbook](http://localhost:4173/pages/readbook)
* [http://localhost:4173/pages/store](http://localhost:4173/pages/store)
* [http://localhost:4173/pages/template](http://localhost:4173/pages/template)

確認編譯後的網頁沒問題之後，按`Ctrl + C`退出

<details>
  <summary>
    開始部署(沒事不要部署)
  </summary>
    #### 安裝 firebase CLI (第一次啟動就好)
    ```
    npm install -g firebase-tools
    ```

    #### 啟動登錄過程 (第一次啟動就好)
    ```
    firebase login
    ```

    #### 啟用 webframeworks (第一次啟動就好)
    ```
    firebase experiments:enable webframeworks
    ```

    #### 部屬到 firebase 部署到 hosting
    ```
    firebase deploy
    ```

    #### 查看已部署的網頁
    * [https://librarybar-56ac7.web.app](https://librarybar-56ac7.web.app)
    * [https://librarybar-56ac7.web.app/pages/feed](https://librarybar-56ac7.web.app/pages/feed)
    * [https://librarybar-56ac7.web.app/pages/readbook](https://librarybar-56ac7.web.app/pages/readbook)
    * [https://librarybar-56ac7.web.app/pages/store](https://librarybar-56ac7.web.app/pages/store)
    * [https://librarybar-56ac7.web.app/pages/template](https://librarybar-56ac7.web.app/pages/template)
  
</details>
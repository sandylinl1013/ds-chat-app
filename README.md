## 環境設置
在開始之前，請確保您已經安裝並設置好以下開發環境：

### 1. Node.js
請安裝 Node.js 21 以上版本。您可以從 [Node.js 官方網站](https://nodejs.org/en) 下載和安裝最新版本。  
可以使用 node -v 確定版本及安裝
```
node -v
```

### 2. Java Development Kit (JDK)
請安裝 JDK 10 以上版本。
```
java -version
```

### 3. 環境變數設置

### JAVA_HOME, ANDROID_HOME

#### Windows:
 環境變數-系統變數” 部分，點擊 “新建” 並添加以下內容：  
 1. JAVA_HOME:   
- 變數名: JAVA_HOME  
- 變數值: JDK 安裝目錄 (例如 C:\Program Files\Java\jdk1.8.0_241)
  
2. ANDROID_HOME:
  
- 變數名: ANDROID_HOME
- 變數值: Android SDK 安裝目錄 (例如 C:\Users\YourUsername\AppData\Local\Android\Sdk)

#### macOS/Linux:
在終端中添加以下內容到 ~/.bashrc 或 ~/.zshrc 文件中：
```
export JAVA_HOME=/path/to/your/jdk
source ~/.bashrc
```
```
export ANDROID_HOME=/path/to/your/android/sdk
source ~/.bashrc
```

### 4. 安裝 Expo CLI
```
npm install -g expo-cli
```

### 5. 專案設置
```
npm install
npx expo start
```




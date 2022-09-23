# Backend測試專案
# 0. 附錄

1. 本專案皆使用 pnpm，使用前先 `npm` 後直接下列指令即可。


---

# 1. 環境

## 1.1 環境設定

### 1.1.1 初始化設定

**[本專案皆使用 pnpm]**

1. **安裝套件 :**
    - pnpm install

2. **安裝wdio/cli :**
    - pnpm install @wdio/cli

3. **執行程式 :**
    - npx wdio run ./wdio.conf.js
4. **查看報告 :**
    - npx allure open
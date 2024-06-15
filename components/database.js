import * as SQLite from 'expo-sqlite';

export const getDatabaseConnection = async (userID) => {
    try {
        // 根据 UserID 命名数据库文件
        const dbName = `${userID}.db`;
        // 打开数据库连接并返回
        return await SQLite.openDatabaseAsync(dbName);
    } catch (error) {
        console.log('Error opening database connection:', error);
        return null;
    }
};

export const createTables = async (uid) => {
    try {
        const dbName = `${uid}.db`;
        const db = await SQLite.openDatabaseAsync(dbName);
        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Message (
        MessageID TEXT PRIMARY KEY,
        Content TEXT NOT NULL,
        "From" TEXT NOT NULL,
        ChatID TEXT NOT NULL,
        Time DATETIME NOT NULL,
        FOREIGN KEY ("From") REFERENCES FriendInvitation(UserID),
        FOREIGN KEY (ChatID) REFERENCES Chat(ChatID)
      );
    `);
        console.log('Message table created successfully');

        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS FriendInvitation (
        UserID TEXT PRIMARY KEY,
        Name TEXT NOT NULL,
        Nickname TEXT,
        PersonalInfo TEXT,
        Avatar BLOB,
        Status BOOLEAN NOT NULL
      );
    `);
        console.log('FriendInvitation table created successfully');

        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Chat (
        ChatID TEXT PRIMARY KEY,
        Name TEXT NOT NULL
      );
    `);
        console.log('Chat table created successfully');

        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS ChatMember (
        ChatID TEXT NOT NULL,
        UserID TEXT NOT NULL,
        FOREIGN KEY (ChatID) REFERENCES Chat(ChatID),
        FOREIGN KEY (UserID) REFERENCES FriendInvitation(UserID),
        PRIMARY KEY (ChatID, UserID)
      );
    `);
        // 查询并打印所有表的内容
        await queryAndLogTable(db, 'Message');
        await queryAndLogTable(db, 'FriendInvitation');
        await queryAndLogTable(db, 'Chat');


        console.log('Tables created successfully');
    } catch (error) {
        console.log('Error creating tables:', error);
    }
};

const queryAndLogTable = async (db, tableName) => {
    try {
        const result = await db.getAllAsync(`SELECT * FROM ${tableName}`);
        console.log(`Contents of ${tableName} table:`);
        console.log(result);
    } catch (error) {
        console.log(`Error querying ${tableName} table:`, error);
    }
};

// 插入用戶數據
export const insertUser = async (uid, userID, name, nickname, personalInfo, avatarBase64, status) => {
    try {
        //console.log('Name: ',name);
        const dbName = `${uid}.db`;
        const db = await SQLite.openDatabaseAsync(dbName);
        await db.runAsync(
            `INSERT INTO FriendInvitation (UserID, Name, Nickname, PersonalInfo, Avatar, Status) VALUES (?, ?, ?, ?, ?, ?)`,
            userID, name, nickname, personalInfo, avatarBase64, status
            //await db.runAsync('INSERT INTO test (value, intValue) VALUES (?, ?)', 'aaa', 100);
            //`INSERT INTO test (value, intValue) VALUES ('test1', 123);`
            //`INSERT INTO FriendInvitation (UserID, Name, Nickname, PersonalInfo, Avatar, Status) VALUES ('gxgKKLvCJfd1IB9d96pHPCk7ZFb2', 'Abc', Null, 'None', Null, true)`
        );
        await queryAndLogTable(db, 'FriendInvitation');
        console.log('User inserted successfully');
    } catch (error) {
        console.log('Error inserting user:', error);
    }
};

//變更好友狀態
export const updateUserStatus = async (uid, userID, status) => {
    try {
      const dbName = `${uid}.db`;
      const db = await SQLite.openDatabaseAsync(dbName);
      await db.runAsync('UPDATE FriendInvitation SET Status = ? WHERE UserID = ?', status, userID);
      console.log('User status updated successfully');
    } catch (error) {
      console.log('Error updating user status:', error);
    }
  };


// 插入消息
export const insertMessage = async (uid, messageID, content, from, chatID, time) => {
    try {
        const dbName = `${uid}.db`;
        const db = await SQLite.openDatabaseAsync(dbName);
        await db.runAsync(
            'INSERT INTO Message (MessageID, Content, "From", ChatID, Time) VALUES (?, ?, ?, ?, ?)',
            messageID, content, from, chatID, time
        );
        console.log('Message inserted successfully');
    } catch (error) {
        console.log('Error inserting message:', error);
    }
};

// 刪除用戶
export const deleteUser = async (uid, userID) => {
    try {
        const dbName = `${uid}.db`;
        const db = await SQLite.openDatabaseAsync(dbName);
        await db.runAsync(`DELETE FROM FriendInvitation WHERE UserID = ?`, userID);
        console.log('User deleted successfully');
    } catch (error) {
        console.log('Error deleting user:', error);
    }
};

// 查詢好友
export const queryFriend = async (uid) => {
    try {
        const dbName = `${uid}.db`;
        const db = await SQLite.openDatabaseAsync(dbName);
        const result = await db.getAllAsync('SELECT * FROM FriendInvitation WHERE Status = true');
        return result;
    } catch (error) {
        console.log('Error querying user:', error);
        return null;
    }
};

// 新增聊天室
export const insertChat = async (uid, chatID, name) => {
    try {
        const dbName = `${uid}.db`;
        const db = await SQLite.openDatabaseAsync(dbName);
        await db.runAsync('INSERT INTO Chat (ChatID, Name) VALUES (?, ?)', chatID, name);
        console.log('Chat inserted successfully');
    } catch (error) {
        console.log('Error inserting chat:', error);
    }
};

// 列出聊天室
export const listChat = async (uid) => {
    try {
        const dbName = `${uid}.db`;
        const db = await SQLite.openDatabaseAsync(dbName);
        const result = await db.getAllAsync('SELECT * FROM Chat');
        return result;
    } catch (error) {
        console.log('Error querying chat:', error);
        return null;
    }
};

// 查詢聊天
export const searchChat = async (uid, chatID) => {
    try {
        const dbName = `${uid}.db`;
        const db = await SQLite.openDatabaseAsync(dbName);
        const result = await db.getAllAsync('SELECT * FROM Chat WHERE ChatID = ?', chatID);
        return result;
    } catch (error) {
        console.log('Error querying chat:', error);
        return null;
    }
};

// 刪除消息
export const deleteMessage = async (uid, messageID) => {
    try {
        const dbName = `${uid}.db`;
        const db = await SQLite.openDatabaseAsync(dbName);
        await db.runAsync('DELETE FROM Message WHERE MessageID = ?', messageID);
        console.log('Message deleted successfully');
    } catch (error) {
        console.log('Error deleting message:', error);
    }
};

// 列出聊天室消息
export const queryMessages = async (uid, chatID) => {
    try {
        const dbName = `${uid}.db`;
        const db = await SQLite.openDatabaseAsync(dbName);
        const result = await db.getAllAsync('SELECT * FROM Message WHERE ChatID = ? ORDER BY Time DESC LIMIT 100',chatID);
        return result;
    } catch (error) {
        console.log('Error querying messages:', error);
        return null;
    }
};
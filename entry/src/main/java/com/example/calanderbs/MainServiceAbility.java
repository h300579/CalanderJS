package com.example.calanderbs;

import ohos.ace.ability.AceInternalAbility;
import ohos.data.distributed.common.Entry;
import ohos.data.distributed.common.KvStoreException;
import ohos.data.distributed.user.SingleKvStore;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;
import ohos.rpc.MessageOption;
import ohos.rpc.MessageParcel;
import ohos.utils.zson.ZSONObject;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class MainServiceAbility extends AceInternalAbility {

    private static final String BUNDLE_NAME = "com.example.calanderbs";
    private static final String ABILITY_NAME = "com.example.calanderbs.MainServiceAbility";
    private static final int SUCCESS = 0;
    private static final int ERROR = 1;


    private static final int ACTION_INSERT_TODOLIST = 10001;
    private static final int ACTION_SELECT_TODOLIST = 10002;
    private static final int ACTION_SYNC = 101;

    // 定义日志标签
    private static final HiLogLabel LABEL = new HiLogLabel(HiLog.LOG_APP, 0, "TodoDatabase");

    private static MainServiceAbility instance;
    private MainAbility abilityContext;

    // 如果多个Ability实例都需要注册当前InternalAbility实例，需要更改构造函数，设定自己的bundleName和abilityName
    public MainServiceAbility(String bundleName, String abilityName) {
        super(bundleName, abilityName);
    }

    public MainServiceAbility(String abilityName) {
        super(abilityName);
    }

    public MainServiceAbility() {
        super(BUNDLE_NAME, ABILITY_NAME);
    }

    public boolean onRemoteRequest(int code, MessageParcel data, MessageParcel reply, MessageOption option) {
        // Main函数中创建的数据库
        SingleKvStore db = abilityContext.getSingleKvStore();
        //查询返回结果
        Map<String, String> result = new HashMap<>();
        Map<String, String> ret = new HashMap<>();

        switch (code) {
            case ACTION_INSERT_TODOLIST: {
                String dataStr = data.readString();
                ToDoList toDoList = new ToDoList();
                try {
                    toDoList = ZSONObject.stringToClass(dataStr, ToDoList.class);
                } catch (RuntimeException e) {
                    HiLog.error(LABEL, "convert failed.");
                }
                if (toDoList.id != null) db.putString(toDoList.id + " id", toDoList.id);
                if (toDoList.title != null) db.putString(toDoList.id + " title", toDoList.title);
                if (toDoList.text != null) db.putString(toDoList.id + " text", toDoList.text);
                if (toDoList.date != null) db.putString(toDoList.id + " date", toDoList.date);
                HiLog.debug(LABEL, "insert or update success");
                reply.writeString("result");
                break;
            }
            case ACTION_SELECT_TODOLIST: {

                // 返回结果当前仅支持String，对于复杂结构可以序列化为ZSON字符串上报
                HiLog.debug(LABEL, "Database Return All Result");
                String condition = data.readString();
                HiLog.debug(LABEL, "condition=" + condition);
                Set<String> indexes = new HashSet<>();
                for (Entry entry : db.getEntries("")) {
                    indexes.add(entry.getKey().split(" ")[0]);
                }

                for (String i : indexes) {
                    String id, title, text, date;
                    try {
                        date = db.getString(i + " date");

//                        if (title.contains(condition))  这里写filter判断条件
                        result.put("date", date);
//                        else
//                            continue;
                    } catch (KvStoreException k) {
                        date = "";
                    }
                    ;
                    try {
                        id = db.getString(i + " id");
                        result.put("id", id);
                    } catch (KvStoreException k) {
                        id = "";
                    }
                    ;
                    try {
                        title = db.getString(i + " title");
                        result.put("title", title);
                    } catch (KvStoreException k) {
                        title = "";
                    }
                    try {
                        text = db.getString(i + " text");
                        result.put("text", text);
                    } catch (KvStoreException k) {
                        text = "";
                    }
                    ;
//                    HiLog.debug(LABEL, String.valueOf(result));
                    String rString = ZSONObject.toZSONString(result);
                    ret.put(i, rString);
                }
                reply.writeString(ZSONObject.toZSONString(ret));
                HiLog.debug(LABEL, "select all success");

                break;
            }
            default: {
                HiLog.debug(LABEL, "unknown code");
                return false;
            }
        }

        // 分布式数据库的同步 先不实现
//        abilityContext.syncContact();
        return true;
    }

    /**
     * Internal ability 注册接口。
     */
    public static void register(MainAbility abilityContext) {
        instance = new MainServiceAbility();
        instance.onRegister(abilityContext);
    }

    private void onRegister(MainAbility abilityContext) {
        this.abilityContext = abilityContext;
        this.setInternalAbilityHandler((code, data, reply, option) -> {
            return this.onRemoteRequest(code, data, reply, option);
        });
    }

    /**
     * Internal ability 注销接口。
     */
    public static void unregister() {
        instance.onUnregister();
    }

    private void onUnregister() {
        abilityContext = null;
        this.setInternalAbilityHandler(null);
    }

}

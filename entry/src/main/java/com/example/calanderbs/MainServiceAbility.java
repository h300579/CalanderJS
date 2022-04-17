package com.example.calanderbs;

import ohos.aafwk.ability.Ability;
import ohos.aafwk.content.Intent;
import ohos.rpc.*;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;

public class MainServiceAbility extends Ability {

    // 常量
    private static final String BUNDLE_NAME = "com.example.backup";
    private static final String ABILITY_NAME = "com.example.backup.MainServiceAbility";
    public static final int SUCCESS = 0;
    public static final int ERROR = 1;
    public static final int ABILITY_TYPE_INTERNAL = 1;
    public static final int ACTION_INSERT_TODOLIST = 10001;
    public static final int ACTION_SYNC = 101;
    // 定义日志标签
    private static final HiLogLabel LABEL_LOG = new HiLogLabel(3, 0xD001100, "Demo");
    // TodoServiceAbility 类的一个实例，所以从语义上他只能被初始化一次
//    private static TodoServiceAbility instance;
    // Context
    private MainAbility abilityContext;



    @Override
    public void onStart(Intent intent) {
        HiLog.error(LABEL_LOG, "MainServiceAbility::onStart");
        super.onStart(intent);
    }

    @Override
    public void onBackground() {
        super.onBackground();
        HiLog.info(LABEL_LOG, "MainServiceAbility::onBackground");
    }

    @Override
    public void onStop() {
        super.onStop();
        HiLog.info(LABEL_LOG, "MainServiceAbility::onStop");
    }

    @Override
    public void onCommand(Intent intent, boolean restart, int startId) {
    }

    @Override
    public IRemoteObject onConnect(Intent intent) {
        return null;
    }

    @Override
    public void onDisconnect(Intent intent) {
    }
}
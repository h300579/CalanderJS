package com.example.calanderbs;

import ohos.ace.ability.AceAbility;
import ohos.aafwk.content.Intent;
import ohos.app.Context;
import ohos.bundle.IBundleManager;
import ohos.data.distributed.common.*;
import ohos.data.distributed.user.SingleKvStore;
import ohos.hiviewdfx.HiLog;

public class MainAbility extends AceAbility {

    // 申请分布式数据库的授权代码
    private static final int PERMISSION_CODE = 20220417;

    // 初始化分布式数据库变量
    private KvManager kvManager;
    private SingleKvStore kvStore;
    // 固定数据库ID
    static public String STORE_ID = "KvD";

    @Override
    public void onStart(Intent intent) {

        requestPermission();    //申请权限函数

        // 注册Service？
        MainServiceAbility.register(this);

        // 注册 分布式数据库，创建分布式数据库管理器
        KvManagerConfig kvManagerConfig = new KvManagerConfig(this);
        kvManager = KvManagerFactory.getInstance().createKvManager(kvManagerConfig);
        // 创建数据库
        Options options = new Options();
        options.setCreateIfMissing(true).setEncrypt(false).setKvStoreType(KvStoreType.SINGLE_VERSION);
        kvStore = kvManager.getKvStore(options, STORE_ID);
        //构造并注册KvStoreObserver实例
        KvStoreObserver kvStoreObserverClient = new KvStoreObserverClient();
        kvStore.subscribe(SubscribeType.SUBSCRIBE_TYPE_REMOTE, kvStoreObserverClient);

        super.onStart(intent);
    }

    @Override
    public void onStop() {
        super.onStop();
    }


    /**
     * 申请权限分布式数据库
     */
    private void requestPermission() {
        String permission = ohos.security.SystemPermission.DISTRIBUTED_DATASYNC;
        if (verifySelfPermission(permission) != IBundleManager.PERMISSION_GRANTED) {
            // has no permission
            if (canRequestPermission(permission)) {
                // toast
                requestPermissionsFromUser(new String[]{permission}, PERMISSION_CODE);
            }
        }
    }

    /**
     * 实现 KvStoreObserver 接口
     */
    private class KvStoreObserverClient implements KvStoreObserver {
        @Override
        public void onChange(ChangeNotification notification) {
//            getUITaskDispatcher().asyncDispatch(() -> {
//                HiLog.info(LABEL_LOG, LOG_FORMAT, TAG, "come to auto sync");
//                queryContact();
//                ToastUtils.showTips(getContext(), "同步成功", NORMAL_TIP_FLAG);
//            });
        }
    }

    public SingleKvStore getSingleKvStore(){
        return kvStore;
    }
}

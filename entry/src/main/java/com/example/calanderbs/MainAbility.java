package com.example.calanderbs;

import ohos.ace.ability.AceAbility;
import ohos.aafwk.content.Intent;
import ohos.bundle.IBundleManager;

public class MainAbility extends AceAbility {

    // 申请分布式数据库的授权代码
    private static final int PERMISSION_CODE = 20220417;

    @Override
    public void onStart(Intent intent) {
        super.onStart(intent);
        requestPermission();    //申请权限函数
    }

    @Override
    public void onStop() {
        super.onStop();
    }


    /*
    申请权限
     */
    private void requestPermission(){
        String permission = ohos.security.SystemPermission.DISTRIBUTED_DATASYNC;
        if (verifySelfPermission(permission) != IBundleManager.PERMISSION_GRANTED) {
            // has no permission
            if (canRequestPermission(permission)) {
                // toast
                requestPermissionsFromUser(new String[]{permission}, PERMISSION_CODE);
            }
        }
    }
}

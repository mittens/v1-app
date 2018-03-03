package com.designplox.github;

import android.os.Bundle;

import com.crashlytics.android.Crashlytics;
import com.facebook.react.ReactActivity;

import io.fabric.sdk.android.Fabric;

public class MainActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "Mittens";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Fabric.with(this, new Crashlytics());
    }
}

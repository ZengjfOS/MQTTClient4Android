package com.android.aplex.mqtt;

import android.net.Uri;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

import com.android.aplex.mqtt.fragment.Show;
import com.android.aplex.mqtt.fragment.BaseBlankFragment;
import com.android.aplex.mqtt.fragment.Publish;
import com.android.aplex.mqtt.fragment.Settings;
import com.android.aplex.mqtt.fragment.Subscribe;
import com.android.aplex.mqtt.tools.SPUtils;
import com.lzy.widget.AlphaIndicator;

import org.eclipse.paho.android.service.MqttAndroidClient;
import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements BaseBlankFragment.OnFragmentInteractionListener{

    public boolean connect_success = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        SPUtils.setApplication(this);

        getSupportActionBar().setCustomView(R.layout.mainactivity_actionbar);
        getSupportActionBar().setDisplayShowCustomEnabled(true);

        ViewPager viewPager = (ViewPager) findViewById(R.id.viewPager);
        viewPager.setAdapter(new MainAdapter(getSupportFragmentManager()));
        AlphaIndicator alphaIndicator = (AlphaIndicator) findViewById(R.id.alphaIndicator);
        alphaIndicator.setViewPager(viewPager);

        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                // refer: http://www.eclipse.org/paho/files/android-javadoc/org/eclipse/paho/android/service/MqttAndroidClient.html
                MemoryPersistence memPer = new MemoryPersistence();
                MqttClient client = null;
                try {
                    client = new MqttClient("tcp://zengjf.mqtt.iot.gz.baidubce.com:1883", "DeviceId-bx9n", memPer);
                } catch (MqttException e) {
                    e.printStackTrace();
                }
                MqttConnectOptions options = new MqttConnectOptions();
                options.setUserName("zengjf/sz_monitor_room");
                options.setPassword("QE0BHFvFnIkBRIaJtPYzo3m/63Esv5fzzMr9tYVOsHo=".toCharArray());

                try {

                    try {
                        client.connect(options);
                    } catch (MqttException e1) {
                        e1.printStackTrace();
                    }

                    MqttMessage message = new MqttMessage();
                    message.setQos(0);
                    message.setPayload("{\"zengjf\": \"Android\"}".getBytes());
                    try {
                        client.publish("test-iot-service", message);
                        client.disconnect();
                    } catch (MqttException e) {
                        e.printStackTrace();
                    }

                } catch (Exception e) {
                    e.printStackTrace();
                }

            }
        });
        thread.start();

    }

    @Override
    public void onFragmentInteraction(Uri uri) {
        Log.e("MainActivity", uri.toString());
    }

    private class MainAdapter extends FragmentPagerAdapter {

        private List<Fragment> fragments = new ArrayList<>();

        public MainAdapter(FragmentManager fm) {
            super(fm);
            try {
                fragments.add(BaseBlankFragment.newInstance(Settings.class, null));
                fragments.add(BaseBlankFragment.newInstance(Publish.class, null));
                fragments.add(BaseBlankFragment.newInstance(Subscribe.class, null));
                fragments.add(BaseBlankFragment.newInstance(Show.class, null));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        @Override
        public Fragment getItem(int position) {
            return fragments.get(position);
        }

        @Override
        public int getCount() {
            return fragments.size();
        }
    }

}

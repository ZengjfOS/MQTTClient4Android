package com.android.aplex.mqtt;

import android.net.Uri;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

import com.android.aplex.mqtt.fragment.About;
import com.android.aplex.mqtt.fragment.BaseBlankFragment;
import com.android.aplex.mqtt.fragment.Publish;
import com.android.aplex.mqtt.fragment.Settings;
import com.android.aplex.mqtt.fragment.Subscribe;
import com.android.aplex.mqtt.tools.SPUtils;
import com.lzy.widget.AlphaIndicator;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements BaseBlankFragment.OnFragmentInteractionListener{

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
                fragments.add(BaseBlankFragment.newInstance(Publish.class, null));
                fragments.add(BaseBlankFragment.newInstance(Subscribe.class, null));
                fragments.add(BaseBlankFragment.newInstance(Settings.class, null));
                fragments.add(BaseBlankFragment.newInstance(About.class, null));
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

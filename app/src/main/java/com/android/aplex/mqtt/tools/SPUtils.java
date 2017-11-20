package com.android.aplex.mqtt.tools;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.util.Log;

public class SPUtils{

	/**
	 * The name for default sharedPreferences file name.
	 */
	private static String spFileName = "config";

	/**
	 * The mode for default sharePreferences file.
	 */
	private final static int SP_MODE = Context.MODE_PRIVATE;
	/**
	 * The application for convenient get sharePreferences at anywhere.
	 */
	private static Application application = null;
	/**
	 * The tag for debug.
	 */
	private final static String TAG = "SPUtils";

	public static void setSPFileName(String name) {
		spFileName = name;
	}
	
	public static void setApplication(Application application) {
		if (application == null) {
			Log.d(TAG, "Setting Application was null, please check this.");
			return ;
		}
		SPUtils.application = application;
	}

	public static void setApplication(Activity activity) {
		if (activity == null) {
			Log.d(TAG, "Setting activity was null, please check this.");
			return ;
		}
		SPUtils.application = activity.getApplication();
	}

	public static SharedPreferences getSP(Application application, String name) {
		if (application == null) {
			throw new RuntimeException("Application was null, please check this.");
		}
		return application.getSharedPreferences(name, SP_MODE);
	}

	private static boolean checkObject(Object object) {
		return (object != null);
	}

	private static boolean checkString(String key) {
		return (checkObject(key) && key.trim().length() != 0);
	}

	private static boolean checkApplicationAndString(Application application, String name){
		return (checkObject(application) && checkString(name));
	}

	private static boolean checkApplicationAndStrings(Application application, String name, String key) {
		return (checkApplicationAndOject(application, name) && checkString(key));
	}

	private static boolean checkApplicationAndStrings(Application application, String name, String key, String value){
		return (checkApplicationAndStrings(application, name, key) && checkString(value));
	}
	
	private static boolean checkApplicationAndOject(Application application, Object object){
		return (checkObject(application) && checkObject(object));
	}

	public static String getString(Application application, String name, String key) {
		if (checkApplicationAndStrings(application, name, key)) {
			return getSP(application, name).getString(key, "").trim();
		}
		return "";
	}

	public static String getString(Application application, String key) {
		return getString(application, spFileName, key);
	}

	public static String getString(Activity activity, String key) {
		return getString(activity.getApplication(), spFileName, key);
	}


	public static String getString(String name, String key) {
		return getString(application, name, key);
	}

	public static String getString(String key) {
		return getString(application, spFileName, key);
	}

	public static void pushString(Application application, String name, String key, String value) {
		if (checkApplicationAndStrings(application, name, key, value)) {
			getSP(application, name).edit().putString(key, value.trim()).commit();
		}
	}

	public static void pushString(Application application, String key, String value) {
		pushString(application, spFileName, key, value);
	}

	public static void pushString(Activity activity, String key, String value) {
		pushString(activity.getApplication(), spFileName, key, value);
	}

	public static void pushString(String name, String key, String value) {
		pushString(application, name, key, value);
	}

	public static void pushString(String key, String value) {
		pushString(application, spFileName, key, value);
	}

	public static int getInt(Application application, String name, String key) {
		if (checkApplicationAndStrings(application, name, key)) {
			return getSP(application, name).getInt(key, 0);
		}
		return 0;
	}

	public static int getInt(Application application, String key) {
		return getInt(application, spFileName, key);
	}

	public static int getInt(Activity activity, String key) {
		return getInt(activity.getApplication(), spFileName, key);
	}

	public static int getInt(String name, String key) {
		return getInt(application, name, key);
	}

	public static int getInt(String key) {
		return getInt(application, spFileName, key);
	}

	public static void pushInt(Application application, String name, String key, int value) {
		if (checkApplicationAndStrings(application, name, key)) {
			getSP(application, name).edit().putInt(key, value).commit();
		}
	}

	public static void pushInt(Application application, String key, int value) {
		pushInt(application, spFileName, key, value);
	}

	public static void pushInt(Activity activity, String key, int value) {
		pushInt(activity.getApplication(), spFileName, key, value);
	}

	public static void pushInt(String name, String key, int value) {
		pushInt(application, name, key, value);
	}

	public static void pushInt(String key, int value) {
		pushInt(application, spFileName, key, value);
	}

	public static float getFloat(Application application, String name, String key) {
		if (checkApplicationAndStrings(application, name, key)) {
			return getSP(application, name).getFloat(key, 0);
		}
		return 0;
	}

	public static float getFloat(Application application, String key) {
		return getFloat(application, spFileName, key);
	}
	
	public static float getFloat(Activity activity, String key) {
		return getFloat(activity.getApplication(), spFileName, key);
	}
	
	public static float getFloat(String name, String key) {
		return getFloat(application, name, key);
	}
	
	public static float getFloat(String key) {
		return getFloat(application, spFileName, key);
	}
	
	public static void pushFloat(Application application, String name, String key, float value) {
		if (checkApplicationAndStrings(application, name, key)) {
			getSP(application, name).edit().putFloat(key, value).commit();
		}
	}

	public static void pushFloat(Application application, String key, float value) {
		pushFloat(application, spFileName, key, value);
	}

	public static void pushFloat(Activity activity, String key, float value) {
		pushFloat(activity.getApplication(), spFileName, key, value);
	}

	public static void pushFloat(String name, String key, float value) {
		pushFloat(application, name, key, value);
	}

	public static void pushFloat(String key, float value) {
		pushFloat(application, spFileName, key, value);
	}

	public static long getLong(Application application, String name, String key) {
		if (checkApplicationAndStrings(application, name, key)) {
			return getSP(application, name).getLong(key, 0);
		}
		return 0;
	}

	public static long getLong(Application application, String key) {
		return getLong(application, spFileName, key);
	}

	public static long getLong(Activity activity, String key) {
		return getLong(activity.getApplication(), spFileName, key);
	}

	public static long getLong(String name, String key) {
		return getLong(application, name, key);
	}

	public static long getLong(String key) {
		return getLong(application, spFileName, key);
	}

	public static void pushLong(Application application, String name, String key, long value) {
		if (checkApplicationAndStrings(application, name, key)) {
			getSP(application, name).edit().putLong(key, value).commit();
		}
	}

	public static void pushLong(Application application, String key, long value) {
		pushLong(application, spFileName, key, value);
	}

	public static void pushLong(Activity activity, String key, long value) {
		pushLong(activity.getApplication(), spFileName, key, value);
	}

	public static void pushLong(String name, String key, long value) {
		pushLong(application, name, key, value);
	}

	public static void pushLong(String key, long value) {
		pushLong(application, spFileName, key, value);
	}

	public static boolean getBoolean(Application application, String name, String key) {
		if (checkApplicationAndStrings(application, name, key)) {
			return getSP(application, name).getBoolean(key, false);
		}
		return false;
	}

	public static boolean getBoolean(Application application, String key) {
		return getBoolean(application, spFileName, key);
	}

	public static boolean getBoolean(Activity activity, String key) {
		return getBoolean(activity.getApplication(), spFileName, key);
	}

	public static boolean getBoolean(String name, String key) {
		return getBoolean(application, name, key);
	}

	public static boolean getBoolean(String key) {
		return getBoolean(application, spFileName, key);
	}
	
	public static void pushBoolean(Application application, String name, String key, boolean value) {
		if (checkApplicationAndStrings(application, name, key)) {
			getSP(application, name).edit().putBoolean(key, value).commit();
		}
	}

	public static void pushBoolean(Application application, String key, boolean value) {
		pushBoolean(application, spFileName, key, value);
	}
	
	public static void pushBoolean(Activity activity, String key, boolean value) {
		pushBoolean(activity.getApplication(), spFileName, key, value);
	}
	
	public static void pushBoolean(String name, String key, boolean value) {
		pushBoolean(application, name, key, value);
	}
	
	public static void pushBoolean(String key, boolean value) {
		pushBoolean(application, spFileName, key, value);
	}
	
	private static void pushToSP(Editor editor, String key, Object value) {
		if (value instanceof String) {
			editor.putString(key, ((String)value).trim());
		} else if (value instanceof Integer) {
			editor.putInt(key, (Integer)value);
		} else if (value instanceof Float) {
			editor.putFloat(key, (Float)value);
		} else if (value instanceof Long) {
			editor.putLong(key, (Long)value);
		} else if (value instanceof Boolean) {
			editor.putBoolean(key, (Boolean)value);
		}
	}

	public static void pushValue(Application application, String name, String key, Object value) {
		if (checkApplicationAndStrings(application, name, key)) {

			Editor editor = getSP(application, name).edit();

			pushToSP(editor, key, value);

			editor.commit();
		}
	}
	
	public static void pushValue(Application application, String key, Object value) {
		pushValue(application, spFileName, key, value);
	}
	
	public static void pushValue(Activity activity, String key, Object value) {
		pushValue(activity.getApplication(), spFileName, key, value);
	}
	
	public static void pushValue(String name, String key, Object value) {
		pushValue(application, name, key, value);
	}
	
	public static void pushValue(String key, Object value) {
		pushValue(application, spFileName, key, value);
	}

	public static void pushValues(Application application, String name, HashMap<String, Object> keyValues) {
		if (checkApplicationAndOject(application, keyValues)) {

			Editor editor = getSP(application, name).edit();

			Iterator<Entry<String, Object>> iterator = keyValues.entrySet().iterator();
			while (iterator.hasNext()) {
				Map.Entry<String, Object> entry = (Map.Entry<String, Object>) iterator.next();
				String key = (String)entry.getKey();
				Object value = entry.getValue();

				pushToSP(editor, key, value);
			}
			
			editor.commit();
		}
	}
	
	public static void pushValues(Application application, HashMap<String, Object> keyValues) {
		pushValues(application, spFileName, keyValues);
	}
	
	public static void pushValues(Activity activity, HashMap<String, Object> keyValues) {
		pushValues(activity.getApplication(), spFileName, keyValues);
	}
	
	public static void pushValues(String name, HashMap<String, Object> keyValues) {
		pushValues(application, name, keyValues);
	}

	public static void pushValues(HashMap<String, Object> keyValues) {
		pushValues(application, spFileName, keyValues);
	}

	private static Object getFromSP(SharedPreferences sp, String key, Object type) {
		Object value = null;

		if (type instanceof String) {
			value = sp.getString(key, "").trim();
		} else if (type instanceof Integer) {
			value = sp.getInt(key, 0);
		} else if (type instanceof Float) {
			value = sp.getFloat(key, 0);
		} else if (type instanceof Long) {
			value = sp.getLong(key, 0);
		} else if (type instanceof Boolean) {
			value = sp.getBoolean(key, false);
		}

		return value;
	}

	public static Object getValue(Application application, String name, String key, Object type) {
		if (checkApplicationAndStrings(application, name, key)) {
			SharedPreferences sp = getSP(application, name);
			
			return getFromSP(sp, key, type);
		}
		return null;
	}

	public static Object getValue(Application application, String key, Object type) {
		return getValue(application, spFileName, key, type);
	}

	public static Object getValue(Activity activity, String key, Object type) {
		return getValue(activity.getApplication(), spFileName, key, type);
	}

	public static Object getValue(String name, String key, Object type) {
		return getValue(application, name, key, type);
	}

	public static Object getValue(String key, Object type) {
		return getValue(application, spFileName, key, type);
	}

	public static HashMap<String, Object> getValues(Application application, String name, HashMap<String, Object> keyTypes) {
		HashMap<String, Object> keyValues = new HashMap<String, Object>();
		if (checkApplicationAndString(application, name)) {
			SharedPreferences sp = getSP(application, name);
			
			Iterator<Entry<String, Object>> iter = keyTypes.entrySet().iterator();
			while (iter.hasNext()) {
				Map.Entry<String, Object> entry = (Map.Entry<String, Object>) iter.next();
				String key = (String)entry.getKey();
				Object type = entry.getValue();

				keyValues.put(key, getFromSP(sp, key, type));
			}
			
			return keyValues;
		}
		return keyValues;
	}

	public static HashMap<String, Object> getValues(Application application, HashMap<String, Object> keyTypes) {
		return getValues(application, spFileName, keyTypes);
	}

	public static HashMap<String, Object> getValues(Activity activity, HashMap<String, Object> keyTypes) {
		return getValues(activity.getApplication(), spFileName, keyTypes);
	}

	public static HashMap<String, Object> getValues(String name, HashMap<String, Object> keyTypes) {
		return getValues(application, name, keyTypes);
	}

	public static HashMap<String, Object> getValues(HashMap<String, Object> keyTypes) {
		return getValues(application, spFileName, keyTypes);
	}
	
	public static void testSPUtils(Application application) {

		setApplication(application);

		pushString("name", "China");
		Log.e("SPUtils", "name = " + (String)getValue("name", new String()));
		pushInt("int", 3);
		Log.e("SPUtils", "int = " + getValue("int", Integer.valueOf(0)));
		pushFloat("float", 3.14f);
		Log.e("SPUtils", "float = " + getValue("float", Float.valueOf(0)));
		
		HashMap<String, Object> keyValues = new HashMap<String, Object>();
		keyValues.put("name", "SZ");
		keyValues.put("address", "shenzhen");
		keyValues.put("float", 3.14f);
		keyValues.put("int", 3);
		keyValues.put("boolean", true);
		
		pushValues(keyValues);

		HashMap<String, Object> keyTypes = new HashMap<String, Object>();
		keyTypes.put("name", new String());
		keyTypes.put("address", new String());
		keyTypes.put("float", Float.valueOf(0));
		keyTypes.put("int", Integer.valueOf(0));
		keyTypes.put("boolean", Boolean.valueOf(false));
		
		Log.e(TAG, getValues(keyTypes).toString());

		Log.e("SPUtils", "age = " + getValue("age", Integer.valueOf(0)));
		Log.e("SPUtils", "int = " + getValue("int", Integer.valueOf(0)));
		Log.e("SPUtils", "float = " + getValue("float", Float.valueOf(0)));
		Log.e("SPUtils", "name = " + (String)getValue("name", new String()));
		
        /** 
         * output:
         *     E/SPUtils(8456): name = China
         *     E/SPUtils(8456): int = 3
         *     E/SPUtils(8456): float = 3.14
         *     E/SPUtils(8456): {boolean=true, address=shenzhen, float=3.14, int=3, name=SZ}
         *     E/SPUtils(8456): age = 0
         *     E/SPUtils(8456): int = 3
         *     E/SPUtils(8456): float = 3.14
         *     E/SPUtils(8633): name = SZ
         */

	}
}

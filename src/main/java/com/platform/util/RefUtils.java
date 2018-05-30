package com.platform.util;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
/**
 * 反射工具类
 */
public class RefUtils {
	
	/**
	 * 获取当前类和父类的所有公共属性
	 * @param clazz
	 * @return
	 */
	public static List<Field> getFields(Class<?> clazz){
		return getFields(clazz, true);
	}
	
	private static List<Field> getFields(Class<?> clazz, boolean deep){
		List<Field> ret = new ArrayList<Field>();
		getFields(clazz, deep, ret);
		return ret;
	}

	private static void getFields(Class<?> clazz, boolean deep, List<Field> list){
		do {
			list.addAll(Arrays.asList(clazz.getFields()));
			clazz = clazz.getSuperclass();
		} while (deep && clazz != Object.class);
	}
	
	/**
	 * 获取当前类和父类的所有属性
	 * @param clazz
	 * @return
	 */
	public static List<Field> getDeclaredFields(Class<?> clazz){
		return getDeclaredFields(clazz, true);
	}

	public static Field getDeclaredField(Class<?> clazz, String fieldName){
		List<Field> list = getDeclaredFields(clazz);
		if(EmptyUtils.isNotEmpty(list)){
			for (Field field : list) {
				if(field.getName().equals(fieldName)){
					return field;
				}
			}
		}
		return null;
	}
	
	private static List<Field> getDeclaredFields(Class<?> clazz, boolean deep){
		List<Field> ret = new ArrayList<Field>();
		getDeclaredFields(clazz, deep, ret);
		return ret;
	}
	
	private static void getDeclaredFields(Class<?> clazz, boolean deep, List<Field> list){
		do {
			list.addAll(Arrays.asList(clazz.getDeclaredFields()));
			clazz = clazz.getSuperclass();
		} while (deep && clazz != Object.class);
	}
	
	/**
	 * 获取当前类和父类的所有公共方法
	 * @param clazz
	 * @return
	 */
	public static List<Field> getMethods(Class<?> clazz){
		return getMethods(clazz, true);
	}
	
	private static List<Field> getMethods(Class<?> clazz, boolean deep){
		List<Field> ret = new ArrayList<Field>();
		getMethods(clazz, deep, ret);
		return ret;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	private static void getMethods(Class<?> clazz, boolean deep, List list){
		do {
			list.addAll(Arrays.asList(clazz.getMethods()));
			clazz = clazz.getSuperclass();
		} while (deep && clazz != Object.class);
	}
	
	/**
	 * 获取当前类和父类的所有方法
	 * @param clazz
	 * @return
	 */
	public static List<Field> getDeclaredMethods(Class<?> clazz){
		return getDeclaredMethods(clazz, true);
	}
	
	private static List<Field> getDeclaredMethods(Class<?> clazz, boolean deep){
		List<Field> ret = new ArrayList<Field>();
		getDeclaredMethods(clazz, deep, ret);
		return ret;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private static void getDeclaredMethods(Class<?> clazz, boolean deep, List list){
		do {
			list.addAll(Arrays.asList(clazz.getDeclaredMethods()));
			clazz = clazz.getSuperclass();
		} while (deep && clazz != Object.class);
	}
	
	/**
	 * 获取一个类的所有泛型
	 * @param clazz
	 * @return
	 */
	public static Type[] getGenerics(Class<?> clazz){
		Type[] actualType = null;
		Type genType = clazz.getGenericSuperclass();
		if (genType instanceof ParameterizedType) {
			ParameterizedType paramType = (ParameterizedType) genType;
			actualType = paramType.getActualTypeArguments();
		}
		return actualType;
	}
	
	/**
	 * 获取一个类指定位置的泛型
	 * @param clazz
	 * @param index
	 * @return
	 */
	public static Class<?> getGeneric(Class<?> clazz, int index){
		return (Class<?>) getGenerics(clazz)[index];
	}
	
	/**
	 * 获取一个类第一个位置的泛型
	 * @param clazz
	 * @return
	 */
	public static Class<?> getGeneric(Class<?> clazz){
		return getGeneric(clazz, 0);
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static Map obj2Map(Object obj){
		Map map = new HashMap();
		List<Field> fields = getDeclaredFields(obj.getClass());
		try {
			for (Field field : fields) {
				field.setAccessible(true);
				map.put(field.getName(), field.get(obj));
				field.setAccessible(false);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}
	
	public static <T> T map2obj(Map<String, Object> map, Map<String, String> keyFieldMap, Class<T> clazz){
		T obj = null;
		try {
			obj = clazz.newInstance();
			Iterator<String> iter = map.keySet().iterator();
			while( iter.hasNext() ){
				String key = iter.next();
				if( keyFieldMap.containsKey(key) ){
					Field field = clazz.getDeclaredField(keyFieldMap.get(key));
					if( EmptyUtils.isNotNull(field) ){
						field.setAccessible(true);
						field.set(obj, map.get(key));
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}
	
}

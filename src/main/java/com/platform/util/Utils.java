package com.platform.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Array;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.codec.binary.Hex;
import org.apache.commons.codec.binary.StringUtils;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.io.IOUtils;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;

/**
 * 常用工具方法
 * 
 */
public abstract class Utils {
	
	/**
	 * 判断为数组类型
	 * @param obj
	 * @return
	 */
	public static boolean isArray(Object obj) {
		return EmptyUtils.isNotNull(obj) && obj.getClass().isArray();
	}

	/**
	 * 判断为基本类型
	 * @param obj
	 * @return
	 */
	public static boolean isPrimitive(Object obj) {
		return EmptyUtils.isNotNull(obj) && obj.getClass().isPrimitive();
	}
	
	/**
	 * 判断为私有类型数组
	 * @param obj
	 * @return
	 */
	public static boolean isPrimitiveArray(Object obj) {
		return EmptyUtils.isNotNull(obj)
				&& obj.getClass().getCanonicalName()
						.equals(obj.getClass().getSimpleName());
	}
	
	/**
	 * 判断为集合类型
	 * @param obj
	 * @return
	 */
	public static boolean isCollection(Object obj) {
		return EmptyUtils.isNotNull(obj) && (obj instanceof Collection);
	}

	public static boolean isMap(Object obj) {
		return EmptyUtils.isNotNull(obj) && (obj instanceof Map);
	}
	
	/**
	 * 算法摘要
	 * @param algorithm
	 * @param data
	 * @return
	 */
	public static String digest(String algorithm, byte[] data) {
		return Hex.encodeHexString( DigestUtils.getDigest(algorithm).digest(data));
	}

	public static String digest(String algorithm, String data) {
		return digest(algorithm, StringUtils.getBytesUtf8(data));
	}
	
	public static String getUuid(){
		return UUID.randomUUID().toString().replaceAll("-", "");
	}
	
	public static <T extends Number> List<T> numberStringArrayToList(Class<T> numType, String...nums){
		return Arrays.asList(numberStringArrayToArray(numType, nums));
	}
	
	@SuppressWarnings("unchecked")
	public static <T extends Number> T[] numberStringArrayToArray(Class<T> numType, String...nums){
		if( EmptyUtils.isNotEmpty(nums) ){
			T[] ts = (T[]) Array.newInstance(numType, nums.length);
			try {
				Method method = numType.getDeclaredMethod("valueOf", String.class);
				for (int i = 0; i < nums.length; i++) {
					ts[i] = (T) method.invoke(null, nums[i]);
				}
				return ts;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	
	/**
	 * 构建路径
	 * @param fileNames
	 * @return
	 */
	public static String buildPath(String...fileNames){
		return join(File.separator, fileNames);
	}

	public static String join(String separator, String...strs){
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < strs.length; i++) {
			sb.append(strs[i]);
			if( i != strs.length-1 ){
				sb.append(separator);
			}
		}
		return sb.toString();
	}

	/**
	 * 执行cmd命令
	 * @param cmd
	 */
	public static void execCmd(String cmd){
		Process p = null;
		try {
			Runtime rt = Runtime.getRuntime();
			p = rt.exec(cmd);
			// 获取进程的标准输入流
			final InputStream is1 = p.getInputStream();
			// 获取进城的错误流
			final InputStream is2 = p.getErrorStream();
			// 启动两个线程，一个线程负责读标准输出流，另一个负责读标准错误流
			new Thread() {
				public void run() {
					BufferedReader br1 = new BufferedReader(
							new InputStreamReader(is1));
					try {
						String line1 = null;
						while ((line1 = br1.readLine()) != null) {
							if (line1 != null) {
							}
						}
					} catch (IOException e) {
						e.printStackTrace();
					} finally {
						try {
							is1.close();
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				}
			}.start();
				
			new Thread() {
				public void run() {
					BufferedReader br2 = new BufferedReader(
							new InputStreamReader(is2));
					try {
						String line2 = null;
						while ((line2 = br2.readLine()) != null) {
							if (line2 != null) {
							}
						}
					} catch (IOException e) {
						e.printStackTrace();
					} finally {
						try {
							is2.close();
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				}
			}.start();
			
			p.waitFor();
			p.destroy();
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			IOUtils.closeQuietly(p.getErrorStream());
			IOUtils.closeQuietly(p.getInputStream());
			IOUtils.closeQuietly(p.getOutputStream());
		}
	}
	
	public static void main(String[] args) {
		double dateD1 = 42113.38653400463;
		double dateD2 = 42116.444696805556;
		Date date1 = HSSFDateUtil.getJavaDate(dateD1);
		Date date2 = HSSFDateUtil.getJavaDate(dateD2);
		System.out.println(date1.toLocaleString());
		System.out.println(date2.toLocaleString());
	}
	
}

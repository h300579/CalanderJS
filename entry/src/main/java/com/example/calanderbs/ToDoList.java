package com.example.calanderbs;

// 单独事件对象属性
public class ToDoList {
    public String id;       // id唯一标识           不能为空
    public String title;    // 根据用户输入作为大标题  不能为空
    public String text;     // 详细内容             可以为空
    public String date;     // xxxx-xx-xx 格式的日期 方便拆分    不为空，默认为创建日期

}

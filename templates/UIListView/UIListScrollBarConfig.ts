/**
 * Created by Lixin on 15/11/8.
 *
 * 下拉栏配置文件
 */
class UIListScrollBarConfig {

    public static style:any = {
        //类型：1 = 矢量样式  2 = 位图绘制
        type: 1,
        /**
         * 矢量图绘制所需配置文件
         * **/
        //背景色
        background: 0xc4c4c4,
        //描边色
        strokeColor: 0xb7b6b6,
        //描边尺寸
        strokeSize: 2,
        //圆角
        radius: 10,
        //宽度
        width: 10,
        /**
         * 位图绘制所需配置文件
         * **/
        //顶部高度不缩放区域
        topScrollBitmap: null,
        //底部高度不缩放区域
        bottomScrollBitmap: null,
        //滚动缩放区域
        scrollBitmap: null
    };

    /**
     * 滚动条最低高度
     * **/
    public static minHeight:number = 30;
    /**
     * 滚动条高度，=0时标示自动适配
     * **/
    public static scrollHeight:number = 0;
}
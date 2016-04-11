/**
 * Created by Lixin on 15/11/8.
 */
class ImageReaderConfig {

    /**
     * 图片样式
     * **/
    public static imageStyle:any = {

        /**
         * 尺寸
         *
         * 受缩放模式影响
         * **/
        //宽度 0=舞台宽度
        width: 0,
        //高度 0=舞台高度
        height: 0,
        /**
         * 缩放模式：
         *  = 0 : 不缩放
         *  = 1 : 按宽度缩放
         *  = 2 : 按高度缩放
         *  = 3 : 拉伸
         * **/
        scaleMode: 1
    };
    /**
     * 背景图层样式
     * **/
    public static backgroundStyle:any = {
        type: 1,
        color: 0xffffff,
        alpha: 0.5
    }
}
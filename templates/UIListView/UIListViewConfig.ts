/**
 * Created by Lixin on 15/11/6.
 *
 * UIListView 容器配置文件
 */
class UIListViewConfig {

    /**
     * 容器宽度
     * **/
    public static ListWidth:number = 480;
    /**
     * 容器高度
     * **/
    public static ListHeight:number = 600;
    /**
     * 容器背景样式
     * **/
    public static ListBgStyle:any = {

        //类型为number时为颜色填充，为string时使用位图填充
        background: 0xffffff,
        alpha: 1,
        radius: 0,
        strokeColor: 0xffffff,
        strokeSize: 0
    };
    /**
     *列表栏样式
     * **/
    public static ColumnStyle:any = {
        //类型为number时为颜色填充，为string时使用位图填充
        background: 0xffffff,
        alpha: 1,
        radius: 0,
        strokeColor: 0xdadada,
        strokeSize: 1,
        height: 100
    };
    /**
     * 列表内文字样式(创建文本类列表栏时被使用)
     * **/
    public static ColumnTextStyle:any = {
        color: 0x000000,
        size: 24,
        aligin: "center"
    }
}
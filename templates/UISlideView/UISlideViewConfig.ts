/**
 * Created by Lixin on 15/11/24.
 *
 * 横向滑动栏配置文件
 */
class UISlideViewConfig {

    /**
     * 滑动栏宽度
     * **/
    public static SlideViewWidch:number = 480;
    /**
     * 高度
     * **/
    public static SlideViewHeight:number = 400;
    /**
     * 容器背景样式
     * **/
    public static SlideViewBgStyle:any = {
        //类型为number时为颜色填充，为string时使用位图填充
        background: 0xffffff,
        alpha: 1,
        strokeColor: 0xffffff,
        strokeSize: 0
    };
    /***
     * 数量显示点 样式
     * type 标示  颜色 / 位图
     * */
    public static SlidePointStyle:any = {
        //半径
        redius: 5,
        select: {
            type: 0xffffff,
            strokeColor: 0xffffff,
            strokeSize: 0
        },
        unSelect: {
            type: 0x737373,
            strokeColor: 0x223344,
            strokeSize: 2
        }
    }

}

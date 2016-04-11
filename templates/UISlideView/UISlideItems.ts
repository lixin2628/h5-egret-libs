/**
 * Created by Lixin on 15/11/24.
 *
 * 滑动列表 容器
 */
class UISlideItems extends egret.Sprite {

    private config:any;

    //项目对应id
    public itemsId:number;
    //名称
    public itemsName:string;

    public constructor(config?:any) {
        super();
        this.config = config ? config : UISlideViewConfig;

        if (this.config.SlideViewWidch == 0)this.config.SlideViewWidch = egret.MainContext.instance.stage.stageWidth;
        if (this.config.SlideViewHeight == 0)this.config.SlideViewHeight = egret.MainContext.instance.stage.stageHeight;
        //
        this.width = this.config.SlideViewWidch;
        this.height = this.config.SlideViewHeight;
    }
}

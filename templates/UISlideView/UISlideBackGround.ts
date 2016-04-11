/**
 * Created by Lixin on 15/11/24.
 *
 * 横向滑动栏 背景
 *
 */
class UISlideBackGround extends egret.Sprite {


    public config:any;

    public constructor(config:any) {
        super();
        this.config = config;
        this.width = this.config.SlideViewWidch;
        this.height = this.config.SlideViewHeight;
        if (typeof this.config.SlideViewBgStyle.background == "string") {
            var bit:egret.Bitmap = new egret.Bitmap(RES.getRes(this.config.SlideViewBgStyle.background));
            this.addChild(bit);
        } else {
            var shp:egret.Shape = new egret.Shape();
            shp.graphics.beginFill(this.config.SlideViewBgStyle.background, this.config.SlideViewBgStyle.alpha);
            if (this.config.SlideViewBgStyle.strokeSize > 0) {
                shp.graphics.lineStyle(this.config.SlideViewBgStyle.strokeSize, this.config.SlideViewBgStyle.color, 1);
            }
            shp.graphics.drawRect(0, 0, this.width, this.height);
            shp.graphics.endFill();
            this.addChild(shp);
            console.log('add child');
        }
    }
}
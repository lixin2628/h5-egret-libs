/**
 * Created by Lixin on 15/11/6.
 *
 * 列表背景元素
 *
 */
class UIListBackground extends egret.Sprite {

    private config:any = {};

    public constructor(config:any) {

        super();
        this.config = config;
        if (this.config.ListWidth == 0)this.config.ListWidth = egret.MainContext.instance.stage.stageWidth;
        if (this.config.ListHeight == 0)this.config.ListHeight = egret.MainContext.instance.stage.stageHeight;
        var _tmp;
        if (typeof this.config.ListBgStyle.background == "number") {
            _tmp = new egret.Shape();
            _tmp.graphics.beginFill(this.config.ListBgStyle.background, this.config.ListBgStyle.alpha);
            if (this.config.ListBgStyle.strokeSize > 0) {
                _tmp.graphics.lineStyle(this.config.ListBgStyle.strokeSize, this.config.ListBgStyle.strokeColor, 1);
            }
            _tmp.graphics.drawRoundRect(0, 0, this.config.ListWidth, this.config.ListHeight, this.config.ListBgStyle.radius, this.config.ListBgStyle.radius);
            _tmp.graphics.endFill();
        }
        else if (typeof this.config.ListBgStyle.background == "string") {
            _tmp = new egret.Bitmap(RES.getRes(this.config.ListBgStyle.background));

        } else {
            throw "列表容器背景类型不明确,应为 'number ' /  'string', 实为" + typeof  this.config.ListBgStyle.background;
        }
        this.addChild(_tmp);
    }
}

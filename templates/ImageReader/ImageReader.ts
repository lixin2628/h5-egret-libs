/**
 * Created by Lixin on 15/11/8.
 *
 * 图片阅读器
 *
 */
class ImageReader extends egret.Sprite {

    private config:any;

    public image:any;

    private _background:egret.Shape;

    /**
     *data ：
     * 包含：
     * data.type :
     *     data.type = 1  同步加载resource内资源
     *     data.type = 2   异步加载resource内资源
     *     data.type = 3   异步加载base64格式资源
     *     data.type = 4   异步加载网络资源
     *     data.type = 5  传入display对象直接使用
     *
     * data.res:
     *     根据type定义
     *
     * **/
    public constructor(data:any, config?:any) {
        super();
        this.config = config ? config : this.config = ImageReaderConfig;

        /**
         * 设置背景
         * **/
        this._background = new egret.Shape();
        this._background.graphics.beginFill(this.config.backgroundStyle.color, this.config.backgroundStyle.alpha);
        this._background.graphics.drawRect(0, 0, egret.MainContext.instance.stage.stageWidth, egret.MainContext.instance.stage.stageHeight);
        this._background.graphics.endFill();
        this._background.touchEnabled = true;
        this.addChild(this._background);
        if (this.config.backgroundStyle.type == 0) {
            this._background.alpha = 0;
        }
        var self:any = this;
        switch (data.type) {

            case 1:
                console.log('1');
                this.image = new egret.Bitmap(RES.getRes(data.res));
                this.setScale();
                this.setPosition();
                this.addChild(this.image);
                break;
            case 2:
                RES.getResAsync(data.res, function (texture) {
                    self.image = new egret.Bitmap(texture);
                    self.setScale();
                    self.setPosition();
                    self.addChild(self.image);
                }.bind(this), this);
                break;
            case 3:

            case 4:
                console.log('a');
                RES.getResByUrl(data.res, function (texture) {
                    console.log(texture);
                    self.image = new egret.Bitmap(texture);
                    self.setScale();
                    self.setPosition();
                    self.addChild(self.image);
                }.bind(this), this, RES.ResourceItem.TYPE_IMAGE);
                break;
            case 5:
                this.image = data.res;
                this.setScale();
                this.setPosition();
                this.addChild(this.image);

                break;

        }
    }

    public setScale() {

        var _w:number = 0;
        var _h:number = 0;

        var stageWidth:number = egret.MainContext.instance.stage.stageWidth;
        var stageHeight:number = egret.MainContext.instance.stage.stageHeight;
        switch (this.config.imageStyle.scaleMode) {

            //不进行缩放
            case 0:
                break;
            //按宽度缩放
            case 1:
                _w = this.image.width;
                if (this.config.imageStyle.width == 0) {
                    this.image.width = stageWidth;
                } else {
                    this.image.width = this.config.imageStyle.width;
                }
                this.image.height = this.image.height * ( this.image.width / _w);
                break;
            //按高度缩放
            case 2:
                _h = this.image.height;
                if (this.config.imageStyle.height == 0) {
                    this.image.height = stageHeight;
                } else {
                    this.image.height = this.config.imageStyle.height;
                }
                this.image.width = this.image.width * ( this.image.height / _h);
                break;
            //不缩放进行拉伸
            case 3:
                this.image.width = this.config.imageStyle.width == 0 ? stageWidth : this.config.imageStyle.width;
                this.image.height = this.config.imageStyle.height == 0 ? stageHeight : this.config.imageStyle.height;
                break;

        }
    }

    public setPosition() {
        this.image.x = (egret.MainContext.instance.stage.stageWidth - this.image.width) / 2;
        this.image.y = (egret.MainContext.instance.stage.stageHeight - this.image.height) / 2;
    }
}
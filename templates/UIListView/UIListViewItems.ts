/**
 * Created by Lixin on 15/11/6.
 *
 * 下拉列表 列表项容器
 */
class UIListViewItems extends egret.Sprite {

    /**
     * id
     * **/
    public id:number;
    public TextField:egret.TextField;
    public itemsName:string;

    public config:any = {};

    public constructor(_parent:any, _text?:string, _h?:number) {
        super();
        this.config = _parent.config;
        this.name = 'UIListViewIteams';
        this.width = this.config.ListWidth;
        this.height = _h || this.config.ColumnStyle.height;

        var _tmp;
        if (typeof this.config.ColumnStyle.background == "number") {
            _tmp = new egret.Shape();
            _tmp.graphics.beginFill(this.config.ColumnStyle.background, this.config.ColumnStyle.alpha);
            if (this.config.ColumnStyle.strokeSize > 0) {
                _tmp.graphics.lineStyle(this.config.ColumnStyle.strokeSize, this.config.ColumnStyle.strokeColor, 1);
            }
            _tmp.graphics.drawRoundRect(0, 0, this.config.ListWidth + this.config.ColumnStyle.strokeSize * 2, this.height, this.config.ColumnStyle.radius, this.config.ColumnStyle.radius);
            _tmp.graphics.endFill();
            _tmp.x = -this.config.ColumnStyle.strokeSize / 2;
        }
        else if (typeof this.config.ColumnStyle.background == "string") {
            _tmp = new egret.Bitmap(RES.getRes(this.config.ColumnStyle.background));

        } else {
            throw "列表容器背景类型不明确,应为 'number ' /  'string', 实为" + typeof  this.config.ColumnStyle.background;
        }
        this.addChild(_tmp);
        if (_text) {
            this.TextField = new egret.TextField();
            this.TextField.width = this.config.ListWidth;
            this.TextField.text = _text;
            this.TextField.textColor = this.config.ColumnTextStyle.color;
            this.TextField.size = this.config.ColumnTextStyle.size;
            this.TextField.textAlign = this.config.ColumnTextStyle.aligin;
            this.addChild(this.TextField);
            this.TextField.y = (this.height - this.TextField.size) / 2;
        }
    }


}
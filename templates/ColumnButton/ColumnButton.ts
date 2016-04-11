/**
 * Created by Lixin on 15/11/3.
 *
 * 分栏按钮
 *
 * Config: this.config.ts
 *
 *  /**
 * 创建分列状态栏
 *
 * var colum:ColumnButton = new ColumnButton();
 * this.addChild(colum);
 * 设置默认项目
 * colum.setSelect('button1');
 * 侦听选择事件
 * colum.addEventListener(ColumnButtonEvent.SELECT, this.select, this);
 *
 *
 * 初始化时可自定义配置文件（规范参考ColumnButtonConfig.ts）
 *
 */
class ColumnButton extends egret.Sprite {

    private _h:number;
    private _buttonNum:number;
    private _buttonWidth:number;
    private _buttonlist:any = {};
    private _buttonText:any = {};
    //配置
    private config:any = {};

    public constructor(config?:any) {
        super();
        if (config) {
            this.config = config;
        } else {
            this.config = ColumnButtonConfig;
        }
        this._buttonNum = this.config.ButtonNum;
        this._h = this.config.ButtonHeight;
        this.width = this.config.ContainerWidth == 0 ? egret.MainContext.instance.stage.stageWidth : this.config.ContainerWidth;
        this._buttonWidth = this.width / this._buttonNum;
        for (var i:number = 0; i < this._buttonNum; i++) {
            var _b = this._craeteButton(i);
            _b.x = i * this._buttonWidth;
            this.addChild(_b);
        }
    }

    /**
     * 创建底部按钮
     * **/
    public _craeteButton(id:number) {
        var _buttonsprite = new egret.Sprite();

        var _buttonBgShp:egret.Shape = new egret.Shape();  // new _createRect(this._buttonWidth, this._h, this.config.ButtonBgColor, this.config.ButtonStrokeColor, this.config.ButtonStrokeSize);


        _buttonBgShp.graphics.beginFill(this.config.ButtonBgColor, 1);
        _buttonBgShp.graphics.lineStyle(this.config.ButtonStrokeSize, this.config.ButtonStrokeColor, 1);
        _buttonBgShp.graphics.drawRect(0, 0, this._buttonWidth, this._h);
        _buttonBgShp.graphics.endFill();

        _buttonsprite.addChild(_buttonBgShp);
        /**
         * 按钮文字/图像
         * **/
        var btntitle;
        var btnname:string = this.config.ButtonTitle[id];
        if (this.config.ButtonTitleType == 0) {
            btntitle = new egret.TextField();
            btntitle.width = _buttonBgShp.width;
            btntitle.size = this.config.ButtonTextSize;
            btntitle.textColor = this.config.ButtonTextColor;
            btntitle.text = btnname;
            btntitle.textAlign = 'center';
            this._buttonText[btnname] = btntitle;
        } else if (this.config.ButtonTitleType == 1) {
            btntitle = new egret.Bitmap(RES.getRes(btnname));
        }
        btntitle.x = (_buttonBgShp.width - btntitle.width) / 2;
        btntitle.y = (_buttonBgShp.height - btntitle.height) / 2;
        _buttonsprite.addChild(btntitle);
        _buttonsprite.name = this.config.ButtonTitle[id];
        console.log(_buttonsprite.name);
        /**
         * 存储背景对象索引（变色）
         * **/
        this._buttonlist[btnname] = _buttonBgShp;

        _buttonsprite.touchEnabled = true;
        _buttonsprite.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBottomTouch, this);
        return _buttonsprite;
    }

    /**
     * 底部按钮touch
     * **/
    public onBottomTouch(e:egret.TouchEvent) {
        this.setSelect(e.target.name, true);
    }

    public setSelect(_name:string, isDisPlath?:boolean) {
        if (isDisPlath) {
            var event = new ColumnButtonEvent(_name, this.getChildByName(_name));
            this.dispatchEvent(event);
        }
        /**
         * 按钮切换到按下状态
         * */
        for (var i in  this._buttonlist) {
            var _color = i == _name ? this.config.ButtonSelectColor : this.config.ButtonBgColor;
            this._buttonlist[i].graphics.beginFill(_color, 1);
            this._buttonlist[i].graphics.drawRect(0, 0, this._buttonWidth, this._h);
            this._buttonlist[i].graphics.endFill();
            if (this._buttonText) {
                this._buttonText[i].textColor = i == _name ? this.config.ButtonTextSelectColor : this.config.ButtonTextColor

            }
        }
    }


}
class _createRect extends egret.Shape {

    public constructor(_w:number, _h:number, bgColor:number, _strokeColor:number, _strokeSize:number) {
        super();
        this.graphics.beginFill(bgColor, 1);
        this.graphics.drawRect(0, 0, _w, _h);
        if (_strokeColor && _strokeSize) {
            this.graphics.lineStyle(_strokeSize, _strokeColor, 1);
        }
        this.graphics.endFill();
    }
}
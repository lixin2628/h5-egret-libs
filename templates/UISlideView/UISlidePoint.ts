/**
 * Created by Lixin on 15/11/24.
 */
class UISlidePoint extends egret.Sprite {


    public config:any;

    public Sp_Select:any;
    public Sp_unSelect:any;

    public constructor(config:any) {
        super();
        this.config = config;
        if (typeof config.SlidePointStyle.select.type == "number") {
            this.Sp_Select = new egret.Shape();
            this.Sp_Select.graphics.beginFill(config.SlidePointStyle.select.type);
            if (config.SlidePointStyle.select.strokeSize > 0) {
                this.Sp_Select.graphics.lineStyle(config.SlidePointStyle.select.strokeSize, config.SlidePointStyle.select.strokeColor, 1);
            }
            this.Sp_Select.graphics.drawCircle(0, 0, config.SlidePointStyle.redius);
            this.Sp_Select.graphics.endFill();
            this.Sp_Select.name = "Sp_Select";
        } else {
            this.Sp_Select = new egret.Bitmap(RES.getRes(config.SlidePointStyle.select.type));
            this.Sp_Select.anchorX = this.Sp_Select.anchorY = 0.5;
            this.addChild(this.Sp_Select);
            this.Sp_Select.width = this.Sp_Select.height = config.SlidePointStyle.redius;
            this.Sp_Select.name = "Sp_Select";
        }
        ////
        if (typeof config.SlidePointStyle.unSelect.type == "number") {
            this.Sp_unSelect = new egret.Shape();
            this.Sp_unSelect.graphics.beginFill(config.SlidePointStyle.unSelect.type);
            if (config.SlidePointStyle.unSelect.strokeSize > 0) {
                this.Sp_unSelect.graphics.lineStyle(config.SlidePointStyle.unSelect.strokeSize, config.SlidePointStyle.unSelect.strokeColor, 1);
            }
            this.Sp_unSelect.graphics.drawCircle(0, 0, config.SlidePointStyle.redius);
            this.Sp_unSelect.graphics.endFill();
            this.Sp_unSelect.name = "Sp_unSelect";
        } else {
            this.Sp_unSelect = new egret.Bitmap(RES.getRes(config.SlidePointStyle.unSelect.type));
            this.Sp_unSelect.anchorX = this.Sp_unSelect.anchorY = 0.5;
            this.addChild(this.Sp_unSelect);
            this.Sp_unSelect.width = this.Sp_unSelect.height = config.SlidePointStyle.redius;
            this.Sp_unSelect.name = "Sp_unSelect";
        }
        this.addChild(this.Sp_Select);
        this.addChild(this.Sp_unSelect);
        this.unSelect();
    }

    public select() {
        this.Sp_Select.visible = true;
        this.Sp_unSelect.visible = false;
    }

    public unSelect() {
        this.Sp_Select.visible = false;
        this.Sp_unSelect.visible = true;
    }
}
/**
 * Created by Lixin on 16/3/4.
 */
module  gg {
    export class UIReaderViewerCreater extends egret.Sprite {


        public constructor(configs:any) {
            super();
            var list:any[] = configs['assets'];
            for (var i:number = 0; i < list.length; i++) {
                switch (list[i].type) {
                    case "image":
                        this[list[i].name] = new UIReaderViewerCreater_Bitmap(list[i]);
                        break;
                    case "text":
                        this[list[i].name] = new UIReaderViewerCreater_TextFild(list[i]);
                        break;
                    case "node":
                        this[list[i].name] = new gg.UIReaderViewerCreater({assets: list[i]});
                        break;
                }
                this.addChild(this[list[i].name])
            }

        }


        public _(_name:string) {
            return this.getChildByName(_name);
        }
    }

    export class UIReaderViewerCreater_Bitmap extends egret.Bitmap {


        public constructor(config:any) {
            super(RES.getRes(config['resname']));
            this.x = config.x;
            this.y = config.y;
            this.width = config.width;
            this.height = config.height;
            this.scaleX = config.scaleX;
            this.scaleY = config.scaleY;
            this.anchorOffsetX = config.anchorX * this.width;
            this.anchorOffsetY = config.anchorY * this.height;
            this.alpha = config.alpha;
            this.touchEnabled = config.touch;
            this.name = config.name;
            this.visible = config.visible;
            this.rotation = config.rotation;

        }
    }

    export class UIReaderViewerCreater_TextFild extends egret.TextField {


        public constructor(config:any) {
            super();
            this.x = config.x;
            this.y = config.y;
            this.width = config.width;
            this.height = config.height;
            this.scaleX = config.scaleX;
            this.scaleY = config.scaleY;
            this.anchorOffsetX = config.anchorX * this.width;
            this.anchorOffsetY = config.anchorY * this.height;
            this.alpha = config.alpha;
            this.touchEnabled = config.touch;
            this.name = config.name;
            this.visible = config.visible;
            this.rotation = config.rotation;
            //======
            this.text = config.text;
            this.textAlign = config.align;
            this.textColor = config.color;
            this.size = config.size;
        }
    }

}

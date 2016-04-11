/**
 * Created by Lixin on 16/1/6.
 *
 * 文字加载进度页面
 */
module gg {
    export class textLoading extends gg.Layer {

        /**
         * 进度条
         * */
        public progressbar:egret.Shape;

        /**
         *进度文字
         * */
        public progresstext:egret.TextField;

        public constructor() {
            super();
            this.setBackgroundColor(0xbfe0e0);
            this.progressbar = new egret.Shape();
            this.progressbar.graphics.beginFill(0xbfe0e0, 1);
            this.progressbar.graphics.drawRect(0, this.height / 2, this.width, this.height * 0.1);
            this.progressbar.graphics.endFill();
            this.addChild(this.progressbar);
            this.progressbar.scaleX = 0;
            this.progresstext = new egret.TextField();
            this.progresstext.size = 24;
            this.progresstext.width = this.width;
            this.progresstext.textAlign = 'center';
            this.addChild(this.progresstext);
            this.progresstext.y = this.height / 2 + (this.progressbar.height - this.progresstext.size) / 2;
            this.progresstext.textColor = 0x6d9696;
            this.progresstext.text = 'loading...';

            egret.MainContext.instance.stage.addChild(this);
        }

        public setProgress(_c:number) {
            this.progresstext.text = "正在加载资源文件:" + _c.toString() + "%";
            this.progressbar.scaleX = (_c / 100);
        }

        public setText(_str:string) {
            this.progresstext.text = _str;
        }

        public remove() {
            egret.MainContext.instance.stage.removeChild(this);
        }
    }
}


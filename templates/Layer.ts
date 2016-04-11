/**
 * Created by Lixin on 15/12/21.
 *
 * egret 项目模板
 *
 *       层
 */

module gg {
    export class
    Layer extends egret.Sprite {
        private _colorbackground:egret.Shape = null;
        public constructor() {
            super();

            /**
             * init
             * **/
            this.width = egret.MainContext.instance.stage.stageWidth;
            this.height = egret.MainContext.instance.stage.stageHeight;
        }

        /**
         * 纯色背景
         * param
         * 颜色
         * **/
        public setBackgroundColor(_c:number) {
            if (this._colorbackground != null)this.removeChild(this._colorbackground);
            this._colorbackground = gg.Tools.drawRect(this.width, this.height, _c, 1);
            this.addChildAt(this._colorbackground, 0);
        }

        /**
         * 移除背景
         * **/
        public removeBackgroundColor() {
            if (this._colorbackground) {
                this.removeChild(this._colorbackground);
                this._colorbackground = null;
            }
        }

        /**
         * 移除层上所有元素
         * **/
        public removeAll() {

            var _n:number = this.numChildren;
            var _start:number = this._colorbackground == null ? 0 : 1;
            for (var i:number = _n - 1; i >= _start; i--) {
                if (this.getChildAt(_start))this.removeChild(this.getChildAt(_start));
            }
        }
    }

}
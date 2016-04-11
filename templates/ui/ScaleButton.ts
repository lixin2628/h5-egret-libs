/**
 * Created by Lixin on 16/3/4.
 *
 * 带有缩放动画的按钮
 *
 */
module gg {

    export class ScaleButton extends egret.Bitmap {


        public constructor(_tex:any) {
            super(_tex);
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegans, this);
        }

        public onTouchBegans(e:egret.TouchEvent) {
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to({scaleX: 1.2, scaleY: 1.2}, 60);
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this);
        }

        public onTouchEnded(e:egret.TouchEvent) {
            egret.Tween.removeTweens(this);
            var self:any = this;
            egret.Tween.get(this).to({scaleX: 1, scaleY: 1}, 60).call(function () {
                self.dispatchEvent(new gg.ScaleButtonEvent(gg.ScaleButtonEvent.TOUCH_UPS));
            });
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this);
        }
    }

    export class ScaleButtonEvent extends egret.Event {

        public static TOUCH_UPS:string = 'touch_ups';

        public constructor(type) {
            super(type, false, false);
        }

    }
}

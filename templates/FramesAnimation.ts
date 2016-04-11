/**
 * Created by Lixin on 15/5/16.
 *  序列帧动画
 *
 */
module  gg {
    export class FramesAnimation extends egret.Bitmap {
        private list:any[] = [];
        public currentFrame:number = -1;
        public totalFrames:number = 0;
        //
        public frameRate:number = 60;
        private animationtimer:egret.Timer;

        /**
         * @param {string} [['name1','name2','name3'...]] 序列帧图像名称
         * @param  {number}[60] 切换帧频
         * **/
        public constructor(namelist:string[], frame:number = 60) {
            super();
            this.totalFrames = namelist.length;
            this.frameRate = frame;
            for (var i:number = 0; i < namelist.length; i++) {
                var _tex:any = RES.getRes(namelist[i]);
                this.list.push(_tex);
            }
            this.texture = this.list[0];

            this.currentFrame = 1;
            this.animationtimer = new egret.Timer(1000 / this.frameRate);
            this.animationtimer.addEventListener(egret.TimerEvent.TIMER, this.onAnimationTimer, this);
        }
        private cb:Function;

        public play(cb:Function = null) {
            //播放完成后的回调 ，如果cb存在，则只播放一次
            this.cb = cb;
            this.animationtimer.start();
        }

        public stop() {
            this.animationtimer.stop();
        }

        public next() {
            this.animationtimer.start();
        }

        public gotoAndPlay(value:number) {
            if (value < 1 || value > this.totalFrames)
                return;
            this.currentFrame = value;
            this.texture = this.list[this.currentFrame - 1];
        }

        private onAnimationTimer(e:egret.TimerEvent) {
            if (this.currentFrame < this.totalFrames) {
                this.currentFrame += 1
            } else {
                if (this.cb) {
                    this.cb();
                    this.stop();
                    this.cb = null;
                } else {
                    this.currentFrame = 1;
                }
            }
            this.texture = this.list[this.currentFrame - 1];
        }
    }
}

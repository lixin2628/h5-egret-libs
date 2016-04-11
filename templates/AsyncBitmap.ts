/**
 * Created by hoowu on 2015/12/8.
 *
 * 异步加载图像
 */
module gg {

    export class AsyncBitmap extends egret.Bitmap {

        public constructor(url:string = null) {
            super();
            if (url) {
                this.ResLoad(url);
            }
        }

        public ResLoad(url:string) {
            var self:any = this;
            RES.getResByUrl(url, function (_tex:any) {
                self.texture = _tex;
            }, this, RES.ResourceItem.TYPE_IMAGE)
        }

    }

}


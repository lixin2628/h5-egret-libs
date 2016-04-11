/**
 * Created by Lixin on 15/11/8.
 * 列表容器滚动条
 */
class UIListScrollBar extends egret.Sprite {

    public config:any = {};
    private _shp:any = null;
    private _listheight:number = 0;


    public constructor(config?:any) {
        super();
        this.config = config ? config : UIListScrollBarConfig;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {

    }

    /**
     * 绘制
     * **/
    public draw(_parent:UIListView) {

        if (this._shp) {
            this._shp.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._scrolltouchbegan, this);
            this.removeChild(this._shp);
        }
        //当前容器高度
        var containerheight:number = _parent._scrollContainer.getScrollContainerHeight();
        //列表高度
        var listhieght:number = _parent.config.ListHeight;
        this._listheight = listhieght;
        //应绘制高度
        var scrollheight:number;
        if (this.config.scrollHeight != 0) {
            scrollheight = this.config.scrollHeight;
        } else {
            scrollheight = listhieght / containerheight >= 1 ? listhieght : Math.max((listhieght / containerheight) * listhieght, this.config.minHeight);
        }
        /**
         * 矢量绘制
         * **/
        if (this.config.style.type == 1) {
            this._shp = new egret.Shape();
            this._shp.graphics.beginFill(this.config.style.background);
            this._shp.graphics.lineStyle(this.config.style.strokeSize, this.config.style.strokeColor, 1);
            this._shp.graphics.drawRoundRect(0, 0, this.config.style.width, scrollheight, this.config.style.radius, this.config.style.radius);
            this._shp.graphics.endFill();
        } else {
            //位图渲染
            this._shp = new egret.Sprite();
            var _center:egret.Bitmap = new egret.Bitmap(RES.getRes(this.config.style.scrollBitmap));
            this._shp.addChild(_center);
            _center.height = scrollheight;
            if (this.config.style.topScrollBitmap) {
                var _top:egret.Bitmap = new egret.Bitmap(RES.getRes(this.config.style.topScrollBitmap))
                this._shp.addChild(_top);
                _center.height -= _top.height;
                _center.y += _top.height;
            }
            if (this.config.style.bottomScrollBitmap) {
                var _bottom:egret.Bitmap = new egret.Bitmap(RES.getRes(this.config.style.bottomScrollBitmap));
                this._shp.addChild(_bottom);
                _center.height -= _bottom.height;
                _bottom.y = _center.y + _center.height;
            }

        }
        this._shp.name = "scrollbar";
        this._shp.touchEnabled = true;
        this._shp.height = scrollheight;
        this.addChild(this._shp);
        if (this.stage) {
            this._shp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._scrolltouchbegan, this);
        }
        this._shp.x = _parent.width - this._shp.width;
    }

    private _scrollY:number;

    private _scrolltouchbegan(e:egret.TouchEvent) {
        this._scrollY = e.stageY;
        if (this.stage) {
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this._scroll, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this._scrollend, this);
        }
    }

    private _scrollend(e:egret.TouchEvent) {
        if(this.stage){
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this._scroll, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this._scrollend, this);
        }
    }
    private _scroll(e:egret.TouchEvent) {
        var moveend:number = this._shp.y + (e.stageY - this._scrollY);
        if (moveend >= 0 && moveend <= (this._listheight - this._shp.height)) {
            this._shp.y = moveend;
            var events = new ListScrollBarMoveEvent(this._shp.y / (this._listheight - this._shp.height));
            this.dispatchEvent(events);
        }
        this._scrollY = e.stageY;

    }

    /**
     * 计算Y坐标
     * **/
    public setPositionY(_parent:UIListView) {
        if (this._shp) {
            if (this._shp.height >= _parent.config.ListHeight) {
                this._shp.y = 0;
                return;
            } else {

                //容器滚动的百分比
                var _p:number = _parent.getScrollProportion();
                //下拉条可移动距离
                var _maxheight = _parent.config.ListHeight - this._shp.height;
                if (_p <= 0 || _parent._scrollContainer.y > 0) {
                    this._shp.y = 0;
                } else if (_p >= 1) {
                    this._shp.y = _maxheight;
                } else {
                    this._shp.y = _maxheight * _p;
                }
            }
        }
    }
}
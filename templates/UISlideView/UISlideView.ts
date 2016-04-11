/**
 * Created by Lixin on 15/11/24.
 */
class UISlideView extends egret.Sprite {

    /**
     *config  配置文件 如果不存在，则使用 UISlideViewConfig.ts
     ***/
    public config:any;
    //显示区域 遮罩
    public maskRect:egret.Rectangle;
    //显示容器
    public container:egret.Sprite = new egret.Sprite();
    //数量显示容器
    public numPointContainer:egret.Sprite = new egret.Sprite();
    //显示数量数组
    public numPointList:UISlidePoint[] = [];

    public constructor(config?:any) {
        super();
        this.name = 'UISlideView';
        this.config = config ? config : UISlideViewConfig;

        if (this.config.SlideViewWidch == 0)this.config.SlideViewWidch = egret.MainContext.instance.stage.stageWidth;
        if (this.config.SlideViewHeight == 0)this.config.SlideViewHeight = egret.MainContext.instance.stage.stageHeight;
        //
        this.width = this.config.SlideViewWidch;
        this.height = this.config.SlideViewHeight;
        this.maskRect = new egret.Rectangle(0, 0, this.width, this.height);
        //
        this.container.height = this.height;
        this.mask = this.maskRect;

        //实例化背景
        this.addChild(new UISlideBackGround(this.config));
        this.addChild(this.container);
        this.addChild(this.numPointContainer);
        this.container.touchEnabled = true;
        this.container.name = 'UISlideView';
        //处理拖动
        this.container.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegan, this);
    }

    /**
     * 处理拖动
     * **/
    private _touchX:number;
    private _downX:number;
    //快速滑动切换
    private downTime:number;

    private onTouchBegan(e:egret.TouchEvent) {
        this._touchX = e.stageX;
        this._downX = e.stageX;
        this.downTime = egret.getTimer();
        egret.Tween.removeTweens(this.container);
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMoved, this);
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this);
    }

    private onTouchMoved(e:egret.TouchEvent) {
        this.container.x += (e.stageX - this._touchX);
        this._touchX = e.stageX;
    }

    private onTouchEnded(e:egret.TouchEvent) {
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMoved, this);
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this);
        var timer:number = 150;
        //快速滑动
        // console.log(egret.getTimer() - this.downTime, Math.abs(e.stageX - this._downX))

        //出界控制


        egret.Tween.removeTweens(this.container);

        if (this.container.x > 0) {
            egret.Tween.get(this.container).to({x: 0}, timer).call(this.setNumPoint.bind(this));
            return;
        } else if (this.container.x < -(this.container.width - this.config.SlideViewWidch)) {
            egret.Tween.get(this.container).to({x: -(this.container.width - this.config.SlideViewWidch)}, timer).call(this.setNumPoint.bind(this));
            return;
        }

        if ((egret.getTimer() - this.downTime < 300) && Math.abs(e.stageX - this._downX) > 10) {


            if (e.stageX - this._downX < 0) {
                if (this.getCurrentPageNum() < this.numPointList.length - 1) {
                    egret.Tween.get(this.container).to({x: -(this.getCurrentPageNum() + 1) * this.config.SlideViewWidch}, timer).call(this.setNumPoint.bind(this));
                } else {
                    egret.Tween.get(this.container).to({x: (this.getCurrentPageNum()) * this.config.SlideViewWidch}, timer).call(this.setNumPoint.bind(this));
                }

            } else {
                if (this.getCurrentPageNum() > 0) {
                    egret.Tween.get(this.container).to({x: -(this.getCurrentPageNum() * this.config.SlideViewWidch)}, timer).call(this.setNumPoint.bind(this));
                } else {
                    egret.Tween.get(this.container).to({x: 0}, timer).call(this.setNumPoint.bind(this));
                }
            }
        } else {
            //计算位置 用于切换
            var _x:number = Math.abs(this.container.x) % this.config.SlideViewWidch;
            if (_x < this.config.SlideViewWidch / 2) {
                egret.Tween.get(this.container).to({x: -(Math.floor(Math.abs(this.container.x) / this.config.SlideViewWidch)) * this.config.SlideViewWidch}, timer).call(this.setNumPoint.bind(this));
            } else {
                egret.Tween.get(this.container).to({x: -(Math.ceil(Math.abs(this.container.x) / this.config.SlideViewWidch)) * this.config.SlideViewWidch}, timer).call(this.setNumPoint.bind(this));

            }
        }

    }


    /**
     * 清除所有项
     * **/
    public removeAllItems() {

    }

    /**
     * 清除指定项
     * {number||string}  =string : 按 itemsName查找    =number  按 itemsId 查找
     *
     * **/
    public removeItems(type:any) {

    }

    /**
     * 添加项
     * **/
    public pushItems(viewerList:UISlideItems[]) {
        for (var i:number = 0; i < viewerList.length; i++) {
            viewerList[i].x = this.container.numChildren * this.width;
            this.container.addChild(viewerList[i]);
        }
        this.createNumPoint();
    }

    /**
     * 获取当前滚动到的页码
     * **/
    public getCurrentPageNum() {

        return Math.floor(Math.abs(this.container.x) / this.config.SlideViewWidch);
    }

    /**
     * 返回当前页面的对象
     * **/
    public getCurrentPageChildren() {
        return this.container.getChildAt(this.getCurrentPageNum());
    }

    /**
     * 设置当前页 标示符状态
     * **/
    public setNumPoint() {
        //滚动到了哪一页
        for (var i:number = 0; i < this.numPointList.length; i++) {
            this.numPointList[i].unSelect();
        }
        this.numPointList[this.getCurrentPageNum()].select();
    }


    /**
     * 创建数量节点
     * **/
    public createNumPoint() {
        this.numPointList = [];
        this.removeChild(this.numPointContainer);
        this.numPointContainer = new egret.Sprite();
        this.addChild(this.numPointContainer);
        //对象数量
        var num:number = this.container.numChildren;
        console.log(num);
        for (var i:number = 0; i < num; i++) {

            var p:UISlidePoint = new UISlidePoint(this.config);
            this.numPointList.push(p);
            this.numPointContainer.addChild(p);
            p.x = i * (this.config.SlidePointStyle.redius * 4);
        }
        this.numPointContainer.anchorX = 0.5;
        this.addChild(this.numPointContainer);
        this.numPointContainer.x = this.config.SlideViewWidch / 2;
        this.numPointContainer.y = this.height - this.config.SlidePointStyle.redius - 10;
        this.numPointList[0].select();

    }
}

/**
 * Created by Lixin on 15/9/14.
 *
 * 通用下拉列表组件
 *    var listView = new UIListView();
 *    this.addChild(listView);
 *     // 使用默认配置绑定滚动条(可选)
 *     listView.bindScorllBar(new UIListScrollBar());
 *    listView.y = 100;
 *    for (var i:number = 0; i < 60; i++) {
 *     //创建一个列表项目项
 *           //创建列表栏，传入父级列表对象，第二个参数为可选（标题内容）
 *           listView.m(new UIListViewIteams(listView, i.toString()));
 *           //设置项名称
 *           imteams.iteamsName='iteams  name';
 *           //添加到列表容器内
 *           listView.pushIteams());
 *       }
 *      //点击
 *      listView.addEventListener(ListTocuhEvent.LIST_TOUCH, this.listTouch, this);
 *      //滚动到底部
 *      listView.addEventListener(ListScrollEvent.LIST_SCROLL_BOTTOM, this.listscrollbottom, this);
 *      //滚动到顶部
 *      listView.addEventListener(ListScrollEvent.LIST_SCROLL_TOP, this.listscrolltop, this);
 *
 * * 初始化时可自定义配置文件（规范参考UIListViewConfig.ts）
 *
 *
 * 2015.11.25 更新 ListTouchEvent 内 添加 touchTarget对象  用于返回按下时触发的对象
 *
 *
 */
class UIListView extends egret.Sprite {

    /**
     * 容器遮罩
     * **/
    public container_mask:egret.Rectangle;
    /**
     * 容器大背景
     * **/
    public background:UIListBackground;
    /**
     * 滚动容器
     * **/
    public _scrollContainer:UIListViewScrollContainer;
    public downPoint:any = {};
    public downTimes:number;
    public downY:number;
    /**
     * 滚动时间
     * **/
    public scrollTimes:number = 100;

    /**
     * 是否滚动
     * **/

    public Touch:boolean = true;

    /**
     * 滚动条
     * **/
    public scrollBar:UIListScrollBar = null;

    public config:any = {};

    public constructor(config?:any) {
        super();
        this.config = config ? this.config = config : UIListViewConfig;
        this.uiInit();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegan, this);
    }

    //保存点击的元素
    private _TouchTarget:any;

    private onTouchBegan(e:egret.TouchEvent) {

        if (!this.stage || !this.Touch)return;
        //计算上级坐标
        var _x:number = this.x + this.parent.x || 0;
        var _y:number = this.y + this.parent.y || 0;
        if (e.stageX > _x && e.stageX < _x + this.config.ListWidth
            && e.stageY > _y && e.stageY < _y + this.config.ListHeight
            && e.target.name != "_topMoveButton" && e.target.name != "_bottomMoveButton" && e.target.name != 'scrollbar'
        ) {
            this._TouchTarget = e.target;
            this.downY = e.stageY;
            this.downPoint = {x: e.stageX, y: e.stageY};
            this.downTimes = egret.getTimer();
            this.tweenEnded();
            egret.Tween.removeTweens(this._scrollContainer);
            // egret.Tween.removeTweens(this._scrollContainer.mask);
            if (this.scrollBar)this.scrollBar.setPositionY(this);
            if (this.stage) {
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            }
        }
    }

    /**
     * 绑定滚动条
     * **/
    public bindScorllBar(_scrollbar:UIListScrollBar) {
        this.scrollBar = _scrollbar;
        this.addChild(this.scrollBar);
        this.scrollBar.draw(this);
        this.scrollBar.addEventListener(ListScrollBarMoveEvent.LIST_SCROLLBAR_MOVE, this._scrollmove, this);
    }

    /**
     * 滚动条拖动
     * **/
    private _scrollmove(e:ListScrollBarMoveEvent) {
        var _p:number = e.proportion;
        var scrollcontainerendY:number = (this._scrollContainer.getScrollContainerHeight() - this.config.ListHeight) * _p;
        if (scrollcontainerendY > 0) {
            this._scrollContainer.y = -scrollcontainerendY;
            //    this.container_mask.y = scrollcontainerendY;

            //console.log(_p, this._scrollContainer.y, this._scrollContainer.y - scrollcontainerendY);
            //this.setScroll(this._scrollContainer.y - scrollcontainerendY);
        }
    }

    /**
     * 获取滚动容器的百分比
     * **/
    public getScrollProportion():number {
        return this._scrollContainer.getScrollProportion();
    }

    /**
     * touch start
     * **/
    private onTouchMove(e:egret.TouchEvent) {
        if (!this.stage)return;
        var move:number = e.stageY - this.downPoint.y;
        this.setScroll(move);
        this.downPoint = {x: e.stageX, y: e.stageY};
        this.downTimes = egret.getTimer();
        //向下出轨检测
        if (this._scrollContainer.y > this.config.ListHeight * .5) {
            this.onTouchEnd(null);
        }
        //向上检测
        else if (this._scrollContainer.y < this.getContainerMinPosition() - this.config.ListHeight * 0.5) {
            this.onTouchEnd(null);
        }
        if (this.scrollBar)this.scrollBar.setPositionY(this);
    }

    /**
     * 滚动
     * **/
    public setScroll(_offsetY:number) {
        this._scrollContainer.y += _offsetY;
        //  this.container_mask.y -= _offsetY;
    }

    /**
     * 惯性缓动
     * **/
    //运动距离
    public tweenOffsets:number = 0;
    //运动速度
    public tweenSpeeds:number = 10;

    public tweenStart(_offsets:number, movetime:number) {
        this.tweenOffsets = _offsets;
        this.addEventListener(egret.Event.ENTER_FRAME, this.onTweenRun, this);
    }

    public tweenEnded() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onTweenRun, this);
    }

    private onTweenRun(e:egret.Event) {
        if (Math.abs(this.tweenOffsets) > 1) {
            var speed:number = this.tweenOffsets / this.tweenSpeeds;
            this._scrollContainer.y += speed;
            //   this.container_mask.y -= speed;
            this.tweenOffsets -= speed;
            if (this.scrollBar)this.scrollBar.setPositionY(this);
        } else {
            this.tweenEnded();
        }
    }

    /**
     * 滚动停止
     * **/
    private onTouchEnd(e:egret.TouchEvent) {
        var _touchEndY:number = e ? e.stageY : this.downPoint.y;
        var moveTime = egret.getTimer() - this.downTimes;
        var move = _touchEndY - this.downY;
        /**
         *判断是否为点击状态
         * ***/
        if (Math.abs(move) < 5 && moveTime < 500 /*&& e.target.name == "UIListViewIteams"*/) {
            var event = new ListTocuhEvent(e.target, this, this._TouchTarget);
            this.dispatchEvent(event);
        } else {
            /**
             * 大于 0  ||列表容器较少 ，高度较低,重置到0点
             * **/
            if (this._scrollContainer.y > 0 || (this._scrollContainer.getScrollContainerHeight() <= this.config.ListHeight)) {
                this.dispatchEvent(new ListScrollEvent(this, ListScrollEvent.LIST_SCROLL_TOP));
                this.scrollToTop();
            }
            /**
             * 滚动到最底部
             * **/
            else if (this._scrollContainer.y < this.getContainerMinPosition()) {
                this.dispatchEvent(new ListScrollEvent(this, ListScrollEvent.LIST_SCROLL_BOTTOM));
                this.scrollToBottom();
            }
            /**
             * 计算回弹
             * **/
            else {

                var maxtime:number = 500;
                if (moveTime < maxtime && Math.abs(move) > 10) {
                    var speed = (maxtime - moveTime) * move;
                    speed = speed / maxtime;

                    //最大滚动位置
                    if ((this._scrollContainer.y + speed) > 0) {
                        //滚到原点
                        this.scrollToTop();
                    }
                    //最小滚动位置
                    else if (this._scrollContainer.y + speed < this.getContainerMinPosition()) {
                        this.scrollToBottom();
                    }
                    else {
                        this.tweenStart(speed, moveTime);
                        //   egret.Tween.get(this._scrollContainer).to({y: this._scrollContainer.y + speed}, this.scrollTimes * 2.5);
                        // egret.Tween.get(this.container_mask).to({y: this.container_mask.y - speed}, this.scrollTimes * 2.5);
                    }

                }
            }
        }


        if (this.stage) {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        }
    }

    /**
     * 滚动到顶部
     * **/
    public scrollToTop() {
        egret.Tween.get(this._scrollContainer).to({y: 0}, this.scrollTimes);
        //  egret.Tween.get(this._scrollContainer.mask).to({y: 0}, this.scrollTimes);
    }

    /**
     * 滚动到底部
     * **/
    public scrollToBottom() {
        egret.Tween.get(this._scrollContainer).to({y: this.getContainerMinPosition()}, this.scrollTimes);
        //  egret.Tween.get(this._scrollContainer.mask).to({y: this._scrollContainer.getScrollContainerHeight() - this.config.ListHeight}, this.scrollTimes);
    }

    /**
     * 计算允许的最低点
     * **/
    public getContainerMinPosition():number {
        if (this._scrollContainer.getScrollContainerHeight() <= this.config.ListHeight)return 0;
        return -( this._scrollContainer.getScrollContainerHeight() - this.config.ListHeight);
    }

    /**
     * 添加一个项到列表内
     * **/
    public pushItems(iteams:UIListViewItems) {
        this._scrollContainer.pushIteams(iteams);
        if (this.scrollBar)this.scrollBar.draw(this);
        if (this.scrollBar)this.scrollBar.setPositionY(this);

    }

    /**
     * 从列表内移除某一项
     * _tag:
     * 类型为number 时，移除id为_tag的元素
     * 类型为string 时, 移除name 为_tag的元素
     * **/
    public removeItems(_tag:any) {
        var num:number = this._scrollContainer.removeItems(_tag);
        //重定位
        if (num > 0 && this._scrollContainer.y <= -num) {
            this._scrollContainer.y += num;
            //  this.container_mask.y -= num;
        }
        if (this.scrollBar)this.scrollBar.draw(this);
        if (this.scrollBar)this.scrollBar.setPositionY(this);

    }

    public uiInit() {
        //
        this.background = new UIListBackground(this.config);
        this._scrollContainer = new UIListViewScrollContainer(this.config);
        this.addChild(this.background);
        this.addChild(this._scrollContainer);
        /**
         * 滚动区域遮罩
         * */
        this.container_mask = new egret.Rectangle(0, 0, this.config.ListWidth, this.config.ListHeight);
        this.mask = this.container_mask;
        this.addChild(this._scrollContainer);
    }


}

/**
 * Created by Lixin on 15/11/7.
 */
/**
 * 列表自定义TOUCH事件
 * **/
class ListTocuhEvent extends egret.Event {

    public static LIST_TOUCH:string = 'ListTouch';


    public selectId:number;
    public selectName:string;
    public currentUIList:UIListViewScrollContainer;
    //点击时触发对象
    public touchTarget:egret.DisplayObject;

    public constructor(currentTarget, currentUIList, target:any) {
        super(ListTocuhEvent.LIST_TOUCH, false, false);
        this.currentTarget = currentTarget;
        this.selectId = currentTarget.id;
        this.selectName = currentTarget.name;
        this.currentUIList = currentUIList;
        this.touchTarget = target;
    }
}
/**
 * 自定义滚动事件
 * **/
class ListScrollEvent extends egret.Event {

    public static LIST_SCROLL_TOP:string = 'listScrollTop';
    public static LIST_SCROLL_BOTTOM:string = 'listScrollBottom';
    public currentUIList:UIListViewScrollContainer;

    public constructor(currentUIList, eventName) {
        super(eventName, false, false);
        this.currentUIList = currentUIList;
    }
}
/**
 * 滚动条滚动事件
 * **/
class ListScrollBarMoveEvent extends egret.Event {

    public static LIST_SCROLLBAR_MOVE:string = "lisrtScrollBarMove";
    public proportion:number;

    public constructor(proportion) {
        super(ListScrollBarMoveEvent.LIST_SCROLLBAR_MOVE, false, false);
        this.proportion = proportion;
    }
}
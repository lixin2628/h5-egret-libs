/**
 * Created by Lixin on 15/11/6.
 *
 * 列表容器 / 滚动容器
 *
 */
class UIListViewScrollContainer extends egret.Sprite {

    /**
     * 容器内所有元素列表
     * **/
    public _childrenlist:UIListViewItems[] = [];

    /**
     * 当前高度
     * **/
    public currentMaxHeight:number = 0;

    public config:any = {};

    public constructor(config:any) {
        super();
        this.config = config;
        this.width = this.config.ListWidth;
    }

    /**
     * 添加一项到容器内ColumnTextStyle
     * **/
    public pushIteams(colum:UIListViewItems) {
        this.addChild(colum);
        colum.y = this.currentMaxHeight;
        colum.touchEnabled = true;
        colum.id = this._childrenlist.length;
        this._childrenlist.push(colum);
        this.currentMaxHeight += colum.height;
    }

    public removeItems(_tag:any) {
        //要遍历查询的属性
        var _name = typeof _tag == "number" ? "Index" : "name";
        //是否已经查询到
        var _isof:number = -1;
        //被删除元素的高度 进行位移
        var _h:number;
        for (var i:number = 0; i < this._childrenlist.length; i++) {

            if (_isof > -1) {
                this._childrenlist[i].y -= _h;
            } else {
                if (this._childrenlist[i].id == _tag) {
                    _isof = i;
                    _h = this._childrenlist[i].height;
                    this.currentMaxHeight -= _h;
                }
            }
        }
        var _renumber:number = 0;
        if (this.y + this._childrenlist[_isof].y > 0) {
            _renumber = _h;
        }
        this.removeChild(this._childrenlist[_isof]);
        this._childrenlist.splice(_isof, 1);
        return _renumber;
    }

    /**
     * 获取当前容器高度
     * **/
    public getScrollContainerHeight():number {
        return this.currentMaxHeight;
    }

    /**
     * 获取当前容器滚动的比例
     * **/
    public getScrollProportion():number {
        return Math.abs(this.y) / (this.getScrollContainerHeight() - this.config.ListHeight);
    }
}


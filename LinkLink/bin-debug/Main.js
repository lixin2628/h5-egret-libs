var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        // 格子 宽高数量
        this.imax = 10;
        this.jmax = 10;
        // 格子元素 二维数组
        this.map = [];
        //绘制路径的shape对象
        this.shp = new egret.Shape();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        var bx;
        var a = Box.a;
        //初始化地图
        for (var i = 0; i < this.imax; i++) {
            this.map[i] = [];
            for (var j = 0; j < this.jmax; j++) {
                //边缘留空
                if (i == 0 || j == 0 || i == this.imax - 1 || j == this.jmax - 1) {
                    this.map[i][j] = null;
                    continue;
                }
                //实例一个格子
                bx = new Box();
                bx.x = i * a;
                bx.y = j * a;
                //记录对应索引
                bx.index = { i: i, j: j };
                this.map[i][j] = bx;
                this.stage.addChild(bx);
                bx.touchEnabled = true;
                bx.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBoxTouch, this);
            }
        }
        this.stage.addChild(this.shp);
    };
    p.onBoxTouch = function (e) {
        //清除之前画的线
        this.shp.graphics.clear();
        //选择当前点击的对象
        var bx = e.target;
        //第一次点击的方块存在
        if (this.lastSelect) {
            this.lastSelect.alpha = 1;
            //当前点击的不是上一个方块 ，并且颜色相同
            if (bx != this.lastSelect && this.lastSelect.color == bx.color) {
                var line = LinkLink.to(this.lastSelect.index, bx.index, this.map);
                if (line) {
                    this.shp.graphics.moveTo(line[0].i * Box.a + Box.a / 2, line[0].j * Box.a + Box.a / 2);
                    for (var i = 0; i < line.length; i++) {
                        this.shp.graphics.lineStyle(3, 0x000000, 1);
                        if (i > 0)
                            this.shp.graphics.moveTo(line[i - 1].i * Box.a + Box.a / 2, line[i - 1].j * Box.a + Box.a / 2);
                        this.shp.graphics.lineTo(line[i]['i'] * Box.a + Box.a / 2, line[i]['j'] * Box.a + Box.a / 2);
                    }
                    this.shp.graphics.endFill();
                    console.log('link');
                    this.stage.removeChild(this.lastSelect);
                    this.stage.removeChild(bx);
                    this.map[this.lastSelect.index.i][this.lastSelect.index.j] = null;
                    this.map[bx.index.i][bx.index.j] = null;
                    this.lastSelect = null;
                    return;
                }
            }
        }
        //保存上一个点击的对象
        this.lastSelect = bx;
        bx.alpha = 0.5;
    };
    return Main;
})(egret.DisplayObjectContainer);
egret.registerClass(Main,'Main');

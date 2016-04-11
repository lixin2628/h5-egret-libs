/**
 * Created by Lixin on 16/3/17.
 */
var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        _super.call(this);
        this.color = this.randomColor();
        this.graphics.lineStyle(0.2, 0xffffff);
        this.graphics.beginFill(this.color, 1);
        this.graphics.drawRect(0, 0, Box.a, Box.a);
        this.graphics.endFill();
    }
    var d = __define,c=Box,p=c.prototype;
    p.randomColor = function () {
        var i = Math.floor(Math.random() * 7);
        var u;
        switch (i) {
            case 0:
                u = Box.red;
                break;
            case 1:
                u = Box.blue;
                break;
            case 2:
                u = Box.green;
                break;
            case 3:
                u = Box.yellow;
                break;
            case 4:
                u = Box.orange;
                break;
            case 5:
                u = Box.cyan;
                break;
            case 6:
                u = Box.purple;
                break;
        }
        return u;
    };
    Box.red = 0xff0000;
    Box.blue = 0x0000ff;
    Box.green = 0x00ff00;
    Box.yellow = 0xffff00;
    Box.orange = 0xff8800;
    Box.cyan = 0x00ffff;
    Box.purple = 0xff00ff;
    Box.a = 40;
    return Box;
})(egret.Shape);
egret.registerClass(Box,'Box');

/**
 * Created by Lixin on 16/3/17.
 */
class Box extends egret.Shape {
    public static red:number = 0xff0000;
    public static  blue:number = 0x0000ff;
    public static green:number = 0x00ff00;
    public static yellow:number = 0xffff00;
    public static orange:number = 0xff8800;
    public static cyan:number = 0x00ffff;
    public static purple:number = 0xff00ff;
    public static a:number = 40;
    public color:number;
    //索引位置
    public index:any;

    public constructor() {
        super();
        this.color = this.randomColor();
        this.graphics.lineStyle(0.2, 0xffffff);
        this.graphics.beginFill(this.color, 1);
        this.graphics.drawRect(0, 0, Box.a, Box.a);
        this.graphics.endFill();
    }

    public randomColor():number {//随机获得一个枚举颜色
        var i:number = Math.floor(Math.random() * 7);
        var u:number;
        switch (i) {
            case 0 :
                u = Box.red;
                break;
            case 1 :
                u = Box.blue;
                break;
            case 2 :
                u = Box.green;
                break;
            case 3 :
                u = Box.yellow;
                break;
            case 4 :
                u = Box.orange;
                break;
            case 5 :
                u = Box.cyan;
                break;
            case 6 :
                u = Box.purple;
                break;
        }
        return u;
    }

}
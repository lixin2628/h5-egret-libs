/**
 * lixin  _  297145207@qq.com
 *           2015.02.20
 *           @矩形碰撞检测
 * */
module  gg {

    /*
     * 矩形碰撞检测
     * @param _hit1 _hit2  两个碰撞对象
     * @param _hit1_parent _hit2_parent 两个检测对象的父容器
     * @param _area 碰撞区域 0-1 百分比居中碰撞
     * */
    export function L_HitTestToRect(_hit1:egret.DisplayObject,
                                    _hit1_parent:egret.DisplayObject,
                                    _hit2:egret.DisplayObject,
                                    _hit2_parent:egret.DisplayObject,
                                    _area:number = 1) {

        /* var _hit1_parent:egret.DisplayObject = null;
         var _hit2_parent:egret.DisplayObject = null;
         if (_hit1.parent) {
         _hit1_parent = _hit1.parent;
         }
         if (_hit2.parent) {
         _hit2_parent = _hit2.parent;
         }*/

        var rect1:egret.Rectangle = _hit1.getBounds();
        var rect2:egret.Rectangle = _hit2.getBounds();
        var _rect1_add_x:number = 0;
        var _rect1_add_y:number = 0;
        var _rect2_add_x:number = 0;
        var _rect2_add_y:number = 0;
        /*
         * 如果有父类 重新定义坐标
         * */
        if (_hit1_parent) {
            _rect1_add_x = _hit1_parent.x;
            _rect1_add_y = _hit1_parent.y;
        }
        if (_hit2_parent) {
            _rect2_add_x = _hit2_parent.x;
            _rect2_add_y = _hit2_parent.y;
        }
        rect1.width = rect1.width * _area * _hit1.scaleX;
        rect1.height = rect1.height * _area * _hit1.scaleY;
        rect2.width = rect2.width * _area * _hit2.scaleX;
        rect2.height = rect2.height * _area * _hit2.scaleY;
        //当前坐标 +  父容器坐标  +anchor 位移 + 碰撞缩放
        rect1.x = _hit1.x + _rect1_add_x - ( _hit1.anchorOffsetX) + (rect1.width * (1 - _area)) / 2;
        rect1.y = _hit1.y + _rect1_add_y - ( _hit1.anchorOffsetY) + (rect1.height * (1 - _area)) / 2;
        rect2.x = _hit2.x + _rect2_add_x - (_hit2.anchorOffsetY) + (rect2.width * (1 - _area)) / 2;
        rect2.y = _hit2.y + _rect2_add_y - (_hit2.anchorOffsetY) + (rect2.height * (1 - _area)) / 2;
        return rect1.intersects(rect2);
    }
}

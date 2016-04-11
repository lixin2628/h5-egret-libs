/**
 * Created by Lixin on 15/12/21.
 *
 * 数学类扩展
 *
 */
module gg {
    export class ExMath {
        /**
         * Created by Lixin on 15/6/26.
         * 一些常用的数学功能类
         */

        //求出两点距离
        public static dist(point1:any = {x: 0, y: 0}, point2:any = {x: 1, y: 1}):number {
            var dx:number = point1.x - point2.x;
            var dy:number = point1.y - point2.y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        /*
         * 计算两个点：B相对于A的角度
         * */
        public static relativeRadians(pointA:any = {x: 0, y: 0}, pointB:any = {x: 1, y: 2}):number {
            var dx:number = pointA.x - pointB.x;
            var dy:number = pointA.y - pointB.y;
            var radians:number = Math.atan2(dy, dx);//弧度
            return this.radiansToRotate(radians);

        }

        /*
         * 角速度
         * 匀速非常规运动
         * */
        public static rotateSpeed(endPoint:any =
                                  {x: 10, y: 10},
                                  startPoint:any =
                                  {
                                      x: 20, y: 20
                                  },
                                  speed:number = 1):any {
            //
            var angle:number = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
            return {vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed};
        }

        //弧度转换角度
        public static radiansToRotate(ra:number):number {
            return ra * 180 / Math.PI;
        }
    }
}
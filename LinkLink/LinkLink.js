/**
 * Created by Lixin on 16/3/17.
 *
 *      连连看
 *
 */

window.LinkLink = window.LinkLink || {};

window.LinkLink.check = window.LinkLink.check || {};

var link = window.LinkLink;


/**
 * 地图矩阵
 * */

link.matrix = [];
link.jmax = 0;
link.imax = 0;

/**
 * 连通性监测
 *
 *      {point[i,j]}
 *      {point[i,j]}
 *
 * */
link.to = function (p1, p2, matrix) {

    //要返回的路点
    var RoadPoint = [];
    matrix ? this.matrix = matrix : matrix = this.matrix;
    this.imax = matrix.length;
    this.jmax = matrix[0].length;

    /**
     * 地图矩阵不存在
     * */
    if (matrix.length == 0 || matrix == [])throw 'do not has matrix!';
    /**
     * 平行线偏移量
     * */
    var lineIndex;
    /**
     * 处于同一竖排
     * ..........................................
     * */
    if (p1.i == p2.i) {
        console.log('处于同一竖排');
        if (link.check.parallel(p1, p2, false)) {

            RoadPoint = [p1, p2];
            console.log('处于同一竖排，连通', RoadPoint);
            return RoadPoint;
        }
        /**
         * 否则，排查与之平行的线是否可连通
         * */
        else {
            //返回最近且可以连通
            lineIndex = link.check.lineByline(p1, p2, false, true, true);
            //连通(一折)
            if (lineIndex) {
                RoadPoint = [p1, {i: p1.i + lineIndex, j: p1.j}, {i: p2.i + lineIndex, j: p2.j}, p2];
                console.log('水平连通,1折', RoadPoint);
                return RoadPoint;
            }
        }
    }
    /**
     * 处于同一横排
     * ..........................................
     * */
    else if (p1.j == p2.j) {
        console.log('处于同一横排');
        if (link.check.parallel(p1, p2, true)) {
            RoadPoint = [p1, p2];
            console.log('处于同一横排，连通', RoadPoint);
            return RoadPoint;
        }
        /**
         * 平行连通检测
         * */
        else {
            lineIndex = link.check.lineByline(p1, p2, true, true, true);
            if (lineIndex) {
                RoadPoint = [p1, {i: p1.i, j: p1.j + lineIndex}, {i: p2.i, j: p2.j + lineIndex}, p2];
                console.log('垂直连通,1折', RoadPoint);
                return RoadPoint;
            }
        }
    }
    /**
     * 均不相同
     * */
    else {
        console.log('移位搜索');
        /**
         * 矩形补齐
         * */
        var p3 = {i: p1.i, j: p2.j};
        var p4 = {i: p2.i, j: p1.j};

        console.log(p1, p2, p3, p4);

        ////如果两点同时跟某个中间点直接连通，返回
        if ((link.matrix[p3.i][p3.j] == null || link.matrix[p3.i][p3.j] == 0)
            && link.check.parallel(p1, p3, false)
            && link.check.parallel(p2, p3, true)) {
            RoadPoint = [p1, p3, p2];
            console.log('1折', RoadPoint);
            return RoadPoint;
        }
        else if ((link.matrix[p4.i][p4.j] == null || link.matrix[p4.i][p4.j] == 0)
            && link.check.parallel(p1, p4, true)
            && link.check.parallel(p2, p4, false)) {
            RoadPoint = [p1, p4, p2];
            console.log('1折', RoadPoint);
            return RoadPoint;
        }
        /**
         * 分清p1,p2的相对位置关系,做相应处理
         * 处理内部连线
         * */
        /**
         * p1是否位于左侧
         * */
        var leftP = p1.i < p2.i;
        /**
         * p1是否位于上方
         * */
        var topP = p1.j < p2.j;
        /**
         * //返回横向内部连线的最小索引
         * */
        console.log('处理内部连线,2折');
        lineIndex = link.check.innerLine(p1, p2, true, leftP);
        if (lineIndex) {
            RoadPoint = [p1, {i: p1.i + lineIndex, j: p1.j}, {i: p1.i + lineIndex, j: p2.j}, p2];
            console.log('2折', RoadPoint);
            return RoadPoint;
        }
        console.log('处理内部连线,2，2折');
        lineIndex = link.check.innerLine(p1, p2, false, topP);
        if (lineIndex) {
            RoadPoint = [p1, {i: p1.i, j: p1.j + lineIndex}, {i: p2.i, j: p1.j + lineIndex}, p2];
            console.log('2折', RoadPoint);
            return RoadPoint;
        }
        console.log('外部链接');
        /**
         * 外侧连接
         * */
        var xbar1 = 0;
        var ybar1 = 0;
        var xbar2 = 0;
        var ybar2 = 0;

        /**
         * //从p1点水平向外逐行检查，返回能连通的行数
         * */

        console.log('从p1点水平向外逐行检查，返回能连通的行数')
        if ((link.matrix[p3.i][p3.j] == null || link.matrix[p3.i][p3.j] == 0)
            && link.check.parallel(p2, p3, true)) {
            xbar1 = leftP ? link.check.lineByline(p1, p3, false, false, true) : link.check.lineByline(p1, p3, false, true, false);
        }
        /**
         * //从p1点垂直向外逐行检查，返回能连通的行数
         * */

        console.log('从p1点垂直向外逐行检查，返回能连通的行数')
        if ((link.matrix[p4.i][p4.j] == null || link.matrix[p4.i][p4.j] == 0)
            && link.check.parallel(p2, p4, false)) {
            ybar1 = topP ? link.check.lineByline(p1, p4, true, false, true) : link.check.lineByline(p1, p4, true, true, false);
        }
        /**
         * /从p2点垂直向外逐行检查，返回能连通的行数
         * */

        console.log('从p2点垂直向外逐行检查，返回能连通的行数')
        if ((link.matrix[p3.i][p3.j] == null || link.matrix[p3.i][p3.j] == 0)
            && link.check.parallel(p1, p3, false)) {
            ybar2 = topP ? link.check.lineByline(p2, p3, true, true, false) : link.check.lineByline(p2, p3, true, false, true);
        }
        /**
         * 从p1点水平向外逐行检查，返回能连通的行数
         * */

        console.log('从p1点水平向外逐行检查，返回能连通的行数')
        if ((link.matrix[p4.i][p4.j] == null || link.matrix[p4.i][p4.j] == 0)
            && link.check.parallel(p1, p4, true)
        ) {
            xbar2 = leftP ? link.check.lineByline(p2, p4, false, true, false) : link.check.lineByline(p2, p4, false, false, true);
        }

        var min = 100;
        /**
         * 选择最优路线
         * */
        if (xbar1 != 0 && min > Math.abs(xbar1))  min = Math.abs(xbar1);

        if (ybar1 != 0 && min > Math.abs(ybar1))  min = Math.abs(ybar1);

        if (ybar2 != 0 && min > Math.abs(ybar2))  min = Math.abs(ybar2);

        if (xbar2 != 0 && min > Math.abs(xbar2))  min = Math.abs(xbar2);

        console.log('min is !', min);
        if (min != 100) {

            switch (min) {


                case  Math.abs(xbar1):
                    RoadPoint = [p1, {i: p1.i + xbar1, j: p1.j}, {i: p1.i + xbar1, j: p2.j}, p2];
                    console.log('外部连接', RoadPoint);
                    return RoadPoint;

                case Math.abs(ybar1):
                    RoadPoint = [p1, {i: p1.i, j: p1.j + ybar1}, {i: p2.i, j: p1.j + ybar1}, p2];
                    console.log('外部连接', RoadPoint);
                    return RoadPoint;

                case Math.abs(ybar2):
                    RoadPoint = [p2, {i: p2.i, j: p2.j + ybar2}, {i: p1.i, j: p2.j + ybar2}, p1];
                    console.log('外部连接', RoadPoint);
                    return RoadPoint;

                case Math.abs(xbar2):
                    RoadPoint = [p2, {i: p2.i + xbar2, j: p2.j}, {i: p2.i + xbar2, j: p1.j}, p1];
                    console.log('外部连接', RoadPoint);
                    return RoadPoint;

            }
        }

    }
    return false;

};
/**
 * 横排检测
 *      {point[i,j]}
 *      {point[i,j]}
 *      {水平 | 垂直 true Or false}
 * */

link.check.parallel = function (p1, p2, bool) {
    var min = 0;
    var max = 0;
    var i = 0;
    /**
     * 水平检测
     * */
    if (bool) {
        console.log('水平检测', bool);
        if (p1.j != p2.j) throw '.';
        min = Math.min(p1.i, p2.i);
        max = Math.max(p1.i, p2.i);
        console.log(min, max);
        for (i = min + 1; i < max; i++) {
            /**
             * 为空 且 不为0  表示有元素存在
             * */
            if (link.matrix[i][p1.j] != null) return false;
        }
    }
    /**
     * 垂直检测
     * */
    else {
        console.log('垂直检测');
        if (p1.i != p2.i)throw '.';
        min = Math.min(p1.j, p2.j);
        max = Math.max(p1.j, p2.j);
        for (i = min + 1; i < max; i++) {
            if (link.matrix[p1.i][i] != null)return false;
        }
    }
    return true;
};
/**
 * ，排查与之平行的线是否可连通
 *
 * //返回第一对能连通的周边点的索引,不能连通则返回0
 * {p1 , p2}
 * {是否为水平检测}
 * {}
 * */
link.check.lineByline = function (p1, p2, plane, back, forward) {
    var i = 1;//计数
    var tempP1 = {};
    var tempP2 = {};
    /**
     * 水平检测
     * */
    console.log('平行检测');
    if (plane) {
        if (p1.j != p2.j)throw '.   lineByline';

        while (p1.j - i >= 0 || p1.j + i < link.jmax) {
            /**
             *  两侧无法连通 跳出
             * */
            if (!forward && !back)break;
            /**
             * 向前检测
             * */
            if (forward) {
                /**没有超出范围 且格子里没有障碍
                 * */
                if (
                    p1.j - i >= 0
                    && (link.matrix[p1.i][p1.j - i] == null)
                    && (link.matrix[p2.i][p2.j - i] == null)) {
                    //
                    tempP1 = {i: p1.i, j: p1.j - i};
                    tempP2 = {i: p2.i, j: p2.j - i};
                    /**
                     * */
                    if (link.check.parallel(tempP1, tempP2, true)) {
                        return -i;
                    }
                }
                else forward = false;
            }
            /**
             * 向后检测
             * */
            if (back) {
                if (
                    p1.j + i < link.jmax
                    && (link.matrix[p1.i][p1.j + i] == null)
                    && (link.matrix[p2.i][p2.j + i] == null)) {
                    //
                    tempP1 = {i: p1.i, j: p1.j + i};
                    tempP2 = {i: p2.i, j: p2.j + i};

                    if (link.check.parallel(tempP1, tempP2, true)) {
                        return i;
                    }

                }
                else back = false;
            }
            i++;
        }

    }
    else
    /**
     * 垂直检测
     * */
    {
        if (p1.i != p2.i) throw '.   lineByline';
        while (p1.i - i >= 0 || p1.i + i < link.imax) {
            if (!forward && !back)break;
            //
            if (forward) {
                if (p1.i - i >= 0
                    && (link.matrix[p1.i - i][p1.j] == null)
                    && (link.matrix[p2.i - i][p2.j] == null)) {
                    ///
                    tempP1 = {i: p1.i - i, j: p1.j};
                    tempP2 = {i: p2.i - i, j: p2.j};
                    if (link.check.parallel(tempP1, tempP2, false)) {
                        return -i;
                    }
                }
                else forward = false;
            }
            if (back) {
                if (p1.i + i < link.imax
                    && (link.matrix[p1.i + i][p1.j] == null)
                    && (link.matrix[p2.i + i][p2.j] == null )
                ) {
                    ///
                    tempP1 = {i: p1.i + i, j: p1.j};
                    tempP2 = {i: p2.i + i, j: p2.j};
                    if (link.check.parallel(tempP1, tempP2, false)) {
                        return i;
                    }
                }
                else back = false;
            }
            i++;
        }

    }

    return 0;
};
/**
 * 检查交错的两点之间是否可以内部连线
 * {p1, p2 }
 * {是否水平}
 * {是否返回最短路径}
 * */
link.check.innerLine = function (p1, p2, plane, small) {

    //步长
    var step = small ? 1 : -1;

    //p1发出的线路是否无障碍
    var p1go = true;
    //p2发出的线路是否无障碍
    var p2go = true;

    var temp = 0;
    var temp1 = plane ? p1.i : p1.j;
    var temp2 = plane ? p2.i : p2.j;

    while (true) {
        if (p1go) {
            temp = temp1 + step;
            if ((plane ? link.matrix[temp][p1.j] : link.matrix[p1.i][temp]) == null
            ) {

                temp1 = temp;

                if (temp1 == temp2) {
                    if (link.check.parallel(
                            plane ? {i: temp1, j: p1.j} : {i: p1.i, j: temp1},

                            plane ? {i: temp1, j: p2.j} : {i: p2.i, j: temp1},
                            !plane)) {

                        return temp1 - (plane ? p1.i : p1.j);
                    }
                    else return 0;
                }
            }

            else p1go = false;
        }


        /////////////////////


        if (p2go) {
            temp = temp2 - step;
            if ((plane ? link.matrix[temp][p2.j] : link.matrix[p2.i][temp]) == null) {

                temp2 = temp;

                if (temp1 == temp2) {
                    if (link.check.parallel(
                            plane ? {i: temp2, j: p1.j} : {i: p1.i, j: temp2},
                            plane ? {i: temp2, j: p2.j} : {i: p1.i, j: temp1},
                            !plane
                        )) {

                        return temp2 - (plane ? p1.i : p1.j);
                    }
                    else return 0;
                }
            }
            else p2go = false;

        }
        if (!p1go && !p2go) break;
    }
    return 0;
}
;
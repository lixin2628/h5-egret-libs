/**
 * Created by Lixin on 15/12/21.
 *
 * egret 项目模板
 *
 *       工具
 */
module gg {
    export class Tools {
        /**
         * 绘制一个矩形
         * param:
         * 宽度|高度|颜色|透明度|描边尺寸|描边颜色|描边透明度
         * **/
        static drawRect(_w:number, _h:number, _c:number, _a:number = 1, s:number = 0, sc:number = 0xffffff, sca:number = 1) {
            var _shp:egret.Shape = new egret.Shape();
            _shp.graphics.beginFill(_c, _a);
            if (s > 0)_shp.graphics.lineStyle(s, sc);
            _shp.graphics.drawRect(0, 0, _w, _h);
            _shp.graphics.endFill();
            return _shp;
        }

        /**
         *绘制一个圆角矩形
         * param :
         * 宽度|高度|颜色|透明度|圆角宽|圆角高|描边尺寸|描边颜色|描边透明度
         * **/
        static drawRoundRect(_w:number, _h:number, _c:number, _a:number, ew:number, eh:number, s:number = 0, sc:number = 0xffffff, sca:number = 1) {
            var _shp:egret.Shape = new egret.Shape();
            _shp.graphics.beginFill(_c, _a);
            if (s > 0)_shp.graphics.lineStyle(s, sc);
            _shp.graphics.drawRoundRect(0, 0, _w, _h, ew, eh);
            _shp.graphics.endFill();
            return _shp;
        }

        /**
         * 生成base64 格式的 canvas 快照
         * */
        static saveCanvas() {
            var canvas = document.getElementsByTagName('canvas')[0];
            return canvas.toDataURL();
        }


        /**
         gg.Tools.GET('admin/pushData.php', {
            age: 100,
            height: 100,
            weight: 100,
            waist: 100,
            answer: 'A,B,C,D,E,G,F,100'
        }, function (data) {
            console.log(data)
        });
         * */
        /**
         * get请求
         * */
        static GET(url:string, par:any, cb:Function) {
            var httpClient = new XMLHttpRequest();
            if (par) {

                for (var i in par) {
                    url += url.indexOf('?') > 0 ? '&' : '?';
                    url += i + '=' + par[i];
                }
            }
            console.log(url);


            httpClient.open("GET", url, true);
            var self = this;
            httpClient.onreadystatechange = function () {
                if (httpClient.readyState == 4 && (httpClient.status >= 200 && httpClient.status <= 207)) {
                    var callbackParams = httpClient.responseText;
                    if (cb)cb(callbackParams)
                }
            }
            httpClient.send();
        }

        /**
         * 数字排序

         *由大到小
         *
         * */
        static  numberSort(list:any[]):any {
            var temp;
            for (var i = 0; i < list.length; i++) {
                for (var j = 0; j < list.length - i - 1; j++) {
                    if (list[j] < list[j + 1]) {
                        temp = list[j];
                        list[j] = list[j + 1];
                        list[j + 1] = temp;
                    }
                }
            }
            return list;
        }

        /**
         * http post方式请求
         * @param query 请求的绝对路径
         * @param args post的data
         * @param callback 请求的回调方法
         * @param target 回调方法绑定的对象
         * @param params 额外的需要透传回来的参数
         * @param isSync 是否同步（默认否）
         *Events.httpPost(Config.api_href, "token=" + Config.token + "&phone=" + data.phone + "&name=" + data.name, function (data) {})
         */
        static httpPost(query, args, callback, target, params = null, isSync = false) {
            var httpClient = new XMLHttpRequest();
            var url = query + ( query.indexOf("?") < 0 ? "?" : "&") + "_=" + new Date().getTime();
            httpClient.open("POST", url, isSync == true ? false : true);
            httpClient.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            httpClient.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            var self = this;
            httpClient.onreadystatechange = function () {
                //alert(httpClient.readyState);
                if (httpClient.readyState == 4 && (httpClient.status >= 200 && httpClient.status <= 207)) {
                    var callbackParams = [httpClient.responseText];
                    if (params) {
                        callbackParams.push(params);
                    }
                    callback.apply(target, callbackParams);
                }
            }
            httpClient.send(args);

        }
    }
}
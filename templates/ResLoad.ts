/**
 * Created by Lixin on 15/9/13.
 *
 * 组资源加载器
 */
module gg {
    export class ResLoad {

        //当前加载组的名称
        public static currentLoadGroupName:string = "";
        //进度回调函数
        public static progressFunction:Function = null;
        //加载完成回调
        public static completeFunction:Function = null;

        public static loadQue:string[] = [];
        //当前加载的位置
        public static loadNum:number = 0;
        /**
         * 缓存已经加载过的资源组
         * **/
        public static cacheList:any = {};

        public static configIsLoad:boolean = false;

        public static load(_groupName:any, progress:Function, complete:Function) {


            if (!this.configIsLoad) {

                var self:any = this;
                this.loadConfig(function () {
                    self.configIsLoad = true;
                    self.load(_groupName, progress, complete);
                });
                return;
            }

            //加载配置文件

            if (typeof _groupName == "Array") {
                //组资源加载
                this.loadQue = _groupName;
                this.currentLoadGroupName = this.loadQue[0];
                this.loadNum = 0;
            } else {
                this.currentLoadGroupName = _groupName;
            }
            this.progressFunction = progress;
            this.completeFunction = complete;
            //
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup(_groupName);

        }

        /**
         * 加载配置文件
         * **/
        //配置文件加载完成回调
        private static configLoadEndCallBack:Function;

        public static loadConfig(_cb:Function) {
            this.configLoadEndCallBack = _cb;
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.loadConfig("resource/resource.json", "resource/");
        }

        public static onConfigComplete(e:RES.ResourceEvent) {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            this.configLoadEndCallBack();
        }

        /**
         * preload资源组加载完成
         * Preload resource group is loaded
         */
        public static onResourceLoadComplete(event:RES.ResourceEvent):void {
            if (event.groupName == ResLoad.currentLoadGroupName) {
                if (this.completeFunction != null)this.completeFunction(this.currentLoadGroupName);
                this.cacheList[this.currentLoadGroupName] = true;
                //查看是否有其他资源需要加载
                if (this.loadNum < this.loadQue.length - 1) {
                    this.load(this.loadQue[this.loadNum + 1], this.progressFunction, this.completeFunction);
                    this.loadNum += 1;
                } else {
                    //清空资源组
                    this.loadQue = [];
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                    RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                }
            }
        }

        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        public static onResourceLoadError(event:RES.ResourceEvent):void {
            //TODO
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //Ignore the loading failed projects
            this.onResourceLoadComplete(event);
        }

        /**
         * preload资源组加载进度
         * Loading process of preload resource group
         */
        public static onResourceProgress(event:RES.ResourceEvent):void {
            var loadprogress:number = Math.floor((Number(event.itemsLoaded) / Number(event.itemsTotal)) * 100);
            //回调组资源进度
            if (this.progressFunction != null)
                this.progressFunction({
                    loadprogress: loadprogress,
                    groupname: this.currentLoadGroupName
                });
        }

    }
}

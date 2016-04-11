/**
 * Created by Lixin on 15/11/7.
 * 用户选择了列表项
 */
class ColumnButtonEvent extends egret.Event {


    public static SELECT:string = 'columentButtonSelect';

    public selectName:any;
    public selectTarget;

    public constructor(targetName:string, selectTarget) {
        super(ColumnButtonEvent.SELECT, false, false);
        this.selectName = targetName;
        this.selectTarget = selectTarget;
    }
}
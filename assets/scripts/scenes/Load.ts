import { _decorator, Component, director, Label, Node, ProgressBar, resources } from 'cc';
import { PathEnums } from '../enums/PathEnums';
const { ccclass, property } = _decorator;

@ccclass('Load')
export class Load extends Component {
    @property(ProgressBar)
    progressBar: ProgressBar = null;

    @property(Label)
    Progress: Label = null;

    @property(Label)
    Tips: Label = null;

    onLoad(): void {
        this.loadLocalConfigData();
    }

    loadLocalConfigData(): void {
        this.progressBar.progress = 0;
        this.Tips.string = "游戏配置加载中...";
        resources.loadDir(PathEnums.CONFIG_PATH, (completedCount: number, totalCount: number, item: any) => {
            const progress = completedCount / totalCount;
            this.progressBar.progress = progress;
            this.Progress.string = `Loading... ${(progress * 100).toFixed(0)}%`;
        }, (err: Error, assets: any[]) => {
            this.initData();
            this.preLoadSene();
        });
    }

    initData() {
        
    }

    preLoadSene() {
        this.progressBar.progress = 0;
        this.Tips.string = "游戏场景加载中...";
        director.preloadScene("main", (completedCount: number, totalCount: number, item: any) => {
            const progress = completedCount / totalCount;
            this.progressBar.progress = progress;
            this.Progress.string = `Loading... ${(progress * 100).toFixed(0)}%`;
        }, (err: Error) => { 
        });
    }
}



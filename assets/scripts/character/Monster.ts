import { _decorator, Component, Node, sp } from 'cc';
import { Character, ICharacter } from './Character';
import { ResourceManage } from '../manage/ResourceManage';
import { SpinePathEnums } from '../enums/SpinePathEnums';
import { MonsterSpineAnimationEnum } from '../consts/MonsterConsts';
const { ccclass, property } = _decorator;

@ccclass('Monster')
export class Monster extends Character {

    @property(sp.Skeleton)
    characterSkeleton: sp.Skeleton = null

    _posX = 0;

    _posY = 0;

    _getSkeletonFromCache(sourceName: string): sp.SkeletonData | null {
        const skeletonData = ResourceManage.instance.getDirResourceByName<sp.SkeletonData>(SpinePathEnums.MONSTER_SPINE_PATH, sourceName);
        return skeletonData || null;
    }

    init(characterData: ICharacter) {
        super.init(characterData);
        // 播放待机动画
        if (this.characterSkeleton) {
            this.characterSkeleton.skeletonData = this._getSkeletonFromCache(characterData.name);
            this.characterSkeleton.setAnimation(0, MonsterSpineAnimationEnum.Run, true)
        }
    }
    move(dt: number) {
        const distance = this.characterData.speed * dt * 5;
        const currentPos = this.node.getPosition();
        this._posX = currentPos.x;
        this._posY = currentPos.y - distance;
        this.node.setPosition(this._posX, this._posY);
    }

}



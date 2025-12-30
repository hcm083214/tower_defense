import { _decorator, Component, Graphics, Node, sp } from 'cc';
import { Character, ICharacter } from './Character';
import { ResourceManage } from '../manage/ResourceManage';
import { SpinePathEnums } from '../enums/SpinePathEnums';
import { HeroSpineAnimationEnum } from '../consts/HeroConsts';
const { ccclass, property } = _decorator;

interface SkillData {
    id: string;
    name: string;
    cost: number;        // 技力消耗
    duration: number;    // 持续时间（秒）
    recoveryRate: number; // 回复技力速度（每秒）
    effect: (target: Character) => void;
}



@ccclass('Hero')
export class Hero extends Character {

    @property(sp.Skeleton)
    characterSkeleton: sp.Skeleton = null

    @property
    public skillPoints: number = 0;

    @property
    public maxSkillPoints: number = 100;

    @property
    public currentSkill: SkillData | null = null;

    @property(Node)
    attackRange: Node = null;

    _getSkeletonFromCache(sourceName: string): sp.SkeletonData | null {
        const skeletonData = ResourceManage.instance.getDirResourceByName<sp.SkeletonData>(SpinePathEnums.HERO_SPINE_PATH, sourceName);
        return skeletonData || null;
    }

    init(characterData: ICharacter, skillData?: SkillData) {
        super.init(characterData);
        // 播放待机动画
        if (this.characterSkeleton) {
            this.characterSkeleton.skeletonData = this._getSkeletonFromCache(characterData.name);
            this.characterSkeleton.setAnimation(0, HeroSpineAnimationEnum.Idle, true)
        }
        this.currentSkill = skillData;
    }

    onLoad(): void {
        this.createHeroAttackRange();
    }
    update(dt: number) {
        // 自动回复技力
        // this.skillPoints += dt * this.currentSkill.recoveryRate;
        // this.skillPoints = Math.min(this.skillPoints, this.maxSkillPoints);
    }
    createHeroAttackRange() {
        const graphics = this.attackRange.getComponent(Graphics);
    }
    useSkill() {

    }
}



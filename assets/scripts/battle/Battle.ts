import { _decorator, Component, Node, Prefab, instantiate, sp, SpriteFrame } from 'cc';
import { Character, ICharacter, CharacterType } from '../character/Character';

import { ResourceManage } from '../manage/ResourceManage';
import { HeroConfig } from '../consts/HeroConsts';
import { MonsterConfig } from '../consts/MonsterConsts';
import { SpinePathEnums } from '../enums/SpinePathEnums';
const { ccclass, property } = _decorator;

export interface IBattleSceneConfig {
    towerMaxHp: number;
    heroCount: number;
    monsterCount: number;
    // 其他战斗场景配置项
}

@ccclass('Battle')
export class Battle extends Component {

    @property(Prefab)
    heroPrefab: Prefab = null;

    @property(Prefab)
    monsterPrefab: Prefab = null;

    @property(Node)
    heroContainer: Node = null;

    @property(Node)
    monsterContainer: Node = null;

    @property(Node)
    heroCardContainer: Node = null;



    private heroes: Character[] = [];
    private monsters: Character[] = [];

    async loadScene(sourcePath: string[], sceneConfig: IBattleSceneConfig) {

    }

    async start() {
        await this.prepareBattle();
        this.generateCharacters();
        // this.startBattle();
    }

    // BattleManager.ts 或类似的战斗管理脚本中
    async prepareBattle() {
        // 收集所有需要的骨骼资源路径
        await ResourceManage.instance.loadDirResources('images/hero', SpriteFrame);
        await ResourceManage.instance.loadDirResources(SpinePathEnums.HERO_SPINE_PATH, sp.SkeletonData);
        await ResourceManage.instance.loadDirResources(SpinePathEnums.MONSTER_SPINE_PATH, sp.SkeletonData);
    }
    update(deltaTime: number) {

    }

    // 根据数据生成角色和怪物
    async generateCharacters() {
        // 英雄数据

        for (const heroKey in HeroConfig) {
            const heroNode = instantiate(this.heroPrefab);
            heroNode.parent = this.heroContainer;
            const hero = heroNode.getComponent(Character);
            hero.init(HeroConfig[heroKey]);
            this.heroes.push(hero);
        }

        for (const key in MonsterConfig) {
            const monsterNode = instantiate(this.monsterPrefab);
            monsterNode.parent = this.monsterContainer;
            const monster = monsterNode.getComponent(Character);
            monster.init(MonsterConfig[key]);
            this.monsters.push(monster);
        }
    }


}



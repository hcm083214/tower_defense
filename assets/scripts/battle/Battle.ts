import { _decorator, Component, Node, Prefab, instantiate, sp, SpriteFrame } from 'cc';
import { Character, ICharacter, CharacterType } from '../character/Character';

import { ResourceManage } from '../manage/ResourceManage';
import { HeroConfig } from '../consts/HeroConsts';
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
        await ResourceManage.instance.loadDirResources('spine/hero', sp.SkeletonData);
    }
    update(deltaTime: number) {

    }

    // 根据数据生成角色和怪物
    async generateCharacters() {
        // 英雄数据


        // 怪物数据
        const monsterDataList: ICharacter[] = [
            {
                type: CharacterType.Monster,
                name: "哥布林",
                level: 1,
                hp: 60,
                attack: 15,
                defense: 3,
                speed: 4,
                dodge: 3,
                hit: 80,
                skeleton: null,
                characterIcon: null,
                row: 1,
                col: 1,
                range: 1

            },
            {
                type: CharacterType.Monster,
                name: "史莱姆",
                level: 1,
                hp: 50,
                attack: 10,
                defense: 8,
                speed: 3,
                dodge: 10,
                hit: 75,
                skeleton: null,
                characterIcon: null,
                row: 1,
                col: 5,
                range: 1
            }
        ];

        for (const heroKey in HeroConfig) {
            console.log("🚀 ~ Battle ~ generateCharacters ~ heroKey:", heroKey)
            const heroNode = instantiate(this.heroPrefab);
            heroNode.parent = this.heroContainer;
            const hero = heroNode.getComponent(Character);
            hero.init(HeroConfig[heroKey]);
            this.heroes.push(hero);
        }



        // 创建怪物
        for (let i = 0; i < monsterDataList.length; i++) {
            const monsterNode = instantiate(this.monsterPrefab);
            monsterNode.parent = this.monsterContainer;
            const monster = monsterNode.getComponent(Character);
            monster.init(monsterDataList[i]);
            this.monsters.push(monster);
        }
    }


}



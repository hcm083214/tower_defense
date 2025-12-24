import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { Character, ICharacter, CharacterType } from '../character/Character';

import { CharacterResourceManage } from '../manage/CharacterResourceManage';
import { MonsterSpinePathEnum } from '../enums/spine/MonsterSpineEnum';
import { HeroConfig, HeroSpinePathEnum } from '../consts/HeroConsts';
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
        await CharacterResourceManage.preloadSkeletons([
            HeroSpinePathEnum.archer_path,
            HeroSpinePathEnum.warrior_path,
            HeroSpinePathEnum.tank_path,
            HeroSpinePathEnum.mage_path,
            MonsterSpinePathEnum.MONSTER_1_Path,
            MonsterSpinePathEnum.MONSTER_2_Path,
        ]);
        this.generateCharacters();
        // this.startBattle();
    }

    // BattleManager.ts 或类似的战斗管理脚本中
    async prepareBattle(characters: ICharacter[]) {
        // 收集所有需要的骨骼资源路径
        const skeletonPaths = characters
            .map(character => character.skeletonPath)
            .filter(path => path !== undefined) as string[];

        // 预加载所有骨骼资源
        try {
            await CharacterResourceManage.preloadSkeletons(skeletonPaths);
            console.log('All skeleton resources loaded successfully');
        } catch (error) {
            console.error('Failed to preload skeleton resources:', error);
        }
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
                skeletonPath: MonsterSpinePathEnum.MONSTER_1_Path,
                skeleton: null,
                characterIconPath: "",
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
                skeletonPath: MonsterSpinePathEnum.MONSTER_2_Path,
                skeleton: null,
                characterIconPath: "",
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
            await hero.init(HeroConfig[heroKey]);
            this.heroes.push(hero);
        }
        
        

        // 创建怪物
        for (let i = 0; i < monsterDataList.length; i++) {
            const monsterNode = instantiate(this.monsterPrefab);
            monsterNode.parent = this.monsterContainer;
            const monster = monsterNode.getComponent(Character);
            await monster.init(monsterDataList[i]);
            this.monsters.push(monster);
        }
    }


}



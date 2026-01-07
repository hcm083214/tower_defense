import { _decorator, Component, Node, Prefab, resources, sp, view } from 'cc';
import { ResourceManage } from '../manage/ResourceManage'; // 根据实际路径调整
import GameConfig from '../config/GameConfig';

const { ccclass, property } = _decorator;

export enum CharacterType {
    Hero = 0,
    Monster = 1,
}

export interface ICharacter {
    type: CharacterType; // 类型
    name: string; // 名字
    level: number; // 等级
    row: number; // X
    col: number; // Y
    hp: number; // 生命值
    maxHp?: number; // 最大生命值
    attack: number; // 攻击
    defense: number; // 防御
    speed: number; // 速度
    range: number; // 攻击范围
    dodge: number; // 闪避
    hit: number; // 命中
    skeleton: sp.Skeleton; // 骨骼组件
    characterIcon: string; // 角色图标
}

@ccclass('Character')
export class Character extends Component {

    
    @property(Prefab)
    hpBar: Prefab = null;

    characterData: ICharacter = null;

    

    init(characterData: ICharacter) {
        this.characterData = {
            ...characterData,
            maxHp: characterData.hp,
        };
        // 设置角色名称
        this.node.name = characterData.name;
        this.setNodePosition(characterData.row, characterData.col);
        

        
    }

    setNodePosition(row: number, col: number) {

        // 参数边界检查
        if (typeof row !== 'number' || typeof col !== 'number') {
            console.warn('Invalid grid coordinates:', row, col);
            return;
        }

        const GRID_OFFSET = GameConfig.GRID_WIDTH / 2; // 网格中心偏移量，使用网格宽度的一半以保证一致性

        // 场景左下角（相对于屏幕中心）
        const sceneStartX = -GameConfig.BATTLE_SCENE_WIDTH / 2;
        const sceneStartY = GameConfig.BATTLE_SCENE_OFFSET_Y;

        const posX = sceneStartX + (col - 1) * GameConfig.GRID_WIDTH + GRID_OFFSET;
        const posY = sceneStartY - row * GameConfig.GRID_HEIGHT + GRID_OFFSET;

        this.node.setPosition(posX, posY, 0);
    }


    // 获取角色数据
    get data(): ICharacter {
        return this.characterData;
    }

    // 受伤
    takeDamage(damage: number): number {
        const actualDamage = Math.max(1, damage);
        this.characterData.hp = Math.max(0, this.characterData.hp - actualDamage);
        return actualDamage;
    }

    // 是否存活
    isAlive(): boolean {
        return this.characterData.hp > 0;
    }

}



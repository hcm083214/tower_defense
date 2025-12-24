import { CharacterType, ICharacter } from "../character/Character";

export enum HeroName {
    mage = 'mage', // 法师
    archer = 'archer', // 弓箭手
    warrior = 'warrior', // 战士
    tank = 'tank' // 坦克
}
export enum HeroSpinePathEnum {
    mage_path = 'spine/hero/dfs',
    archer_path = 'spine/hero/fzjl',
    warrior_path = 'spine/hero/hn',
    tank_path = 'spine/hero/kbsm'
}

export enum HeroIconPathEnum {
    mage_path = 'images/hero/dfs',
    archer_path = 'images/hero/fzjl',
    warrior_path = 'images/hero/hn',
    tank_path = 'images/hero/kbsm'
}

export enum HeroSpineAnimationEnum {
    Idle = 'animation',
    Attack = 'jn1',
    Walk = 'jn2',
    Die = 'die',
    Hurt = 'hurt',
    Run = 'run',
}

// 英雄配置接口，键为 HeroName 中的所有值，值为 ICharacter
export type IHeroConfig = {
    [K in HeroName]: ICharacter;
}

export const HeroConfig: IHeroConfig = {
    [HeroName.mage]: {
        type: CharacterType.Hero,
        name: HeroName.mage,
        level: 1,
        hp: 100,
        attack: 20,
        defense: 10,
        speed: 5,
        dodge: 5,
        hit: 90,
        skeletonPath: HeroSpinePathEnum.mage_path,
        skeleton: null,
        characterIconPath: HeroIconPathEnum.mage_path,
        row: 2,
        col: 1,
        range: 1
    },
    [HeroName.archer]: {
        type: CharacterType.Hero,
        name: HeroName.archer,
        level: 1,
        hp: 80,
        attack: 25,
        defense: 5,
        speed: 7,
        dodge: 8,
        hit: 85,
        skeletonPath: HeroSpinePathEnum.archer_path,
        skeleton: null,
        characterIconPath: HeroIconPathEnum.archer_path,
        row: 2,
        col: 2,
        range: 1
    },
    [HeroName.warrior]: {
        type: CharacterType.Hero,
        name: HeroName.warrior,
        level: 1,
        hp: 100,
        attack: 20,
        defense: 10,
        speed: 5,
        dodge: 5,
        hit: 90,
        skeletonPath: HeroSpinePathEnum.warrior_path,
        skeleton: null,
        characterIconPath: HeroIconPathEnum.warrior_path,
        row: 2,
        col: 3,
        range: 1
    },
    [HeroName.tank]: {
        type: CharacterType.Hero,
        name: HeroName.tank,
        level: 1,
        hp: 100,
        attack: 20,
        defense: 10,
        speed: 5,
        dodge: 5,
        hit: 90,
        skeletonPath: HeroSpinePathEnum.tank_path,
        skeleton: null,
        characterIconPath: HeroIconPathEnum.tank_path,
        row: 2,
        col: 4,
        range: 1
    }
};



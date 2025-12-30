import { CharacterType, ICharacter } from "../character/Character";

export enum MonsterName {
    goblin = "10001",
    orc = "10002",
}

export enum MonsterSpineAnimationEnum {
    Attack = "atk",
    Die = "die",
    Hit = "hit",
    Run = "run",
}

export type IMonsterConfig = {
    [K in MonsterName]: ICharacter;
}

export const MonsterConfig: IMonsterConfig = {
    [MonsterName.goblin]: {
        type: CharacterType.Monster,
        name: MonsterName.goblin,
        level: 1,
        hp: 100,
        attack: 20,
        defense: 10,
        speed: 5,
        dodge: 5,
        hit: 90,
        skeleton: null,
        characterIcon: null,
        row: 1,
        col: 1,
        range: 1
    },
    [MonsterName.orc]: {
        type: CharacterType.Monster,
        name: MonsterName.orc,
        level: 1,
        hp: 100,
        attack: 20,
        defense: 10,
        speed: 5,
        dodge: 5,
        hit: 90,
        skeleton: null,
        characterIcon: null,
        row: 1,
        col: 2,
        range: 1
    }
}

import { _decorator, Component, Node, sp } from 'cc';
import { Character, ICharacter } from './Character';
const { ccclass, property } = _decorator;

@ccclass('Monster')
export class Monster extends Character {

    _posX = 0;

    _posY = 0;

    init(characterData: ICharacter) {
        super.init(characterData);
    }
    move(dt: number) {
        const distance = this.characterData.speed * dt * 5;
        const currentPos = this.node.getPosition();
        this._posX = currentPos.x;
        this._posY = currentPos.y - distance;
        this.node.setPosition(this._posX, this._posY);
    }

}



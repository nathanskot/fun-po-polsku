import { Declension } from "./declension";
import { WordType } from "./word-type.type";

export class Word {

  constructor(public str: string,
              public translation: string,
              public type: WordType,
              public declension: Declension) {}

  toString(): string {
    return `
      ${this.str} (${this.type}): ${this.translation}\n
      ${this.declension}
    `;
  }
}

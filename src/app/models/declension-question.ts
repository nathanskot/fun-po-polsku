import { DECLENSION_DEFAULT_CHOICE_AMOUNT } from "../app.constants";
import { CaseType } from "./case-type.type";
import { GrammaticalNumber } from "./grammatical-number.type";
import { Word } from "./word";

export class DeclensionQuestion {

  choices: {
    caseType: CaseType,
    number: GrammaticalNumber
  }[] = [];
  answer: {
    caseType: CaseType,
    number: GrammaticalNumber
  };

  constructor(public word: Word, selectedCaseTypes: CaseType[]) {
    let inflectedWords: string[] = [];

    for (let i = 0; i < DECLENSION_DEFAULT_CHOICE_AMOUNT; i++) {
      let choiceCaseType: CaseType;
      let choiceNumber: GrammaticalNumber;
      let choiceInflectedWord: string;

      do {
        choiceCaseType = selectedCaseTypes[Math.floor(Math.random() * selectedCaseTypes.length)];
        choiceNumber = Math.random() < 0.5 ? 'singular' : 'plural' as GrammaticalNumber;
        choiceInflectedWord = word.getInflectedWord(choiceCaseType, choiceNumber);
      } while (inflectedWords.includes(choiceInflectedWord));

      this.choices.push({
        caseType: choiceCaseType,
        number: choiceNumber
      });

      inflectedWords.push(choiceInflectedWord);
    }

    this.answer = this.choices[Math.floor(Math.random() * this.choices.length)];
  }
}

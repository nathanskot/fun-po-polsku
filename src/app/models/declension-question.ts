import { CASE_TYPE_AMOUNT, DECLENSION_DEFAULT_CHOICE_AMOUNT } from "../app.constants";
import { randomize } from "../app.utils";
import { CaseType, caseTypeLabels } from "./case-type.type";
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

    this.answer = {
      caseType: selectedCaseTypes[Math.floor(Math.random() * selectedCaseTypes.length)],
      number: Math.random() < 0.5 ? 'singular' : 'plural'
    }
    this.choices.push(this.answer);

    for (let i = 0; i < DECLENSION_DEFAULT_CHOICE_AMOUNT - 1; i++) {
      let choiceCaseType: CaseType;
      let choiceNumber: GrammaticalNumber;
      let choiceInflectedWord: string;

      do {
        choiceCaseType = Object.values(caseTypeLabels)[Math.floor(Math.random() * CASE_TYPE_AMOUNT)];
        choiceNumber = Math.random() < 0.5 ? 'singular' : 'plural' as GrammaticalNumber;
        choiceInflectedWord = word.getInflectedWord(choiceCaseType, choiceNumber);
      } while (inflectedWords.includes(choiceInflectedWord));

      this.choices.push({
        caseType: choiceCaseType,
        number: choiceNumber
      });

      inflectedWords.push(choiceInflectedWord);
    }

    this.choices = randomize(this.choices);
  }
}

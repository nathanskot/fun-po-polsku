import { CaseType } from "./case-type.type";
import { GrammaticalNumber } from "./grammatical-number.type";

export class CaseDeclension {

  private _caseType!: CaseType;

  constructor(public singular: string,
              public plural: string) {}

  getCaseType(): CaseType {
    return this._caseType;
  }

  setCaseType(caseType: CaseType): void {
    this._caseType = caseType;
  }

  getInflection(number: GrammaticalNumber): string {
    if (number === 'singular')
      return this.singular;
    else
      return this.plural;
  }
}

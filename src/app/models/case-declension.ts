import { CaseType } from "./case-type.type";

export class CaseDeclension {

  private _caseType?: CaseType;

  constructor(public singular: string,
              public plural: string) {}

  setCaseType(caseType: CaseType): void {
    this._caseType = caseType;
  }
}

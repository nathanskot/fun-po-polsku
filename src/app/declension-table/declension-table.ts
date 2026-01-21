import { Component, input } from '@angular/core';
import { Word } from '../models/word';
import { CaseType, caseTypeLabels } from '../models/case-type.type';
import { TitleCasePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-declension-table',
  imports: [
    TitleCasePipe,
    MatTableModule,
  ],
  templateUrl: './declension-table.html',
  styleUrl: './declension-table.scss',
})
export class DeclensionTable {

  word = input.required<Word>();
  
  caseTypes: CaseType[] = Object.values(caseTypeLabels);
}

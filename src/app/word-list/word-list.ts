import { Component, input } from '@angular/core';
import { Word } from '../models/word';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DeclensionTable } from '../declension-table/declension-table';

@Component({
  selector: 'app-word-list',
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    DeclensionTable
  ],
  templateUrl: './word-list.html',
  styleUrl: './word-list.scss',
})
export class WordList {

  words = input.required<Word[]>();

  areDeclensionsShown = true;
  showHideDeclensionText = 'Hide declensions';
  
  onToggleShowDeclensions(): void {
    if (this.areDeclensionsShown) {
      this.showHideDeclensionText = 'Show declensions';
    } else {
      this.showHideDeclensionText = 'Hide declensions';
    }

    this.areDeclensionsShown = !this.areDeclensionsShown;
  }
}

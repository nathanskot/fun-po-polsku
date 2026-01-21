import { Component, input } from '@angular/core';
import { Word } from '../models/word';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DeclensionTable } from '../declension-table/declension-table';
import { DictionaryService } from '../services/dictionary.service';

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

  areDeclensionsShown = false;
  showHideDeclensionText = 'Show declensions';

  constructor(private dictionaryService: DictionaryService) {}
  
  onToggleShowDeclensions(): void {
    if (this.areDeclensionsShown) {
      this.showHideDeclensionText = 'Show declensions';
    } else {
      this.showHideDeclensionText = 'Hide declensions';
    }

    this.areDeclensionsShown = !this.areDeclensionsShown;
  }

  onToggleSaveWord(word: Word): void {
    if (this.isSaved(word))
      this.dictionaryService.unsaveWord(word.title);
    else
      this.dictionaryService.saveWord(word.title);
  }

  isSaved(word: Word): boolean {
    return this.dictionaryService.isSaved(word.title);
  }
}

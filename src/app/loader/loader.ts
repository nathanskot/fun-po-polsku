import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [
    AsyncPipe,
    MatProgressSpinnerModule
  ],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {

  loading$!: Observable<boolean>;

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loading$ = this.loaderService.loading$;
  }
}

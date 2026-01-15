import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [
    MatButtonModule
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {

  constructor(private router: Router) {}

  onPlay(): void {
    this.router.navigateByUrl('declension');
  }
}

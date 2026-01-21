import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule
],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  shrinked: boolean = false;

  onToggleShrink() {
    this.shrinked = !this.shrinked;
  }
}

import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatButtonModule
],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  shrinked: boolean = false;

  onShrink() {
    this.shrinked = !this.shrinked;
  }
}

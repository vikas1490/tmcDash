import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  showSidebar: boolean = true;
  constructor() {}

  ngOnInit(): void {}
  sidebarToggle() {
    console.log('hi');
    this.showSidebar = !this.showSidebar;
  }
}

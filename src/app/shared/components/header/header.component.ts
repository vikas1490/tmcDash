import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AddTripsComponent } from '../add-trips/add-trips.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarDrawer: EventEmitter<any> = new EventEmitter();
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  openDialog() {
    const dialogRef = this.dialog.open(AddTripsComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toggleSidebar() {
    console.log('hi');
    this.toggleSidebarDrawer.emit();
  }
}

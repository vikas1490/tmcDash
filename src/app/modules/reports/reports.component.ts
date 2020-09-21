import { Component, OnInit } from '@angular/core';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../model/Trip';
import { MatDialog } from '@angular/material/dialog';
import { AddTripsComponent } from '../../shared/components/add-trips/add-trips.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = [
    'consentNumber',
    'source',
    'destination',
    'client',
    'truckNumber',
    'transporter',
    'sla',
    'actions',
  ];
  dataSource: Trip;
  loading: boolean = true;
  constructor(private _tripService: TripService, private _dialog: MatDialog) {}

  ngOnInit(): void {
    this._tripService.refreshTrip.subscribe(() => {
      this.getAllTrips();
    });
    this.getAllTrips();
  }

  getAllTrips() {
    this._tripService.getTrips().subscribe((data) => {
      console.log(data);
      this.loading = false;
      this.dataSource = data;
    });
  }

  editTrip(value: Trip) {
    console.log(value);
    const dialogRef = this._dialog.open(AddTripsComponent, { data: value });
  }

  deleteTrip(value: Trip) {
    console.log(value);
    this._tripService.deleteTrip(value._id).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
  }
}

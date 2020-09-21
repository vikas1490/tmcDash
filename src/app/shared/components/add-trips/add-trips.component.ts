import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, FormArray } from '@angular/forms';
import { TripService } from '../../../services/trip.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Trip } from '../../../model/Trip';

@Component({
  selector: 'app-add-trips',
  templateUrl: './add-trips.component.html',
  styleUrls: ['./add-trips.component.scss'],
})
export class AddTripsComponent implements OnInit {
  addTripForm: FormGroup;
  constructor(
    private fms: FormBuilder,
    private _tripService: TripService,
    private _dialog: MatDialogRef<AddTripsComponent>,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.addTripForm = this.fms.group({
      consentNumber: [''],
      source: [''],
      destination: this.fms.group({
        lrNumber: [''],
        target: [''],
      }),
      truckNumber: [''],
      client: [''],
      transporter: [''],
      sla: [''],
      destinations: this.fms.array([]),
    });
    if (this.data) {
      this.setTripValue(this.data);
    }
  }

  setTripValue(data) {
    console.log(data.destination[0].lrNumber);
    let newDestinations = data.destination.slice(1);
    console.log(newDestinations);
    this.addTripForm.patchValue({
      consentNumber: data.consentNumber || '',
      source: data.source || '',
      destination: {
        lrNumber: `${data.destination[0].lrNumber}` || '',
        target: `${data.destination[0].target}` || '',
      },
      truckNumber: data.truckNumber,
      client: data.client,
      transporter: data.transporter,
      sla: data.sla,
    });
    this.patchDestionations(newDestinations);
  }

  get destinations() {
    return this.addTripForm.get('destinations') as FormArray;
  }

  patchDestionations(destinations) {
    console.log('hiiii');
    console.log(destinations);
    destinations.forEach(() => {
      this.addDestinations();
    });
    this.destinations.patchValue([...destinations]);
  }

  addDestinationGroup(): FormGroup {
    return this.fms.group({
      lrNumber: [''],
      target: [''],
    });
  }

  addDestinations() {
    this.destinations.push(this.addDestinationGroup());
  }

  removeDestination(index: number) {
    this.destinations.removeAt(index);
  }

  createTrip(values: Trip) {
    this._tripService.createTrip(values).subscribe(
      (response) => {
        console.log(response);
        if (response.success) {
          this._dialog.close();
          this._snackbar.open('Trip has been saved', '', {
            duration: 4000,
            panelClass: 'alert-success',
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      },
      (error) => {
        console.log(error);
        this._snackbar.open(error.error.error || 'Error in saving', '', {
          duration: 4000,
          panelClass: 'alert-danger',
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    );
  }

  editTrip(values: Trip) {
    this._tripService.updateTrip(values).subscribe(
      (response) => {
        console.log(response);
        if (response.success) {
          this._dialog.close();
          this._snackbar.open('Trip has been saved', '', {
            duration: 4000,
            panelClass: 'alert-success',
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      },
      (error) => {
        console.log(error);
        this._snackbar.open(error.error.error || 'Error in saving', '', {
          duration: 4000,
          panelClass: 'alert-danger',
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      }
    );
  }

  onSubmit() {
    if (this.data) {
      this.addTripForm.value._id = this.data._id;
      this.editTrip(this.addTripForm.value);
    } else {
      this.createTrip(this.addTripForm.value);
    }
    console.log(this.addTripForm.value);
  }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ErrorDialogComponent } from './shered/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'crud-angular';

  constructor(private router: Router, public dialog: MatDialog) {}

  openDialogError(error: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: error,
    });
  }

  ngOnInit(): void {}

  onRegisterRedirect() {
    this.router.navigate(['/products/register']);
  }
}

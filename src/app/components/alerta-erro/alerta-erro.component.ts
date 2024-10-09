import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';


@Component({
  selector: 'app-alerta-erro',

  templateUrl: './alerta-erro.component.html',
  styleUrl: './alerta-erro.component.scss',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
})
export class AlertaErroComponent {

  dadosMenssagem: any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}

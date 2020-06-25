import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalesService } from 'src/app/services/locales.service';
import { Local } from 'src/app/entities/local';


@Component({
  selector: 'app-create-local',
  templateUrl: './create-local.component.html',
  styleUrls: ['./create-local.component.css']
})
export class CreateLocalComponent implements OnInit {
  // private local: Local = {nombre: "local4", email: "local4@local.com", telefono: "1122222233", localidad: "Haedo"}
  newLocalForm: FormGroup;

  constructor(private localesService: LocalesService) {
    this.newLocalForm = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.registerNewLocal()
  }

  get model() {
    return this.newLocalForm.controls;
  }

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required] ),
      localidad: new FormControl('', [Validators.required])
    });
  }

  registerNewLocal() {
    var newLocal = new Local()
    newLocal = this.newLocalForm.value
    this.localesService.create(newLocal).then(() => {
      //Navegar a home.
    }).catch((error) => {
      window.alert(error.message)
    })
  }
}

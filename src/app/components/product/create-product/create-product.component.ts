import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocalesService } from 'src/app/services/locales.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/entities/product';
import { Local } from 'src/app/entities/local';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  newProductForm: FormGroup;
  public locales: String[];
  public types: String[] = ["Señuelo", "Caña", "Reel"]

  constructor(private localesService: LocalesService, 
    private productsService: ProductsService, 
    private spinner: NgxSpinnerService,
    public router: Router) {
    this.newProductForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.getLocalesForSelect()
  }

  onSubmit() {
    this.registerNewProduct()
  }

  get model() {
    return this.newProductForm.controls;
  }

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      marca: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      local: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required]),
    });
  }

  registerNewProduct() {
    // console.log("Product form: ", this.newProductForm.value)
    var newProduct = new Product()
    newProduct = this.newProductForm.value
    this.spinner.show()
    this.productsService.create(newProduct).then(() => {
      this.spinner.hide()
      this.router.navigate(['home'])
    }).catch((error) => {
      window.alert(error.message)
    })
  }

  getLocalesForSelect() {
    this.localesService.getAll().subscribe((allLocales) => {
      this.locales = [];
      allLocales.forEach((local: Local) => {
        this.locales.push(local.nombre);
      })
    });
  }
}

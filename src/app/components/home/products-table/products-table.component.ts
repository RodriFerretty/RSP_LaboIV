import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/entities/product';
import * as jsPDF from 'jspdf'
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  @ViewChild('htmlData') htmlData:ElementRef;
  private allProducts = [];
  public filteredProducts = [];
  constructor(private productsService: ProductsService, 
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getProductsOnInit()
  }

  onSearchChange(word: string){
    this.filteredProducts = this.allProducts.filter(product => 
      product.nombre.toLowerCase().includes(word.toLowerCase())
      || product.marca.toLowerCase().includes(word.toLowerCase())
      )
   }

  getProductsOnInit() {
    this.spinner.show()
    this.productsService.getAll().subscribe((allProducts) => {
      this.allProducts = [];
      this.filteredProducts = [];
      allProducts.forEach((product: Product) => {
        this.allProducts.push(product);
        this.filteredProducts.push(product);
      })
      this.spinner.hide()
    });
  }

  public downloadPDF():void {
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt', 'a4');

    let handleElement = {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.fromHTML(DATA.innerHTML,15,15,{
      'width': 200,
      'elementHandlers': handleElement
    });

    doc.save('angular-demo.pdf');
  }
}

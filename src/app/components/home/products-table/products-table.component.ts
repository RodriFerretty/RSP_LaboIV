import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/entities/product';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  private allProducts = [];
  public filteredProducts = [];
  constructor(private productsService: ProductsService) { }

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
    this.productsService.getAll().subscribe((allProducts) => {
      this.allProducts = [];
      this.filteredProducts = [];
      allProducts.forEach((product: Product) => {
        this.allProducts.push(product);
        this.filteredProducts.push(product);
      })
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Product, ProductService } from '../../product.service';

@Component({
  selector: 'app-additem',
  standalone: true,
  templateUrl: './additem.component.html',
  styleUrl: './additem.component.css',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  providers: [ApiService]
})

export default class AdditemComponent {
  addItemForm: FormGroup;
  selectedFile: File | null = null;
  previewImage: string | null = null;

  constructor(private fb: FormBuilder, private ProductService: ProductService, private ApiService: ApiService) {
    this.addItemForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      image: new FormControl('', Validators.required)
    });
  }
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      this.previewImage = URL.createObjectURL(this.selectedFile);
      console.log("hola ", this.previewImage);
    }
  }

  onSubmit(): void {
    if (this.addItemForm.valid) {
      const newProduct: Product = {
        id: this.addItemForm.get('id')!.value,
        name: this.addItemForm.get('name')!.value,
        price: this.addItemForm.get('price')!.value,
        image: this.previewImage!
      };
      /*       this.ProductService.addProduct(newProduct);
       */
      try {
        this.ApiService.addItem(newProduct).subscribe((product: Product) => { });

      } catch (error) {
        console.log("Error al agregar producto", error);
      }
      this.addItemForm.reset();
      this.previewImage = null;
/*       console.log("Producto agregado", newProduct);
 */    } else {
      console.error("Formulario inválido");
    }
  }
}
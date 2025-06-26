import { ICategory, IProduct } from './../../../interfaces/index';
import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss'
})
export class ProductsFormComponent {
  public fb: FormBuilder = inject(FormBuilder);
  public categoryService: CategoryService = inject(CategoryService);
  @Input() pCategoryList: ICategory[] = [];
  @Input() form!: FormGroup;
  @Input() areActionsAvailable: boolean = false;
  @Output() callSaveMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callUpdateMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  callSave() {
    let item: IProduct = {
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
      price: this.form.controls['price'].value,
      stockQuantity: this.form.controls['stockQuantity'].value,
      category: { id: this.form.controls['category'].value }, // Make sure to wrap as object if backend expects it
    };
    if (this.form.controls['id'].value) {
      item.id = this.form.controls['id'].value;
    }
    if (item.id) {
      this.callUpdateMethod.emit(item);
    } else {
      this.callSaveMethod.emit(item);
    }
  }
}

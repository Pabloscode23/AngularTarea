import { CategoryService } from './../../services/category.service';
import { ICategory, IProduct } from './../../interfaces/index';
import { Component, inject, Output, ViewChild, EventEmitter, Input, effect } from '@angular/core';
import { ProductsFormComponent } from '../../components/products/products-form/products-form.component';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductsFormComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  public modalService: ModalService = inject(ModalService);
  @Input() categoryList: ICategory[] = [];
  @ViewChild('editProductModal') public editProductModal: any;
  @Output() callUpdateModalMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callDeleteMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();


  public fb: FormBuilder = inject(FormBuilder);
  public authService: AuthService = inject(AuthService);
  public productService: ProductService = inject(ProductService);
  public categoryService: CategoryService = inject(CategoryService);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public areActionsAvailable: boolean = false;
  public ProductList: IProduct[] = [];

  public productForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [null, [Validators.required, Validators.min(0)]],
    stockQuantity: [null, [Validators.required, Validators.min(0)]],
    category: [null, Validators.required],
  });
  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.route.data.subscribe(data => {
      this.areActionsAvailable = this.authService.areActionsAvailable(data['authorities'] ? data['authorities'] : []);
    });
  }

  constructor() {
    this.categoryService.getAll();
    this.productService.getAll();
    effect(() => {
      this.categoryList = this.categoryService.categories$();
    });

  }
  saveProduct(item: IProduct) {
    this.productService.save(item);
    this.productForm.reset();
  }
}

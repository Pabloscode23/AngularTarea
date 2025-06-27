import { Component, inject, Input, Output, SimpleChanges } from '@angular/core';
import { ICategory, IProduct } from '../../../interfaces';
import { EventEmitter } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  @Input() pProductList: IProduct[] = [];
  @Input() pCategoryList: ICategory[] = [];
  public selectedItem: IProduct = {
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    category: { id: 0 }
  };
  @Input() areActionsAvailable: boolean = false;
  @Output() callUpdateModalMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callDeleteMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  private prouctService = inject(ProductService);
  public modalService = inject(NgbModal);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }

  onFormEventCalled(params: IProduct) {
    this.prouctService.update(params);
    this.modalService.dismissAll();
  }

  getCategoryName(categoryId: number | undefined): string {
    if (!categoryId || !this.pCategoryList) return '';
    const category = this.pCategoryList.find((cat: any) => cat.id === categoryId);
    return category ? category.name ?? '' : '';
  }
  showDetailModal(item: ICategory, modal: any) {
    this.selectedItem = {
      name: item.name ?? '',
      description: item.description ?? '',
      price: 0,
      stockQuantity: 0,
      category: { id: item.id ?? 0 }
    };
    modal.show();
  }

  deleteProduct(product: IProduct) {
    this.prouctService.delete(product);
  }
}

import { ICategory } from './../../interfaces/index';
import { Component, inject, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriesFormComponent } from '../../components/categories/categories-form/categories-form.component';
import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriesListComponent } from "../../components/categories/categories-list/categories-list.component";
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CategoriesFormComponent,
    CategoriesListComponent,
    ModalComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  public modalService: ModalService = inject(ModalService);
  @ViewChild('editCategoryModal') public editCategoryModal: any;
  @Output() callUpdateModalMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();
  @Output() callDeleteMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();

  public fb: FormBuilder = inject(FormBuilder);
  public authService: AuthService = inject(AuthService);
  public categoryService: CategoryService = inject(CategoryService);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public areActionsAvailable: boolean = false;
  public categoryList: ICategory[] = [];

  public categoryForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.route.data.subscribe(data => {
      this.areActionsAvailable = this.authService.areActionsAvailable(data['authorities'] ? data['authorities'] : []);
    });
  }

  constructor() {
    this.categoryService.getAll();
  }

  saveCategory(item: ICategory) {
    this.categoryService.save(item);
  }

  updateCategory(item: ICategory) {
    this.categoryService.update(item);
    this.modalService.closeAll();
    this.categoryForm.reset();
  }

  deleteCategory(item: ICategory) {
    this.categoryService.delete(item);
  }

  openEditCategoryModal(category: ICategory) {
    console.log("openEditCategoryModal", category);
    this.categoryForm.patchValue({
      id: JSON.stringify(category.id),
      name: category.name,
      description: category.description
    });
    this.modalService.displayModal('lg', this.editCategoryModal);
  }

}

import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriesFormComponent } from '../../components/categories/categories-form/categories-form.component';
import { ICategory } from '../../interfaces';
import { CategoryService } from '../../services/category.service';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriesListComponent } from "../../components/categories/categories-list/categories-list.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CategoriesFormComponent,
    CategoriesListComponent
],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
 public modalService: ModalService = inject(ModalService);
  @ViewChild('editCategoryModal') public editCategoryModal: any;

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
    this.route.data.subscribe( data => {
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
  
}

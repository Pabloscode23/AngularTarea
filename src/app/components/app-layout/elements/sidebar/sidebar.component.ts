import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, RouterLink, RouterLinkActive } from '@angular/router';
import { LayoutService } from '../../../../services/layout.service';
import { AuthService } from '../../../../services/auth.service';
import { SvgIconComponent } from '../../../svg-icon/svg-icon.component';
import { routes } from '../../../../app.routes';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    SvgIconComponent
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public width: any = window.innerWidth;
  public showLeftArrow: boolean = true;
  public showRigthArrow: boolean = false;
  public layoutService = inject(LayoutService);
  public authService = inject(AuthService);
  public areActionsAvailable: boolean = false;
  public route: ActivatedRoute = inject(ActivatedRoute);
  public permittedRoutes: Route[] = [];
  appRoutes: any;

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.areActionsAvailable = this.authService.areActionsAvailable(['ROLE_SUPER_ADMIN_ROLE', 'ROLE_ADMIN_ROLE']);
  }

  constructor(
  ) {
    this.appRoutes = routes.filter(route => route.path == 'app')[0];
    this.permittedRoutes = this.authService.getPermittedRoutes(this.appRoutes.children);
  }

}

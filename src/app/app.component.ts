import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { LibraryComponent } from './layout/library/library.component';
import { HeaderComponent } from './layout/header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastService } from './service/toast.service';
import { ToastInfo } from './service/model/toast-info.model';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, NavigationComponent, LibraryComponent, HeaderComponent, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ng-spotify-clone-front';
  
  private faIconLibrary: FaIconLibrary = inject(FaIconLibrary);

  toastService = inject(ToastService);
  
  ngOnInit() {
    this.initFontAwesome();
    const toast: ToastInfo = {
      body: 'Welcome to the Spotify Clone',
      className: 'bg-success text-light',
      type: 'SUCCESS'
    };
    this.toastService.show(toast);
  }
  
  private initFontAwesome() {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }
}

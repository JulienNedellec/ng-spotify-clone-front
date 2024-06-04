import {Component, OnInit, inject, effect} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { LibraryComponent } from './layout/library/library.component';
import { HeaderComponent } from './layout/header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastService } from './service/toast.service';
import { ToastInfo } from './service/model/toast-info.model';
import {PlayerComponent} from "./layout/player/player.component";
import {AuthPopupState, AuthService} from "./service/auth.service";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {AuthPopupComponent} from "./layout/auth-popup/auth-popup.component";
import {SearchComponent} from "./search/search.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, NavigationComponent, LibraryComponent, HeaderComponent, MatSnackBarModule, PlayerComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'ng-spotify-clone-front';

  private faIconLibrary: FaIconLibrary = inject(FaIconLibrary);
  private authPopupRef!: MatDialogRef<AuthPopupComponent>;

  constructor(private authService: AuthService, private dialog: MatDialog, private toastService: ToastService) {
    effect(() => {
      this.openOrCloseAuthModal(this.authService.authPopupStateChange())
    }, {allowSignalWrites: true});
  }

  private openOrCloseAuthModal(state: AuthPopupState) {
    if (state === 'OPEN') {
      this.openAuthPopup();
    } else if (state === 'CLOSE' && this.authPopupRef) {
      this.authPopupRef.close();
    }
  }

  private openAuthPopup() {
    const config = new MatDialogConfig();
    config.autoFocus = false; // Optional: Disable auto focus on opening (consider accessibility)
    config.disableClose = true; // Optional: Prevent closing by clicking outside the modal

    this.authPopupRef = this.dialog.open(AuthPopupComponent, config);

    this.authPopupRef.afterClosed().subscribe(() => {
      this.authService.openOrCloseAuthPopup('CLOSE');
    });
  }

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

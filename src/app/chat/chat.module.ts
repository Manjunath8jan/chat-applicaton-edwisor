import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RemoveSpecialCharPipe } from '../shared/pipe/remove-special-char.pipe';
import { SharedModule } from '../shared/shared.module';
import { ChatRouteGuardService } from './chat-route-guard.service';


@NgModule({
  declarations: [ChatBoxComponent, RemoveSpecialCharPipe],
  imports: [
    CommonModule,
    ToastrModule,
    BrowserAnimationsModule,
    RouterModule.forChild([
      { path: 'chat', component: ChatBoxComponent, canActivate:[ChatRouteGuardService] }
    ]),
    SharedModule
  ],
  providers: [ChatRouteGuardService]
})
export class ChatModule { }

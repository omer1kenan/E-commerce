import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserComponent } from './users/components/user/user.component';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { authGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ProductsModule,
    SharedModule,
    CartsModule,
    UsersModule,
    DashboardModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FaqComponent } from './components/faq/faq.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ServicesComponent } from './components/services/services.component';
import { ServiceDetailComponent } from './components/services/service-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'store', component: ProductGridComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'shipping', component: ShippingComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'services/:id', component: ServiceDetailComponent },
];

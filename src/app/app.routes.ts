import { Routes } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
    { path: '', component: ProductGridComponent },
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'checkout', component: CheckoutComponent }
];

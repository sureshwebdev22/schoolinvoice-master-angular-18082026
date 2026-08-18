import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Students } from './students/students';
import { Invoices } from './invoices/invoices';
import { Myprofile } from './myprofile/myprofile';
import { authGuard } from './guard/auth-guard';
import { EditStudent } from './students/edit-student/edit-student';
import { ParentCreate } from './parent-create/parent-create';
import { ParentSearch } from './parent-search/parent-search';
import { CreateStudent } from './students/create-student/create-student';
import { SearchParent } from './parent/search-parent/search-parent';
import { CreateUser } from './user/create-user/create-user';
import { SearchUser } from './user/search-user/search-user';
import { ViewStudent } from './student/view-student/view-student';
import { CreateInvoices } from './invoices/create-invoices/create-invoices';
import { ListInvoices } from './invoices/list-invoices/list-invoices';
import { ViewInvoice } from './invoices/view-invoice/view-invoice';
import { CreatePayment } from './payments/create-payment/create-payment';
import { Registration } from './registration/registration';
import { SearchPayments } from './search-payments/search-payments';

export const routes: Routes = [
    { path: 'home', component: Home ,canActivate: [authGuard]},
    { path: 'login', component: Login },
    { path: 'register', component: Registration },

    { path: 'students', component: Students ,canActivate: [authGuard]},
    { path: 'invoices', component: Invoices ,canActivate: [authGuard]},
    { path: 'myprofile', component: Myprofile ,canActivate: [authGuard]},
    {path: 'edit-student/:id', component: EditStudent ,canActivate: [authGuard]},
    { path: 'parent/create', component: ParentCreate ,canActivate: [authGuard]},
    {path: 'student/create', component: CreateStudent ,canActivate: [authGuard]},
    {path: 'parent/search', component: ParentSearch ,canActivate: [authGuard]},
    {path: 'user/create', component: CreateUser ,canActivate: [authGuard]},
    {path: 'user/search', component: SearchUser ,canActivate: [authGuard]},
    {path: 'parent/search/:id', component: SearchParent ,canActivate: [authGuard]},
    {path: 'view-student/:id', component: ViewStudent ,canActivate: [authGuard]},
    {path: 'invoices/create/:id', component: CreateInvoices ,canActivate: [authGuard]},
    {path :'invoices/list', component: ListInvoices ,canActivate: [authGuard]},    
    {path :'invoices/list-invoice/:id', component: ViewInvoice ,canActivate: [authGuard]},    
    {path: 'invoices/create', component: CreateInvoices ,canActivate: [authGuard]},
    {path:'payment/create/:id',component:CreatePayment,canActivate:[authGuard]},
    {path:'payment/create',component:CreatePayment,canActivate:[authGuard]},
    {path: 'payment/list', component: SearchPayments ,canActivate: [authGuard]},
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

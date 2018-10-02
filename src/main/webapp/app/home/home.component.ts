import {Component, OnInit} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {Principal, Account} from 'app/core';

import {LoginService} from 'app/core';
import {Router} from '@angular/router';
import {StateStorageService} from 'app/core';
import {HOME_ROUTE} from "app/home/home.route";

// My Imports


@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;

    constructor(private principal: Principal, private loginService: LoginService, private eventManager: JhiEventManager,
                private router: Router, private stateStorageService: StateStorageService) {

    }

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                console.log(account.authorities + 'HELLO BEST ');
                if (account.authorities.indexOf("ROLE_ADMIN") >=0) {
                    this.router.navigate(['']);
                }
                else
                {
                    this.router.navigate(['/student-tests']);

                    this.account = account;
                }
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    // Custom login for user, different to navbar

    login() {
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                this.authenticationError = false;
                if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                    this.router.navigate(['']);
                }

                this.eventManager.broadcast({
                    name: 'authenticationSuccess',
                    content: 'Sending Authentication Success'
                });

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is succesful, go to stored previousState and clear previousState
                const redirect = this.stateStorageService.getUrl();
                if (redirect) {
                    this.stateStorageService.storeUrl(null);
                    this.router.navigate([redirect]);
                }
            })
            .catch(() => {
                this.authenticationError = true;
            });
    }
}

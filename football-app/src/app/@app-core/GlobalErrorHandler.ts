import { LoadingService } from './utils/loading.service';
import { ErrorHandler, Injectable, Injector, Inject } from '@angular/core';
import { ToastService } from './utils';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        @Inject(Injector) private readonly injector: Injector,
        private loadingService: LoadingService,
        private toarstSerivce: ToastService
    ) { }
    handleError(error) {
        this.loadingService.dismiss();
        if (error.message === 'Uncaught (in promise): overlay does not exist' || error.message.includes("writeValue")) return;
        else this.toarstSerivce.presentFail(error.message);
        if (error.message) console.error(error.message);
        else console.error(error);
    }
}

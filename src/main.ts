import { bootstrapApplication } from '@angular/platform-browser';
import { MainPageComponent } from './app/components/main-page/main-page.component';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(MainPageComponent, {
	providers: [provideAnimations()],
}).catch((err) => console.error(err));

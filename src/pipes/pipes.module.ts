import { NgModule } from '@angular/core';
import { safeUrllPipe } from './safe-url/safe-url';
@NgModule({
	declarations: [safeUrllPipe],
	imports: [],
	exports: [safeUrllPipe]
})
export class PipesModule {}

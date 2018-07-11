import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { DocsComponent } from "./docs/docs.component";
import { NewsComponent } from "./news/news.component";
import { NewsViewComponent } from "./news/news-view/news-view.component";
import { HomeComponent } from "./home/home.component";
import { GuidesComponent } from "./guides/guides.component";
import { GuideViewComponent } from "./guides/guide-view/guide-view.component";

/* New Wizard */
import { WizardComponent } from "./wizard/wizard.component";
import { GettingStartedComponent } from "./wizard/pages/getting-started/getting-started.component";

const routes: Routes = [
	{
		path: 'wizard/:projectName',
		component: WizardComponent,
		pathMatch: 'full'

	},
	{
		path: "wizard",
		component: GettingStartedComponent,
		pathMatch: 'full'
	},
	{
		path: "",
		children: [{
			path: "",
			component: HomeComponent,
			pathMatch: 'full'
		}]
	},
	{
		path: "about",
		children: [{
			path: "",
			component: AboutComponent,
			pathMatch: 'full'
		}]
	},
	{
		path: "docs",
		children: [{
			path: "",
			component: DocsComponent,
			pathMatch: 'full'
		}]
	},
	{
		path: "news",
		children: [{
			path: "",
			component: NewsComponent,
			pathMatch: 'full'
		}, {
			path: ":articleId",
			component: NewsViewComponent,
			pathMatch: 'full'
		}]
	},
	{
		path: "guides",
		children: [{
			path: "",
			component: GuidesComponent,
			pathMatch: 'full'
		}, {
			path: ":guideId",
			component: GuideViewComponent,
			pathMatch: 'full'
		}]
	},
	{ path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

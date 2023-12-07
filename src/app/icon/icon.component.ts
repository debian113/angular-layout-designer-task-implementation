import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Icons } from '../consts/icons.enum';
import { NgIf } from "@angular/common";

@Component({
	selector: 'app-icon',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		NgIf
	]
})
export class IconComponent {
	@Input()
	icon?: Icons;

	public Icons = Icons;
}

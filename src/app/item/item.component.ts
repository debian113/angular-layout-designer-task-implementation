import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewEncapsulation,
} from '@angular/core';
import { Icons } from '../consts/icons.enum';
import { Item } from '../models/item.model';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { Subscription } from 'rxjs';
import {NgOptimizedImage} from "@angular/common";
import {IconComponent} from "../icon/icon.component";


@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: ['./item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,

	standalone: true,
	imports: [
		ReactiveFormsModule,
		NgOptimizedImage,
		IconComponent
	]
})
export class ItemComponent implements OnDestroy, OnInit {
	@Output()
	public killMe = new EventEmitter<void>();

	@Output()
	private isChecked = new EventEmitter<boolean>();

	@Input()
	public item!: Item;

	public Icons = Icons;

	public checkbox = new FormControl();

	private checkSubscription!: Subscription;

	ngOnInit(): void {
		this.checkSubscription = this.checkbox.valueChanges.subscribe(
			(isChecked: boolean) => {
				this.isChecked.emit(isChecked);
			}
		);
	}

	ngOnDestroy(): void {
		this.checkSubscription.unsubscribe();
	}
}

import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewEncapsulation,
} from '@angular/core';
import { Icons } from '../../consts/icons.enum';
import { Item } from '../../models/item.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { ReadMoreComponent } from '../read-more/read-more.component';
import { bounceInDownAnimation } from '../../animations/bounce-in-down.animation';
import { bounceOutUpAnimation } from '../../animations/bounce-in-up.animation';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: ['./item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [bounceInDownAnimation(), bounceOutUpAnimation()],
	standalone: true,
	imports: [
		ReactiveFormsModule,
		NgOptimizedImage,
		IconComponent,
		ReadMoreComponent,
	],
})
export class ItemComponent implements OnDestroy, OnInit {
	@Output()
	public killMe = new EventEmitter<void>();

	@Output()
	private isChecked = new EventEmitter<boolean>();

	@Input()
	public item!: Item;

	public Icons = Icons;

	public checkbox: FormControl<boolean> = new FormControl();

	private checkSubscription!: Subscription;

	isDestroyed = 'false';

	constructor(private cd: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.checkSubscription = this.checkbox.valueChanges.subscribe(
			(isChecked: boolean) => {
				this.isChecked.emit(isChecked);
			},
		);
	}

	destroyCurrentItem() {
		this.isDestroyed = 'true';
		this.cd.detectChanges();

		setTimeout(() => {
			this.killMe.emit();
		}, 1000);
	}

	setCheckboxValue(value: boolean): void {
		this.checkbox.setValue(value);
	}

	ngOnDestroy(): void {
		this.checkSubscription.unsubscribe();
	}
}

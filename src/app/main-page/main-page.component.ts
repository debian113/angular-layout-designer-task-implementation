import {ChangeDetectionStrategy, Component, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoremIpsum } from 'lorem-ipsum';
import { Item } from '../models/item.model';
import { Statuses } from '../consts/statuses.enum';
import { Icons } from '../consts/icons.enum';
import {NgClass, NgForOf} from "@angular/common";
import {ItemComponent} from "../item/item.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconComponent} from "../icon/icon.component";

@Component({
	selector: 'app-root',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.scss'],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		NgForOf, ItemComponent, IconComponent, FormsModule, NgClass
	]
})
export class MainPageComponent {
	@ViewChildren(ItemComponent) itemComponents: QueryList<ItemComponent> | undefined;

	public Statuses = Statuses;

	public items: Item[] = [];

	public selected : Set<symbol> = new Set<symbol>();

	public Icons = Icons;

	public selectAllCheckbox: boolean = false;

	private lorem = new LoremIpsum({
		sentencesPerParagraph: {
			max: 8,
			min: 1,
		},
		wordsPerSentence: {
			max: 16,
			min: 1,
		},
	});

	public addItem(): void {
		const item: Item = {
			id: Symbol(),
			label: this.lorem.generateWords(this.randomWordsQty),
			description: this.lorem.generateSentences(this.randomSentencesQty),
			status: this.randomStatus,
			foto: this.randomFoto,
		};

		this.items.unshift(item);

		this.selectAllCheckbox = false;
	}

	public checkItem(isChecked: boolean, id: symbol): void {
		if (isChecked) {
			this.selected.add(id);
		} else {
			this.selected.delete(id);
		}
	}

	public selectAllItems(): void {
		if (!this.selectAllCheckbox) {
			this.selected.clear();
			this.itemComponents!.forEach(child => child.setCheckboxValue(false));
		} else {
			this.items.forEach(item => this.selected.add(item.id))
			this.itemComponents!.forEach(child => child.setCheckboxValue(true));
		}
	}

	public deleteSelected(): void {
		Array.from(this.selected).forEach((itemId) => {
			this.deleteById(itemId);
		});

		this.selectAllCheckbox = false;
	}

	public deleteById(id: symbol): void {
		const doomedIndex = this.items.findIndex((item) => item.id === id);

		this.items.splice(doomedIndex, 1);
		this.selected.delete(id);
	}

	public print() {
		globalThis.print();
	}

	private get randomSentencesQty() {
		return Math.floor(Math.random() * 20);
	}

	private get randomWordsQty() {
		return Math.floor(Math.random() * 8);
	}

	private get randomStatus() {
		return Math.round(Math.random()) === 1
			? Statuses.active
			: Statuses.inactive;
	}

	private get randomFoto() {
		return Math.round(Math.random()) === 1
			? '/assets/items/foto1.jpg'
			: '/assets/items/foto2.png';
	}
}

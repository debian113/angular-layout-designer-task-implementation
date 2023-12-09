import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-read-more',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements OnChanges {
	@Input() text: string | undefined;
	@Input() maxLength: number = 100;
	currentText: string | undefined;
	hideToggle: boolean = true;

	public isCollapsed: boolean = true;

	constructor(private elementRef: ElementRef) {

	}
	toggleView() {
		this.isCollapsed = !this.isCollapsed;
		this.determineView();
	}
	determineView() {
		if (!this.text || this.text.length <= this.maxLength) {
			this.currentText = this.text;
			this.isCollapsed = false;
			this.hideToggle = true;
			return;
		}
		this.hideToggle = false;
		if (this.isCollapsed) {
			this.currentText = this.text.substring(0, this.maxLength) + "...";
		} else if(!this.isCollapsed)  {
			this.currentText = this.text;
		}

	}
	ngOnChanges() {
		this.determineView();
	}
}

import {
	AfterViewInit,
	ChangeDetectionStrategy, ChangeDetectorRef,
	Component,
	ElementRef,
	Input,
	OnChanges, Renderer2, SimpleChanges,
	ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-read-more',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements OnChanges, AfterViewInit {
	@ViewChild('text') elementRef: ElementRef | undefined;

	@Input() currentText: string | undefined;
	@Input() maxLines: number = 2;

	hideToggle: boolean = true;

	public isCollapsed: boolean = true;

	constructor(private renderer: Renderer2 , private cd: ChangeDetectorRef) {
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['maxLength'] && changes['maxLength'].currentValue) {
			this.applyEllipsis();
		}
	}

	ngAfterViewInit(): void {
		this.applyEllipsis();
	}

	toggleView() {
		this.isCollapsed = !this.isCollapsed;

		if (this.isCollapsed) {
			this.applyEllipsis();
		} else {
			this.removeStyle();
		}
	}
	private applyEllipsis(): void {
		const element = this.elementRef?.nativeElement;

		if (element) {
			this.renderer.setStyle(element, 'display', '-webkit-box');
			this.renderer.setStyle(element, '-webkit-box-orient', 'vertical');
			this.renderer.setStyle(element, 'overflow', 'hidden');
			this.renderer.setStyle(element, 'text-overflow', 'ellipsis');
			this.renderer.setStyle(element, '-webkit-line-clamp', `${this.maxLines}`);
		}

		this.cd.detectChanges();
	}

	private removeStyle(): void {
		const element = this.elementRef?.nativeElement;

		if (element) {
			this.renderer.setStyle(element, 'display', 'unset');
			this.renderer.setStyle(element, '-webkit-box-orient', 'unset');
			this.renderer.setStyle(element, 'overflow', 'unset');
			this.renderer.setStyle(element, 'text-overflow', 'unset');
			this.renderer.setStyle(element, '-webkit-line-clamp', 'unset');
		}

		this.cd.detectChanges();
	}
}

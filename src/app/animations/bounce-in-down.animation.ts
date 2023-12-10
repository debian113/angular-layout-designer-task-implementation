import {
	animate,
	animation,
	AnimationMetadata,
	AnimationTriggerMetadata,
	animateChild,
	group,
	keyframes,
	style,
	transition,
	trigger,
	useAnimation,
	query
} from "@angular/animations";

const DEFAULT_DURATION = 1000;

const bounceInDown = () =>
	animation(
		group([
			animate(
				'{{duration}}ms {{delay}}ms',
				keyframes([
					style({ transform: 'translate3d(0, -{{translate}}, 0)',
						easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0 }),
					style({ transform: 'translate3d(0, 25px, 0)',
						easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0.6 }),
					style({ transform: 'translate3d(0, -10px, 0)',
						easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0.75 }),
					style({ transform: 'translate3d(0, 5px, 0)',
						easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0.9 }),
					style({ transform: 'translate3d(0, 0, 0)',
						easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 1 })
				])
			),
			animate(
				'{{duration}}ms {{delay}}ms',
				keyframes([
					style({ visibility: 'visible', opacity: 0, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
						offset: 0 }),
					style({ opacity: 1, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 0.6 }),
					style({ opacity: 1, easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)', offset: 1 })
				])
			)
		])
	);

export function bounceInDownAnimation(
): AnimationTriggerMetadata {
	return trigger('bounceInDown', [
		transition('void => *', [style({ visibility: 'hidden' }),
			...(animateChildren() as AnimationMetadata[])], {
			params: { delay:  0,
				duration:  DEFAULT_DURATION,
				translate: '3000px'}
		})
	]);
}

function animateChildren(): AnimationMetadata[] {
	const queryBefore = query('@*', animateChild(), { optional: true });
	const queryTogether = query('@*', animateChild(), { optional: true });
	const queryAfter = query('@*', animateChild(), { optional: true });

	return [ ...(queryBefore ? [queryBefore] : []), group([useAnimation(bounceInDown()),
		...(queryTogether ? [queryTogether] : [])]), ...(queryAfter ? [queryAfter] : []) ];
}

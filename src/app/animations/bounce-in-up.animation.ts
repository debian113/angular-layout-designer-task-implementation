import {
	animate,
	animateChild,
	animation,
	AnimationMetadata,
	AnimationTriggerMetadata,
	group,
	keyframes,
	query,
	style,
	transition,
	trigger,
	useAnimation,
} from '@angular/animations';

const DEFAULT_DURATION = 1000;

const bounceOutUp = () =>
	animation(
		group([
			animate(
				'{{duration}}ms {{delay}}ms',
				keyframes([
					style({
						transform: 'translate3d(0, 0, 0)',
						easing: 'ease',
						offset: 0,
					}),
					style({
						transform: 'translate3d(0, -10px, 0)',
						easing: 'ease',
						offset: 0.2,
					}),
					style({
						transform: 'translate3d(0, 20px, 0)',
						easing: 'ease',
						offset: 0.4,
					}),
					style({
						transform: 'translate3d(0, 20px, 0)',
						easing: 'ease',
						offset: 0.45,
					}),
					style({
						transform: 'translate3d(0, -{{translate}}, 0)',
						easing: 'ease',
						offset: 1,
					}),
				]),
			),
			animation([
				animate(
					'{{duration}}ms {{delay}}ms',
					keyframes([
						style({ opacity: 1, easing: 'ease', offset: 0 }),
						style({ opacity: 1, easing: 'ease', offset: 0.45 }),
						style({ opacity: 0, easing: 'ease', offset: 1 }),
					]),
				),
			]),
		]),
	);

function animateChildren(): AnimationMetadata[] {
	const queryBefore = query('@*', animateChild(), { optional: true });
	const queryTogether = query('@*', animateChild(), { optional: true });
	const queryAfter = query('@*', animateChild(), { optional: true });

	return [
		...(queryBefore ? [queryBefore] : []),
		group([
			useAnimation(bounceOutUp()),
			...(queryTogether ? [queryTogether] : []),
		]),
		...(queryAfter ? [queryAfter] : []),
	];
}

export function bounceOutUpAnimation(): AnimationTriggerMetadata {
	return trigger('bounceOutUp', [
		transition(
			'false => true',
			[...(animateChildren() as AnimationMetadata[])],
			{
				params: {
					delay: 0,
					duration: DEFAULT_DURATION,
					translate: '3000px',
				},
			},
		),
	]);
}

import * as React from 'react'; // tslint:disable-line no-unused-variable
import {Router5} from 'router5';
import {SPC} from '../../lib/SPC';
import 'rxjs/add/observable/combineLatest';
import {Routing} from '../stores/Routing';

export interface LinkProps {
	routeName: string;
	routeParams?: object;
	routeOptions?: object;
	className?: string;
}

interface BaseLinkProps extends LinkProps {
	router: Router5;
}

class BaseLink extends SPC<BaseLinkProps> {
	render() {
		const {router, routeName, routeParams = {}, className, children} = this.props;
		const href = router.buildUrl(routeName, routeParams) as string;

		return <a href={href} className={className} onClick={this.handleOnClick}>{children}</a>;
	}

	handleOnClick = (evt) => {
		const {router, routeName, routeParams = {}, routeOptions = {}} = this.props;
		const comboKey = evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey;

		if (evt.button === 0 && !comboKey) {
			evt.preventDefault();
			router.navigate(routeName, routeParams, routeOptions);
		}
	}
}

export class Link extends SPC<LinkProps> {
	render() {
		return <BaseLink {...this.props} router={Routing.router}/>;
	}
}

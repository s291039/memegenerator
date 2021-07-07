/**
 * This is a near direct copy of `react-bootstrap/src/Collapse.tsx`
 * and `react-transition-group/src/Transition.js`, modified to fix
 * issues with React strict mode.
 */

import React, { useMemo, useRef } from 'react';
import css from 'dom-helpers/css';
import classNames from 'classnames';
import createChainedFunction from 'react-bootstrap/createChainedFunction';
import triggerBrowserReflow from 'react-bootstrap/triggerBrowserReflow';
import transitionEndListener from 'react-bootstrap/transitionEndListener';

import ReactDOM from 'react-dom';

import TransitionGroupContext from 'react-transition-group/TransitionGroupContext';

export const UNMOUNTED = 'unmounted';
export const EXITED = 'exited';
export const ENTERING = 'entering';
export const ENTERED = 'entered';
export const EXITING = 'exiting';

class MyTransition extends React.Component {
	static contextType = TransitionGroupContext;

	constructor(props, context) {
		super(props, context);

		let parentGroup = context;
		// In the context of a TransitionGroup all enters are really appears
		let appear =
			parentGroup && !parentGroup.isMounting ? props.enter : props.appear;

		let initialStatus;

		this.appearStatus = null;

		if (props.in) {
			if (appear) {
				initialStatus = EXITED;
				this.appearStatus = ENTERING;
			} else {
				initialStatus = ENTERED;
			}
		} else {
			if (props.unmountOnExit || props.mountOnEnter) {
				initialStatus = UNMOUNTED;
			} else {
				initialStatus = EXITED;
			}
		}

		this.state = { status: initialStatus };

		this.nextCallback = null;
	}

	static getDerivedStateFromProps({ in: nextIn }, prevState) {
		if (nextIn && prevState.status === UNMOUNTED) {
			return { status: EXITED };
		}
		return null;
	}

	// getSnapshotBeforeUpdate(prevProps) {
	//   let nextStatus = null

	//   if (prevProps !== this.props) {
	//     const { status } = this.state

	//     if (this.props.in) {
	//       if (status !== ENTERING && status !== ENTERED) {
	//         nextStatus = ENTERING
	//       }
	//     } else {
	//       if (status === ENTERING || status === ENTERED) {
	//         nextStatus = EXITING
	//       }
	//     }
	//   }

	//   return { nextStatus }
	// }

	componentDidMount() {
		this.updateStatus(true, this.appearStatus);
	}

	componentDidUpdate(prevProps) {
		let nextStatus = null;
		if (prevProps !== this.props) {
			const { status } = this.state;

			if (this.props.in) {
				if (status !== ENTERING && status !== ENTERED) {
					nextStatus = ENTERING;
				}
			} else {
				if (status === ENTERING || status === ENTERED) {
					nextStatus = EXITING;
				}
			}
		}
		this.updateStatus(false, nextStatus);
	}

	componentWillUnmount() {
		this.cancelNextCallback();
	}

	getTimeouts() {
		const { timeout } = this.props;
		let exit, enter, appear;

		exit = enter = appear = timeout;

		if (timeout != null && typeof timeout !== 'number') {
			exit = timeout.exit;
			enter = timeout.enter;
			// TODO: remove fallback for next major
			appear = timeout.appear !== undefined ? timeout.appear : enter;
		}
		return { exit, enter, appear };
	}

	updateStatus(mounting = false, nextStatus) {
		if (nextStatus !== null) {
			// nextStatus will always be ENTERING or EXITING.
			this.cancelNextCallback();

			if (nextStatus === ENTERING) {
				this.performEnter(mounting);
			} else {
				this.performExit();
			}
		} else if (this.props.unmountOnExit && this.state.status === EXITED) {
			this.setState({ status: UNMOUNTED });
		}
	}

	performEnter(mounting) {
		const { enter } = this.props;
		const appearing = this.context ? this.context.isMounting : mounting;
		const [maybeNode, maybeAppearing] = this.props.nodeRef
			? [this.props.nodeRef.current, appearing]
			: [ReactDOM.findDOMNode(this), appearing];

		const timeouts = this.getTimeouts();
		const enterTimeout = appearing ? timeouts.appear : timeouts.enter;
		// no enter animation skip right to ENTERED
		// if we are mounting and running this it means appear _must_ be set
		if (!mounting && !enter) {
			this.safeSetState({ status: ENTERED }, () => {
				this.props.onEntered(maybeNode);
			});
			return;
		}

		this.props.onEnter(maybeNode, maybeAppearing);

		this.safeSetState({ status: ENTERING }, () => {
			this.props.onEntering(maybeNode, maybeAppearing);

			this.onTransitionEnd(enterTimeout, () => {
				this.safeSetState({ status: ENTERED }, () => {
					this.props.onEntered(maybeNode, maybeAppearing);
				});
			});
		});
	}

	performExit() {
		const { exit } = this.props;
		const timeouts = this.getTimeouts();
		const maybeNode = this.props.nodeRef
			? this.props.nodeRef.current
			: ReactDOM.findDOMNode(this);

		// no exit animation skip right to EXITED
		if (!exit) {
			this.safeSetState({ status: EXITED }, () => {
				this.props.onExited(maybeNode);
			});
			return;
		}

		this.props.onExit(maybeNode);

		this.safeSetState({ status: EXITING }, () => {
			this.props.onExiting(maybeNode);

			this.onTransitionEnd(timeouts.exit, () => {
				this.safeSetState({ status: EXITED }, () => {
					this.props.onExited(maybeNode);
				});
			});
		});
	}

	cancelNextCallback() {
		if (this.nextCallback !== null) {
			this.nextCallback.cancel();
			this.nextCallback = null;
		}
	}

	safeSetState(nextState, callback) {
		// This shouldn't be necessary, but there are weird race conditions with
		// setState callbacks and unmounting in testing, so always make sure that
		// we can cancel any pending setState callbacks after we unmount.
		callback = this.setNextCallback(callback);
		this.setState(nextState, callback);
	}

	setNextCallback(callback) {
		let active = true;

		this.nextCallback = (event) => {
			if (active) {
				active = false;
				this.nextCallback = null;

				callback(event);
			}
		};

		this.nextCallback.cancel = () => {
			active = false;
		};

		return this.nextCallback;
	}

	onTransitionEnd(timeout, handler) {
		this.setNextCallback(handler);
		const node = this.props.nodeRef
			? this.props.nodeRef.current
			: ReactDOM.findDOMNode(this);

		const doesNotHaveTimeoutOrListener =
			timeout == null && !this.props.addEndListener;
		if (!node || doesNotHaveTimeoutOrListener) {
			setTimeout(this.nextCallback, 0);
			return;
		}

		if (this.props.addEndListener) {
			const [maybeNode, maybeNextCallback] = [node, this.nextCallback];
			this.props.addEndListener(maybeNode, maybeNextCallback);
		}

		if (timeout != null) {
			setTimeout(this.nextCallback, timeout);
		}
	}

	render() {
		const status = this.state.status;

		if (status === UNMOUNTED) {
			return null;
		}

		const {
			children,
			// filter props for `Transition`
			in: _in,
			mountOnEnter: _mountOnEnter,
			unmountOnExit: _unmountOnExit,
			appear: _appear,
			enter: _enter,
			exit: _exit,
			timeout: _timeout,
			addEndListener: _addEndListener,
			onEnter: _onEnter,
			onEntering: _onEntering,
			onEntered: _onEntered,
			onExit: _onExit,
			onExiting: _onExiting,
			onExited: _onExited,
			nodeRef: _nodeRef,
			...childProps
		} = this.props;

		return (
			// allows for nested Transitions
			<TransitionGroupContext.Provider value={null}>
				{typeof children === 'function'
					? children(status, childProps)
					: React.cloneElement(React.Children.only(children), childProps)}
			</TransitionGroupContext.Provider>
		);
	}
}

// Name the function so it is clearer in the documentation
function noop() {}

MyTransition.defaultProps = {
	in: false,
	mountOnEnter: false,
	unmountOnExit: false,
	appear: false,
	enter: true,
	exit: true,

	onEnter: noop,
	onEntering: noop,
	onEntered: noop,

	onExit: noop,
	onExiting: noop,
	onExited: noop,
};

MyTransition.UNMOUNTED = UNMOUNTED;
MyTransition.EXITED = EXITED;
MyTransition.ENTERING = ENTERING;
MyTransition.ENTERED = ENTERED;
MyTransition.EXITING = EXITING;

const MARGINS = {
	height: ['marginTop', 'marginBottom'],
	width: ['marginLeft', 'marginRight'],
};

function getDefaultDimensionValue(dimension, elem) {
	const offset = `offset${dimension[0].toUpperCase()}${dimension.slice(1)}`;
	const value = elem[offset];
	const margins = MARGINS[dimension];

	return (
		value +
		// @ts-ignore
		parseInt(css(elem, margins[0]), 10) +
		// @ts-ignore
		parseInt(css(elem, margins[1]), 10)
	);
}

const collapseStyles = {
	[EXITED]: 'collapse',
	[EXITING]: 'collapsing',
	[ENTERING]: 'collapsing',
	[ENTERED]: 'collapse show',
};

const MyCollapse = React.forwardRef(
	(
		{
			onEnter,
			onEntering,
			onEntered,
			onExit,
			onExiting,
			className,
			children,
			dimension = 'height',
			getDimensionValue = getDefaultDimensionValue,
			...props
		},
		ref
	) => {
		/* Compute dimension */
		const computedDimension =
			typeof dimension === 'function' ? dimension() : dimension;

		/* -- Expanding -- */
		const handleEnter = useMemo(
			() =>
				createChainedFunction((elem) => {
					elem.style[computedDimension] = '0';
				}, onEnter),
			[computedDimension, onEnter]
		);

		const handleEntering = useMemo(
			() =>
				createChainedFunction((elem) => {
					const scroll = `scroll${computedDimension[0].toUpperCase()}${computedDimension.slice(
						1
					)}`;
					elem.style[computedDimension] = `${elem[scroll]}px`;
				}, onEntering),
			[computedDimension, onEntering]
		);

		const handleEntered = useMemo(
			() =>
				createChainedFunction((elem) => {
					elem.style[computedDimension] = null;
				}, onEntered),
			[computedDimension, onEntered]
		);

		/* -- Collapsing -- */
		const handleExit = useMemo(
			() =>
				createChainedFunction((elem) => {
					elem.style[computedDimension] = `${getDimensionValue(
						computedDimension,
						elem
					)}px`;
					triggerBrowserReflow(elem);
				}, onExit),
			[onExit, getDimensionValue, computedDimension]
		);
		const handleExiting = useMemo(
			() =>
				createChainedFunction((elem) => {
					elem.style[computedDimension] = null;
				}, onExiting),
			[computedDimension, onExiting]
		);

		return (
			<MyTransition
				ref={ref}
				addEndListener={transitionEndListener}
				{...props}
				aria-expanded={props.role ? props.in : null}
				onEnter={handleEnter}
				onEntering={handleEntering}
				onEntered={handleEntered}
				onExit={handleExit}
				onExiting={handleExiting}
			>
				{(state, innerProps) => {
					return React.cloneElement(children, {
						...innerProps,
						className: classNames(
							className,
							children.props.className,
							collapseStyles[state],
							computedDimension === 'width' && 'width'
						),
					});
				}}
			</MyTransition>
		);
	}
);

export function Collapse(props) {
	const collapseRef = useRef(null);
	const { children, ...otherprops } = { ...props };

	return (
		<MyCollapse nodeRef={collapseRef} {...otherprops}>
			<div ref={collapseRef}>{props.children}</div>
		</MyCollapse>
	);
}

export default Collapse;

import { observer } from 'mobx-react';
import {
  type ComponentType,
  type DependencyList,
  type ForwardedRef,
  forwardRef,
  useMemo,
} from 'react';

export function createPartialComponent<
  ComponentProps,
  CurriedProps extends Partial<ComponentProps>,
>(
  Component: ComponentType<ComponentProps>,
  curriedProps: CurriedProps,
) {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const C = Component as ComponentType<CurriedProps & RemainingComponentProps<ComponentProps, CurriedProps>>;
  return forwardRef(
    function (exposedProps: RemainingComponentProps<ComponentProps, CurriedProps>, ref: ForwardedRef<typeof C>) {
      return (
        <C
          ref={ref}
          {...curriedProps}
          {...exposedProps}
        />
      );
    },
  );
}

export function usePartialComponent<
  ComponentProps,
  CurriedProps extends Partial<ComponentProps>,
>(
  // has to be first so eslint react-hooks/exhaustive-deps can find the callback
  // has to be a function so eslint react-hooks/exhaustive-deps can reason about it :(
  createCurriedProps: () => CurriedProps,
  // has to be next so eslint react-hooks/exhaustive-deps can find the deps
  deps: DependencyList,
  Component: ComponentType<ComponentProps>,
) {
  return useMemo(
    function () {
      return createPartialComponent(Component, createCurriedProps());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ...deps,
      Component,
    ],
  );
}

export function createPartialObserverComponent<
  ComponentProps,
  CurriedProps extends Partial<ComponentProps>,
  AdditionalProps = {},
>(
  Component: ComponentType<ComponentProps>,
  curriedPropsSource: (additionalProps: AdditionalProps) => CurriedProps,
) {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const C = Component as ComponentType<CurriedProps & RemainingComponentProps<ComponentProps, CurriedProps>>;
  return observer(
    forwardRef(function (
      exposedProps: RemainingComponentProps<ComponentProps, CurriedProps> & AdditionalProps,
      ref: ForwardedRef<typeof C>,
    ) {
      return (
        <C
          ref={ref}
          {...curriedPropsSource(exposedProps)}
          {...exposedProps}
        />
      );
    }),
  );
}

export function usePartialObserverComponent<
  ComponentProps,
  CurriedProps extends Partial<ComponentProps>,
  AdditionalProps = {},
>(
  // has to be first so eslint react-hooks/exhaustive-deps can find the callback
  curriedPropsSource: (additionalProps: AdditionalProps) => CurriedProps,
  // has to be next so eslint react-hooks/exhaustive-deps can find the deps
  deps: DependencyList,
  Component: ComponentType<ComponentProps>,
) {
  return useMemo(
    function () {
      return createPartialObserverComponent(Component, curriedPropsSource);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ...deps,
      Component,
    ],
  );
}

type RemainingComponentProps<ComponentProps, CurriedProps> =
  & Omit<ComponentProps, keyof CurriedProps>
  & JSX.IntrinsicAttributes;

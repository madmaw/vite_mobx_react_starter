import {
  type Meta,
  type StoryObj,
} from '@storybook/react';
import {
  ExpressionOutput,
  type ExpressionOutputProps,
} from 'app/pages/example/expression/output';
import { StorybookLocaleConsumer } from 'app/pages/example/testing/storybook';
import { createPartialObserverComponent } from 'base/react/partial';

const LocalizedExpressionOutput = createPartialObserverComponent(
  StorybookLocaleConsumer,
  function (props: ExpressionOutputProps) {
    return {
      children: <ExpressionOutput {...props} />,
    };
  },
);

const meta: Meta<typeof LocalizedExpressionOutput> = {
  component: LocalizedExpressionOutput,
};
export default meta;

type Story = StoryObj<typeof LocalizedExpressionOutput>;

export const Numeric: Story = {
  args: {
    result: {
      type: 'number',
      value: 1,
    },
  },
};

export const String: Story = {
  args: {
    result: {
      type: 'string',
      value: 'asdf',
    },
  },
};

export const Boolean: Story = {
  args: {
    result: {
      type: 'boolean',
      value: true,
    },
  },
};

export const BadExpression: Story = {
  args: {
    result: {
      type: 'bad_expression',
      expression: '1 + a',
    },
  },
};

export const UnexpectedResult: Story = {
  args: {
    result: {
      type: 'unexpected_result',
      resultType: 'array',
    },
  },
};
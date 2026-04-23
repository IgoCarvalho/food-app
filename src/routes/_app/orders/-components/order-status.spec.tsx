import { render, screen } from '@testing-library/react';
import { OrderStatus } from './order-status';

test('render order status', () => {
  render(<OrderStatus status="pending" />);

  expect(screen.getByText('Pendente')).toBeInTheDocument();
});

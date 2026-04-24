import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './pagination';

const onPageChangeCallback = vi.fn();

describe('<Pagination />', () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear();
  });

  it('should render the correct amount of pages and results', () => {
    render(
      <Pagination
        onPageChange={onPageChangeCallback}
        page={1}
        perPage={10}
        totalCount={200}
      />
    );

    expect(screen.getByText('Total de 200 item(s)')).toBeInTheDocument();
    expect(screen.getByText('Página 1 de 20')).toBeInTheDocument();
  });

  it('should navigate to the next page', async () => {
    const user = userEvent.setup();

    render(
      <Pagination
        onPageChange={onPageChangeCallback}
        page={1}
        perPage={10}
        totalCount={200}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Próxima página' }));

    expect(onPageChangeCallback).toHaveBeenCalledWith(2);
  });

  it('should navigate to the previous page', async () => {
    const user = userEvent.setup();

    render(
      <Pagination
        onPageChange={onPageChangeCallback}
        page={5}
        perPage={10}
        totalCount={200}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Página anterior' }));

    expect(onPageChangeCallback).toHaveBeenCalledWith(4);
  });

  it('should navigate to the first page', async () => {
    const user = userEvent.setup();

    render(
      <Pagination
        onPageChange={onPageChangeCallback}
        page={5}
        perPage={10}
        totalCount={200}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Primeira página' }));

    expect(onPageChangeCallback).toHaveBeenCalledWith(1);
  });

  it('should navigate to the last page', async () => {
    const user = userEvent.setup();

    render(
      <Pagination
        onPageChange={onPageChangeCallback}
        page={5}
        perPage={10}
        totalCount={200}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Última página' }));

    expect(onPageChangeCallback).toHaveBeenCalledWith(20);
  });
});

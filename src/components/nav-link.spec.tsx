import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../../test/router-utils';
import { NavLink } from './nav-link';

describe('<NavLink />', () => {
  it('should highlight the active link when is the current page', async () => {
    const user = userEvent.setup();

    await renderWithRouter(() => <div>User</div>, {
      pathPattern: '/user',
      wrapper: ({ children }) => (
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/user">User</NavLink>

          {children}
        </div>
      ),
    });

    let userLink = screen.getByRole('link', { name: 'User' });
    let homeLink = screen.getByRole('link', { name: 'Home' });

    expect(userLink).toHaveAttribute('data-status', 'active');
    expect(homeLink).not.toHaveAttribute('data-status', 'active');

    await user.click(homeLink);

    userLink = screen.getByRole('link', { name: 'User' });
    homeLink = screen.getByRole('link', { name: 'Home' });

    expect(homeLink).toHaveAttribute('data-status', 'active');
    expect(userLink).not.toHaveAttribute('data-status', 'active');
  });
});

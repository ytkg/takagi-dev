import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  // Helper function to set up the render environment
  const setup = () => {
    const user = userEvent.setup();
    render(
      <Router>
        <Navbar />
      </Router>
    );
    return { user };
  };

  it('renders the navbar with logo and main links', () => {
    setup();

    // Check for the logo
    expect(screen.getByText('takagi.dev')).toBeInTheDocument();

    // Check for the main links (we check the first one found)
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
    expect(screen.getAllByText('About')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Tools' })[0]).toBeInTheDocument();
    expect(screen.getAllByText('GitHub')[0]).toBeInTheDocument();
  });

  it('shows and hides the desktop dropdown on hover', async () => {
    const { user } = setup();

    // The dropdown links should not be visible initially
    expect(screen.queryByRole('link', { name: 'Tool 1' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Tool 2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Tool 3' })).not.toBeInTheDocument();

    // Find the desktop "Tools" button. We target the one inside the desktop nav div.
    const desktopNav = screen.getByRole('navigation').querySelector('.pr-4.md\\:block');
    const toolsButton = Array.from(desktopNav.querySelectorAll('button')).find(btn => btn.textContent.includes('Tools'));

    expect(toolsButton).toBeInTheDocument();

    // Hover over the button
    await user.hover(toolsButton);

    // Now the links should be visible
    expect(await screen.findByRole('link', { name: 'Tool 1' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Tool 2' })).toBeVisible();
    expect(screen.getByRole('link', { name: 'Tool 3' })).toBeVisible();

    // Move the mouse away
    await user.unhover(toolsButton);

    // The links should be hidden again. We use queryByRole because it returns null if not found.
    // We need to wait for the animation/state change to complete.
    expect(screen.queryByRole('link', { name: 'Tool 1' })).not.toBeInTheDocument();
  });

  it('opens and closes the mobile menu and tools accordion on click', async () => {
    const { user } = setup();

    // Find the hamburger menu button
    const mobileMenuToggle = screen.getByRole('navigation').querySelector('.px-8.cursor-pointer.md\\:hidden');
    expect(mobileMenuToggle).toBeInTheDocument();

    // The mobile menu drawer should be in the DOM but translated out of view
    const mobileNavContainer = screen.getByRole('dialog', { hidden: true });
    expect(mobileNavContainer).toHaveClass('translate-x-full');

    // Click to open the main mobile menu
    await user.click(mobileMenuToggle);

    // Now the mobile menu drawer should be in view
    expect(mobileNavContainer).not.toHaveClass('translate-x-full');
    expect(mobileNavContainer).toHaveClass('translate-x-0');

    // Use `within` to scope queries to the mobile menu
    const mobileNav = within(mobileNavContainer);

    const mobileToolsButton = mobileNav.getByRole('button', { name: /Tools/i });
    expect(mobileToolsButton).toBeVisible();

    // The tool sub-links should not be visible yet
    expect(mobileNav.queryByRole('link', { name: 'Tool 1' })).not.toBeInTheDocument();

    // Click to open the tools accordion
    await user.click(mobileToolsButton);

    // Now the tool sub-links should be visible
    expect(await mobileNav.findByRole('link', { name: 'Tool 1' })).toBeVisible();
    expect(mobileNav.getByRole('link', { name: 'Tool 2' })).toBeVisible();
    expect(mobileNav.getByRole('link', { name: 'Tool 3' })).toBeVisible();

    // Click again to close the accordion
    await user.click(mobileToolsButton);
    expect(mobileNav.queryByRole('link', { name: 'Tool 1' })).not.toBeInTheDocument();

    // Find and click the close button (X icon) to close the mobile menu
    const closeButton = mobileNav.getByRole('button', { name: /close menu/i });
    await user.click(closeButton);

    // The drawer should be hidden again (i.e., translated out of view)
    expect(mobileNavContainer).toHaveClass('translate-x-full');
    expect(mobileNavContainer).not.toHaveClass('translate-x-0');
  });
});

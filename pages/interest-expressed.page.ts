import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class InterestExpressedPage extends BasePage {
  // Page heading and description
  readonly heading: Locator;
  readonly description: Locator;

  // Navigation tab
  readonly interestExpressedTab: Locator;

  // Search and filters
  readonly searchInput: Locator;
  readonly stateFilterBtn: Locator;
  readonly disabilityTypeFilter: Locator;
  readonly sortByBtn: Locator;

  // Table
  readonly interestTable: Locator;
  readonly tableHeaderName: Locator;
  readonly tableHeaderLocation: Locator;
  readonly tableHeaderProductInterests: Locator;
  readonly tableHeaderShares: Locator;
  readonly tableHeaderInterestDate: Locator;
  readonly tableHeaderActions: Locator;

  // Pagination
  readonly paginationInfo: Locator;
  readonly previousBtn: Locator;
  readonly nextBtn: Locator;

  // View Details
  readonly viewDetailsButtons: Locator;

  // Modal
  readonly modal: Locator;
  readonly modalCloseBtn: Locator;
  readonly modalPersonalInfoHeading: Locator;
  readonly modalContactInfoHeading: Locator;
  readonly modalRevealDetailsBtn: Locator;
  readonly modalProductInterestsHeading: Locator;
  readonly modalEmailField: Locator;

  constructor(page: Page) {
    super(page);

    this.heading = page.getByRole('heading', { name: 'Interest Expressed' });
    this.description = page.getByText('View and manage PwD interests in your products');

    this.interestExpressedTab = page.getByRole('link', { name: 'Interest Expressed' });

    this.searchInput = page.getByRole('textbox', { name: 'Search by name, location, or product' });
    this.stateFilterBtn = page.getByRole('button', { name: 'All States' });
    this.disabilityTypeFilter = page.getByText('All Disabilities');
    this.sortByBtn = page.getByRole('button', { name: 'Newest First' });

    this.interestTable = page.getByRole('table');
    this.tableHeaderName = page.getByRole('columnheader', { name: 'Name' });
    this.tableHeaderLocation = page.getByRole('columnheader', { name: 'Location' });
    this.tableHeaderProductInterests = page.getByRole('columnheader', { name: 'Product Interests' });
    this.tableHeaderShares = page.getByRole('columnheader', { name: 'Shares' });
    this.tableHeaderInterestDate = page.getByRole('columnheader', { name: 'Interest Date' });
    this.tableHeaderActions = page.getByRole('columnheader', { name: 'Actions' });

    this.paginationInfo = page.getByText(/Showing \d+ to \d+ of \d+ results/);
    this.previousBtn = page.getByRole('button', { name: 'Previous' });
    this.nextBtn = page.getByRole('button', { name: 'Next' });

    this.viewDetailsButtons = page.getByRole('button', { name: 'View Details' });

    this.modal = page.getByRole('dialog');
    this.modalCloseBtn = page.getByRole('button', { name: 'Close dialog' });
    this.modalPersonalInfoHeading = page.getByRole('heading', { name: 'PERSONAL INFORMATION' });
    this.modalContactInfoHeading = page.getByRole('heading', { name: 'CONTACT INFORMATION' });
    this.modalRevealDetailsBtn = page.getByRole('button', { name: 'Reveal Details' });
    this.modalProductInterestsHeading = page.getByRole('heading', { name: /PRODUCT INTERESTS/ });
    this.modalEmailField = page.getByText(/Email Address/);
  }

  async navigateToInterestExpressed() {
    await this.interestExpressedTab.click();
    await expect(this.heading).toBeVisible();
  }

  async verifyPageLoaded() {
    await expect(this.heading).toBeVisible();
    await expect(this.description).toBeVisible();
  }

  async verifyInterestExpressedTabVisible() {
    await expect(this.interestExpressedTab).toBeVisible();
  }

  async verifyTableColumnsVisible() {
    await expect(this.tableHeaderName).toBeVisible();
    await expect(this.tableHeaderLocation).toBeVisible();
    await expect(this.tableHeaderProductInterests).toBeVisible();
    await expect(this.tableHeaderShares).toBeVisible();
    await expect(this.tableHeaderInterestDate).toBeVisible();
    await expect(this.tableHeaderActions).toBeVisible();
  }

  async verifyPaginationVisible() {
    await expect(this.paginationInfo).toBeVisible();
  }

  async searchByText(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
  }

  async clearSearch() {
    await this.searchInput.clear();
  }

  async clickViewDetailsFirst() {
    await this.viewDetailsButtons.first().click();
    await expect(this.modal).toBeVisible();
  }

  async closeModalWithXIcon() {
    await this.modalCloseBtn.click();
    await expect(this.modal).not.toBeVisible();
  }

  async verifyModalContentVisible() {
    await expect(this.modalPersonalInfoHeading).toBeVisible();
    await expect(this.modalContactInfoHeading).toBeVisible();
    await expect(this.modalProductInterestsHeading).toBeVisible();
  }

  async verifyContactMasked() {
    await expect(this.modalRevealDetailsBtn).toBeVisible();
    // Email should be masked (contains asterisks)
    await expect(this.page.getByText(/\*+@/)).toBeVisible();
  }

  async clickRevealDetails() {
    await this.modalRevealDetailsBtn.click();
  }

  async verifyUrlContainsInterestExpressed() {
    await expect(this.page).toHaveURL(/interest-expressed/);
  }

  // Notification Center methods
  async openNotificationPopup() {
    await this.page.locator('nav').getByRole('button').filter({ hasText: /^\d+$/ }).click();
    await expect(this.page.getByRole('heading', { name: 'Notifications', level: 3 })).toBeVisible();
  }

  async verifyNotificationPopupContent() {
    await expect(this.page.getByText(/unread notifications/)).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Mark all read' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'View All Notifications', exact: true })).toBeVisible();
  }

  async navigateToNotificationCenter() {
    await this.openNotificationPopup();
    await this.page.getByRole('button', { name: 'View All Notifications', exact: true }).click();
    await expect(this.page.getByRole('heading', { name: 'Notifications', level: 1 })).toBeVisible();
  }

  async verifyNotificationCenterLoaded() {
    await expect(this.page.getByRole('heading', { name: 'Notifications', level: 1 })).toBeVisible();
    await expect(this.page.getByText('Stay updated with all your vendor activities')).toBeVisible();
    await expect(this.page.getByText(/Retention Policy/)).toBeVisible();
  }

  async verifyNotificationFilterTabs() {
    await expect(this.page.getByRole('button', { name: /^All/ })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /^Unread/ })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /^Interest/ })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /^Updates/ })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /^Reviews/ })).toBeVisible();
  }

  async verifyNotificationItemsDisplayed() {
    await expect(this.page.getByText(/A user has expressed interest/).first()).toBeVisible();
    await expect(this.page.getByText(/\d{2}\/\d{2}\/\d{4}/).first()).toBeVisible();
  }

  async clickMarkAllRead() {
    await this.page.getByRole('button', { name: 'Mark all read' }).click();
  }
}

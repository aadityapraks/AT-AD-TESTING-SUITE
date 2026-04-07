import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class DashboardPage extends BasePage {
  // Navigation buttons
  readonly dashboardBtn: Locator;
  readonly helpResourcesBtn: Locator;
  readonly notificationBellBtn: Locator;
  readonly profileBtn: Locator;
  readonly logoutBtn: Locator;

  // Welcome section
  readonly welcomeHeading: Locator;

  // Summary widgets
  readonly totalProductsWidget: Locator;
  readonly totalInterestWidget: Locator;
  readonly totalListingsWidget: Locator;
  readonly avgRatingWidget: Locator;

  // Horizontal tabs
  readonly productManagementTab: Locator;
  readonly productUploadTab: Locator;
  readonly interestExpressedTab: Locator;
  readonly queriesTab: Locator;
  readonly reviewsRatingsTab: Locator;

  // Notification popup
  readonly notificationPopupHeading: Locator;
  readonly markAllReadBtn: Locator;
  readonly viewAllNotificationsBtn: Locator;
  readonly unreadCountLabel: Locator;

  // Notification center page
  readonly notificationCenterHeading: Locator;
  readonly notificationTabAll: Locator;
  readonly notificationTabUnread: Locator;
  readonly notificationTabInterest: Locator;
  readonly notificationTabUpdates: Locator;
  readonly notificationTabReviews: Locator;
  readonly notificationTabAdmin: Locator;
  readonly retentionPolicyText: Locator;

  // Responsive / mobile
  readonly hamburgerMenuBtn: Locator;
  readonly sidebarNavDashboardLink: Locator;

  constructor(page: Page) {
    super(page);

    this.dashboardBtn = page.getByRole('button', { name: 'Dashboard' });
    this.helpResourcesBtn = page.getByRole('button', { name: 'Help & Resources' });
    this.notificationBellBtn = page.getByRole('button', { name: /🔔/ });
    this.profileBtn = page.getByRole('button', { name: 'Profile' });
    this.logoutBtn = page.getByRole('button', { name: 'Logout' });

    this.welcomeHeading = page.getByRole('heading', { name: 'Welcome to your Dashboard', level: 1 });

    this.totalProductsWidget = page.getByText('Total Products');
    this.totalInterestWidget = page.getByText('Total Interest');
    this.totalListingsWidget = page.getByText('Total Listings');
    this.avgRatingWidget = page.getByText('Avg. Rating');

    this.productManagementTab = page.getByRole('link', { name: 'Product Management' });
    this.productUploadTab = page.getByRole('link', { name: 'Product Upload' });
    this.interestExpressedTab = page.getByRole('link', { name: 'Interest Expressed' });
    this.queriesTab = page.getByRole('link', { name: 'Queries' });
    this.reviewsRatingsTab = page.getByRole('link', { name: 'Reviews & Ratings' });

    this.notificationPopupHeading = page.getByRole('heading', { name: 'Notifications', level: 3 });
    this.markAllReadBtn = page.getByRole('button', { name: 'Mark all read', exact: true });
    this.viewAllNotificationsBtn = page.getByRole('button', { name: 'View All Notifications', exact: true });
    this.unreadCountLabel = page.getByText(/unread notifications/);

    this.notificationCenterHeading = page.getByRole('heading', { name: 'Notifications', level: 2 });
    this.notificationTabAll = page.getByRole('button', { name: /^All/ });
    this.notificationTabUnread = page.getByRole('button', { name: /^Unread/ });
    this.notificationTabInterest = page.getByRole('button', { name: 'Interest', exact: true });
    this.notificationTabUpdates = page.getByRole('button', { name: 'Updates', exact: true });
    this.notificationTabReviews = page.getByRole('button', { name: 'Reviews', exact: true });
    this.notificationTabAdmin = page.getByRole('button', { name: 'Admin', exact: true });
    this.retentionPolicyText = page.getByText(/Retention Policy/);

    this.hamburgerMenuBtn = page.getByRole('button', { name: 'Toggle navigation menu' });
    this.sidebarNavDashboardLink = page.getByRole('link', { name: 'Dashboard' });
  }

  async openNotificationPopup() {
    await this.notificationBellBtn.click();
    await expect(this.notificationPopupHeading).toBeVisible();
  }

  async navigateToNotificationCenter() {
    await this.openNotificationPopup();
    await this.viewAllNotificationsBtn.click();
    await expect(this.notificationCenterHeading).toBeVisible();
  }

  async clickNotificationTab(tab: 'All' | 'Unread' | 'Interest' | 'Updates' | 'Reviews' | 'Admin') {
    const tabMap = {
      All: this.notificationTabAll,
      Unread: this.notificationTabUnread,
      Interest: this.notificationTabInterest,
      Updates: this.notificationTabUpdates,
      Reviews: this.notificationTabReviews,
      Admin: this.notificationTabAdmin,
    };
    await tabMap[tab].click();
  }

  async clickDashboard() {
    await this.dashboardBtn.click();
    await expect(this.welcomeHeading).toBeVisible();
  }

  async clickHelpResources() {
    await this.helpResourcesBtn.click();
  }

  async clickProfile() {
    await this.profileBtn.click();
  }

  async clickLogout() {
    await this.logoutBtn.click();
  }

  async verifyAllWidgetsVisible() {
    await expect(this.totalProductsWidget).toBeVisible();
    await expect(this.totalInterestWidget).toBeVisible();
    await expect(this.totalListingsWidget).toBeVisible();
    await expect(this.avgRatingWidget).toBeVisible();
  }

  async verifyAllTabsVisible() {
    await expect(this.productManagementTab).toBeVisible();
    await expect(this.productUploadTab).toBeVisible();
    await expect(this.interestExpressedTab).toBeVisible();
    await expect(this.queriesTab).toBeVisible();
    await expect(this.reviewsRatingsTab).toBeVisible();
  }

  async navigateToDashboardPage(baseUrl: string) {
    await this.page.goto(`${baseUrl}/partner/dashboard`);
    await expect(this.welcomeHeading).toBeVisible();
  }
}
